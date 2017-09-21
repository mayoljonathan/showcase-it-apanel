import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { App } from "../../../shared/models/";
import { AppService,UserService,FileService } from "../../../shared/services/";
import { HelperUtil,DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: 'details'})
@Component({
  selector: 'page-detailed-app',
  templateUrl: 'detailed-app.html',
})
export class DetailedAppPage {

  @ViewChild('slider') slider;

  app;

  alive: boolean = true;
  loadedPage: boolean = false;

  constructor(
    public helperUtil: HelperUtil,
    public dialogUtil: DialogUtil,
    public fileService: FileService,
    public appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedAppPage');
    this.app = this.navParams.data;
    console.log(this.app);
    this.appService.getRequest('publish_requests',this.app.$key)
      .takeWhile(()=>this.alive)
      .subscribe(r=>{
        if(!r.app_uid){ 
          this.dialogUtil.showAlert('The request may have been processed by other admin or request has been cancelled by the owner.', 'Ok','You have been redirected');
          return this.navCtrl.setRoot('RequestTabsPage') 
        }
      });
    this.loadedPage = true;
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

  ngOnDestroy(){
    this.alive = false;
  }

}
