import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ModalController,FabContainer } from 'ionic-angular';

// import { App } from "../../../shared/models/";
import { AppService,UserService,FileService,CacheService } from "../../../shared/services/";
import { HelperUtil,DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: 'details'})
@Component({
  selector: 'page-detailed-app',
  templateUrl: 'detailed-app.html',
})
export class DetailedAppPage {

  @ViewChild('fab') fab:FabContainer;
  @ViewChild(Content) content: Content;

  app;

  alive: boolean = true;
  loadedPage: boolean = false;

  showFab: boolean = false;
  fabButtonOpened: boolean = false;
  showFabListener:any;

  // Read/Write?
  readOnly: boolean = false;
  type: string = ''; //publish_requests,content_update_requests

  viewingNewData: boolean;
  duplicateApp: any;

  constructor(
    public helperUtil: HelperUtil,
    public modalCtrl: ModalController,
    public dialogUtil: DialogUtil,
    public fileService: FileService,
    public cacheService: CacheService,
    public appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ){
    this.duplicateApp = {
      old: {},
      new: {}
    }
  }

  ionViewDidLoad(){
    if(!this.navParams.get('data')){
      return this.navCtrl.setRoot('RequestTabsPage');
    }
    this.app = Object.assign({}, this.navParams.get('data'), {key: this.navParams.get('data').$key});
    this.readOnly = this.navParams.get('readOnly') === 'false' ? false : true;
    this.type = this.navParams.get('type');
    this.viewingNewData = this.navParams.get('viewingNewData');

    if(this.type === 'content_update_requests'){
      this.appService.getMainAppDetails(this.app.app_uid)
        .takeWhile(()=>this.alive)
        .subscribe(oldData=>{
          this.duplicateApp['old'] = oldData;
        });
      this.duplicateApp['new'] = this.app.appData;
    }

    this.appService.getCategoryData(this.app.appData.type,this.app.appData.category)
      .takeWhile(()=> this.alive)
      .subscribe(category=>{
        this.app.appData['category_name'] = category.name || '-';
      });

    if(!this.readOnly){
      this.appService.getRequest(this.type,this.app.key)
        .takeWhile(()=>this.alive)
        .subscribe(r=>{

          console.log('HEREEEE');
          console.log(r);

          if(!r.app_uid){ 
            // CHECK IF OWNER CANCELS THE PR
            // Set a small delay, because if no delay, it will not get the latest data (executions are just way too fast ~lol)
            setTimeout(()=>{
              this.appService.getAppData(this.app.app_uid,this.app.user_uid).take(1).subscribe(appData=>{
                if(!appData.uid){
                  return this.navCtrl.pop();
                  // return this.navCtrl.setRoot('RequestTabsPage');
                }
                if(appData.request_status === 'cancelled' || appData.cu_request_status){
                  this.dialogUtil.showAlert('The request has been cancelled by the owner.', 'Ok','You have been redirected');
                  return this.navCtrl.pop();
                  // return this.navCtrl.setRoot('RequestTabsPage') 
                }else{
                  // CHECK IF REQUEST IN LOG
                  this.appService.getRequestInLog(this.app.key).take(1).subscribe(request=>{
                    console.log(request);
                    if(request[0].admin_uid !== this.cacheService.admin_uid){
                      this.dialogUtil.showAlert('The request has been processed by other admin. Check the logs for more informations.', 'Ok','You have been redirected');
                      return this.navCtrl.setRoot('RequestTabsPage');
                    }
                  });
                }
              });
            },100);
            
          }
        });

      this.showFabListener = setInterval(()=>{
        this.showFabButtonsHandler();
      },100);
    }
    this.loadedPage = true;
  }

  toggleCUData(){
    this.viewingNewData = !this.viewingNewData;
    if(this.viewingNewData){ this.app.appData = this.duplicateApp.new;
    }else{ this.app.appData = this.duplicateApp.old; }
  }

  statusColor(status){
    if(status === 'approve' || status === 'approve_cu'){
      return 'secondary';
    }
    return 'danger';
  }

  actionName(action){
    if(action === 'approve' || action === 'approve_cu'){
      return 'approved';
    }else if(action === 'reject'){
      return 'rejected';
    }else{
      return 'rejected and removed';
    }
  }

  onFabShowClick(fab:FabContainer,args?){
    if(args){
      fab.close();
      this.requestAction(args);
    }
    this.fabButtonOpened = !this.fabButtonOpened;
  }

