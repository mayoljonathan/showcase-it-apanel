import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';

import { AdminService,CacheService } from '../shared/services';
import { DialogUtil } from '../shared/utils';

// import "rxjs/add/operator/takeWhile";

export interface PageInterface {
  title: string;
  // segment: string;
  component: any;
  index: number;
  icon: string;
  requiresSuper?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  selectedSideMenuIndex: number = 0;
  pages: PageInterface[];

  counter: number = 0;


  constructor(
    public menuCtrl: MenuController,
    public platform: Platform, 
    public cacheService: CacheService,
    public afAuth: AngularFireAuth,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public dialogUtil: DialogUtil,
    public adminService: AdminService,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Analytics', component: 'AnalyticsPage', index: 0, icon: 'dashboard' },
      { title: 'Applications List', component: 'AnalyticsPage', index: 1, icon: 'format_list_bulleted' },
      { title: 'App Categories', component: 'AnalyticsPage', index: 2, icon: 'label' },
      { title: 'App Requests', component: 'RequestTabsPage', index: 3, icon: 'error' },
      { title: 'Users', component: 'AnalyticsPage', index: 4, icon: 'supervisor_account' },
      { title: 'Feedbacks & Problems', component: 'AnalyticsPage', index: 5, icon: 'rate_review' },
      { title: 'Maintenance', component: 'AnalyticsPage', index: 6, icon: 'settings' },
      { title: 'Sign out', component: null, index: 99, icon: 'subdirectory_arrow_left'}
    ];

  }

  initializeApp() {
    this.afAuth.authState.subscribe(admin => {
      if(admin){
        console.log('Triggered authState'); 
        this.cacheService.admin_uid = admin.uid;
        // if(!this.cacheService.admin_uid){
        // this.cacheService.getStorage('admin_uid').then(val=>{
        //   console.log('admin_uid is: '+ val);
        //   if(val == null){
        //     this.cacheService.setStorage('admin_uid',admin.uid);
        //   }
        // });
        // }else{
          
        // }

        // GET ADMIN DATA - JUST A PROMISE
        this.adminService.getAdminData(this.cacheService.admin_uid).then(admin=>{
          this.cacheService.admin_status = admin.status;
        });

        if(this.counter === 0){
          this.watchForAdminStatus();
          this.counter++;
        }
      }else{
        this.cacheService.admin_uid = '';
        this.cacheService.admin_status = '';
        this.cacheService.isDoneCheckingAdminData = true;
        this.cacheService.isSignInPage = true;
        this.nav.setRoot('LoginPage');
        this.menuCtrl.enable(false);
      }
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  watchForAdminStatus(){
    this.adminService.watchAdminStatus()
      .subscribe(res=>{
      this.cacheService.admin_status = res.$value;
      if(this.cacheService.admin_status === 'active'){
        this.cacheService.isSignInPage = false;
        // this.nav.setRoot('AnalyticsPage');
      }else{
        if(!this.cacheService.isSignInPage){
          let msg = 'Your account has been disabled by the Super admin.';
          if(this.cacheService.admin_status !== 'disabled' && this.cacheService.admin_status !== 'active'){
            msg = 'You have been logout. Please sign in again.';
          }
          this.adminService.signOut().then(()=>{
            this.dialogUtil.showAlert(msg,'Ok');
            this.nav.setRoot('LoginPage');
          });
        }
      }
      this.cacheService.isDoneCheckingAdminData = true;
    });
  }

  openPage(page:PageInterface) {

    if(page.index == 99){
      return new Promise((resolve,reject)=>{
        let buttons = [
          { text: 'No', handler: reject },
          { text: 'Yes', handler: resolve },
        ];
        this.dialogUtil.showConfirm('Sign out?',buttons,'');
      }).then(()=>{
        this.dialogUtil.showLoader('Signing out.');
        setTimeout(()=>{
          this.adminService.signOut().then(()=>{
              this.nav.setRoot('LoginPage');
              return this.dialogUtil.hideLoader();
          });
        },500);
      }).catch(()=>{});
    }else{
      this.selectedSideMenuIndex = page.index;
      this.nav.setRoot(page.component);
    }

  }
}
