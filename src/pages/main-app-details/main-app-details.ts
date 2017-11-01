import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

import { AppService, UserService,FileService,CacheService,AdminService } from "../../shared/services";
import { HelperUtil,DialogUtil } from "../../shared/utils";

import { ObjectToArray } from '../../shared/pipes/helper/objToArray';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage({segment:'app/:app_uid'})
@Component({
  selector: 'page-main-app-details',
  templateUrl: 'main-app-details.html',
})
export class MainAppDetailsPage {

  @ViewChild('appIconPlaceHolder') appIconPlaceHolder;

  app = {};

  private alive:boolean = true;

  private lastComponent: string = '';

  objToArr = new ObjectToArray();

  pageLoaded:boolean = false;
  errorLoad: boolean = false;
  appNotAvailable: boolean = false;

  appStats = {
    totalViews: 0,
    totalDownloads: 0,
    downloads: {}, //an object containing downloads from different platforms
    averageStarRating: 0,
    totalReviews: 0,
    reviews: [],
    stars: {1:0,2:0,3:0,4:0,5:0}
  };
  stars = [5,4,3,2,1];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    public appService: AppService,
    public cacheService: CacheService,
    public adminService: AdminService,
    public helperUtil: HelperUtil,
    public dialogUtil: DialogUtil,
    public fileService: FileService,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    this.getAppData();
  }

  disableAppStatus(){
    let enable = true;
    if(!this.app['appData']['disabledByAdminUid']){
      enable = false;
    }
    let msg = 'Are you sure to disable the app? This app will be temporarily hidden in Showcase It, and the developer of this app cannot send a content update request in this app. Continue?';
    let loadingMsg = 'Disabling app.';
    if(enable){ 
      msg = 'Are you sure to enable the app? This app will be shown in Showcase It and content update restriction will be remove.' 
      loadingMsg = 'Enabling app.';
    };
    new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      this.dialogUtil.showConfirm(msg, buttons,'');
    }).then(()=>{
      this.dialogUtil.showLoader(loadingMsg);
      this.appService.doAdminDisableApp(this.app['uid'], this.app['appData']['user_uid'], enable).then(()=>{
        this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
        this.dialogUtil.hideLoader();
      },e=>{
        this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
        this.dialogUtil.hideLoader();
      });
    },()=>{});
  }

  getAppStats(){
    this.appService.getTotalViews(this.app['uid']).takeWhile(()=>this.alive).subscribe(views=>{
      this.appStats.totalViews = views.length;
    });
    this.appService.getTotalDownloads(this.app['uid'],this.alive).takeWhile(()=>this.alive).subscribe((downloadsObj:any)=>{
      this.appStats.totalDownloads = downloadsObj.totalDownloads;
      this.appStats.downloads = downloadsObj.downloads;
    });

    this.appService.getReviews(this.app['uid'],this.alive).takeWhile(()=>this.alive).subscribe((reviewsObj:any)=>{
      if(reviewsObj){
        this.appStats.averageStarRating = reviewsObj.averageStarRating;
        this.appStats.stars = reviewsObj.stars;
        this.appStats.totalReviews = reviewsObj.totalReviews;

        // For each reviews, get the user data and append it
        this.appStats.reviews = reviewsObj.reviews;
        if(this.appStats.reviews && this.appStats.reviews.length > 0){
          this.appStats.reviews.forEach(review=>{
            this.userService.getUserData(review.user_uid).takeWhile(()=>this.alive).subscribe(userData=>{
              review['userPhotoURL'] = userData.photoURL;
              review['userName'] = userData.name;
            });
          });
        }
      }
    });

    console.log(this.appStats);
  }

  loadedUserPhoto(id){
    document.getElementById('user-photo-placeholder-'+id).classList.remove('user-photo-placeholder');
  }
  
  getAppData(){
    this.app['uid'] = this.navParams.get('app_uid');
    if(!this.app['uid']){ return this.goBack(); }
    console.log(this.app['uid']);

    this.appService.getMainAppDetails(this.app['uid'])
      .takeWhile(()=> this.alive)
      .subscribe(appData=>{
        if(!appData.uid){
          this.pageLoaded = true;
          this.errorLoad = false;
          return this.appNotAvailable = true;
        }

        this.appService.getCategoryData(appData.type, appData.category).takeWhile(()=> this.alive).subscribe(categoryData=>{
          appData['category_name'] = categoryData['name'];
        });
        this.userService.getUserData(appData.user_uid).takeWhile(()=>this.alive).subscribe(userData=>{
          let userDataObj = {
            name: userData['name'],
            photoURL: userData['photoURL']
          };
          this.pageLoaded = true;
          this.errorLoad = false;
          this.app['userData'] = userDataObj;
        });

        if(appData.disabledByAdminUid){
          this.adminService._getAdminData(appData.disabledByAdminUid).takeWhile(()=>this.alive).subscribe(adminData=>{
            this.app['appData']['disabledByAdminName'] = adminData.name;
            this.app['appData']['disabledByAdminPhotoURL'] = adminData.photoURL;
          });
        }

        this.app['appData'] = appData;
        console.log(this.app);

        // Follow up
        this.getAppStats();
    });

    // WHEN FAILED TO LOAD
    var timeout = setInterval(()=>{
      if(!this.app['appData']['title']){
        this.errorLoad = true;
      }
      clearInterval(timeout);
    },30000);
  }

  retry(){
    this.errorLoad = false;
    this.pageLoaded = false;
    this.getAppData();
  }

  copyText(text){
    this.helperUtil.copyText(text)
    this.dialogUtil.showToast('Copied to clipboard', 3000, 'bottom');
  }

  onScreenshotLoaded(index){
    document.getElementById('shimmer-'+index).classList.remove('shimmer');
  }

  statusColor(status){
    if(status === 'published'){
      return 'primary';
    }else if(status === 'unpublished'){
      return 'disabled';
    }
  }

  loadedAppIcon(){
    this.appIconPlaceHolder.nativeElement.classList.remove('app-icon-placeholder')
  }

  launchURL(url){
    this.helperUtil.launchURL(url);
  }

  launchEmail(email){
    window.open('mailto:'+email);
    return false;
  }

  navigateToUser(user_uid){
    this.navCtrl.push('UserProfilePage',{uid: user_uid, isAdmin: false});
  }

  showReviewList(){
    this.modalCtrl.create('ReviewListPage', {app: this.app}).present();
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
      this.app['app_uid'] = this.app['uid'];
      this.app['user_uid'] = this.app['appData'].user_uid;
      this.appService.removeFile(type,this.app,null,true).then(()=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('File removed.', 3000 , 'bottom');
      },e=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Error in removing the file.', 3000 , 'bottom');
      });
    }).catch(()=>{});
  }

  viewRelease(release){
    const modal = this.modalCtrl.create('ApkDetailsPage', {app_release: release, app_uid: this.app['uid']});
    modal.present();
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
      this.app['app_uid'] = this.app['uid'];
      this.app['user_uid'] = this.app['appData'].user_uid;
      this.appService.removeFile('remove_android_release',this.app,release,true).then(()=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Release removed.', 3000 , 'bottom');
      },e=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Error in removing the release.', 3000 , 'bottom');
      });
    }).catch(()=>{});
  }

  goBack(){
    this.navCtrl.pop();
  }

}