  requestAction(action){
    if(action != 1){
      // action 2=reject,3=reject-remove
      const modal = this.modalCtrl.create('RequestRejectPage', {data: this.app, type: this.type, action: action});
      return modal.present();
    }
    return new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      let msg = 'Are you sure to approve this publish request?';
      if(this.type === 'content_update_requests'){ msg = 'Are you sure to approve this content update request?'; }
      this.dialogUtil.showConfirm(msg,buttons,'');
    }).then(()=>{

      // Check if request is still in publish_requests or content_update_requests
      this.appService.getRequest(this.type,this.app.key).take(1).subscribe(r=>{
        if(r.app_uid){ 
          let msg = 'Approving and publishing the app.';
          let action = 'approve';
          if(this.type === 'content_update_requests'){ 
            msg = 'Approving and updating the app in ShowcaseIT.'; 
            action = 'approve_cu';
          }
          this.dialogUtil.showLoader(msg);
          let mailData = {
            action: action,
            email: this.app.userData.email,
            usersName: this.app.userData.name,
            appTitle: this.app.appData.title,
            appUid: this.app.app_uid,
            requestType: this.type,
          };
          
          this.appService.managePublishRequest(action,this.app,this.type,mailData).then((res)=>{
            this.dialogUtil.hideLoader();
            if(res){
              let msg = this.type === 'publish_requests' ? 'App published successfully ' : 'App has been updated in ShowcaseIT ';
              this.dialogUtil.showToast(msg+'and an email has been sent to the owner.', 4000 , 'bottom');
              return this.navCtrl.pop();
              // return this.navCtrl.setRoot('RequestTabsPage',{},{
              //   animate: true,
              //   direction: 'backward'
              // });
            }
            this.dialogUtil.showToast('Error in doing the operation.', 3000 , 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`Error in doing the operation. Error: ${e}`, 3000 , 'bottom');
          });
        }else{
          this.dialogUtil.showToast('Error in doing the operation.', 3000 , 'bottom');
        }
      });
    }).catch(()=>{});
  }

  showFabButtonsHandler(){
    let el = document.getElementById('actionsContainer');
    if(el){
      var rect     = el.getBoundingClientRect();
      this.showFab =  !(rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
      
      if(!this.showFab){
        this.fab.close();
        this.fabButtonOpened = false;
      }
      return this.showFab;
    }
  }

  onScreenshotLoaded(index){
    document.getElementById('shimmer-'+index).classList.remove('shimmer');
  }

  loadedAppIcon(){
    document.getElementById('app-icon-placeholder').classList.remove('app-icon-placeholder');
  }

  launchURL(url){
    this.helperUtil.launchURL(url);
  }

  launchEmail(email){
    window.open('mailto:'+email);
    return false;
  }

  copyText(text){
    this.helperUtil.copyText(text)
    this.dialogUtil.showToast('Copied to clipboard', 3000, 'bottom');
  }

  downloadFile(url){
    this.fileService.downloadFile(url);
  }

  viewMoreInfo(){
    const modal = this.modalCtrl.create('RequestRejectPage', {data: this.app, action: this.app.action,logInfo: true});
    return modal.present();
  }

  removeFile(type,args?){
    // type = remove_os_archive, remove_desktop_archive, remove_android_apk
    return new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      this.dialogUtil.showConfirm('Are you sure to remove this file?',buttons,'');
    }).then(()=>{
      this.dialogUtil.showLoader('Removing file.');
      this.appService.removeFile(type,this.app).then(()=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('File removed.', 3000 , 'bottom');
      },e=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Error in removing the file.', 3000 , 'bottom');
      });
    }).catch(()=>{});
  }

  viewRelease(release){
    const modal = this.modalCtrl.create('ApkDetailsPage', {app_release: release, app_uid: this.app.uid});
    modal.present();
  }

  navigateToUser(user_uid){
    this.navCtrl.push('UserProfilePage',{uid: user_uid, isAdmin: false});
  }

  deleteRelease(release){
    return new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      let title = release.releaseName ? `Remove ${release.releaseName}?` : `Remove release ${release.versionName}?`;
      this.dialogUtil.showConfirm('Are you sure to remove this release?',buttons,title);
    }).then(()=>{
      this.dialogUtil.showLoader('Removing release.');
      this.appService.removeFile('remove_android_release',this.app,release).then(()=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Release removed.', 3000 , 'bottom');
      },e=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Error in removing the release.', 3000 , 'bottom');
      });
    }).catch(()=>{});
  }

  scrollTo(path){
    var el = document.getElementById(`section-${path}`);
    this.content.scrollTo(0, el.offsetTop, 800);
  }

  ngOnDestroy(){
    this.alive = false;
    clearInterval(this.showFabListener);
  }

}
