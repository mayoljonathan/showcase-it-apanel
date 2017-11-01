import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController,ModalController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { AdminService,CacheService } from '../shared/services';
import { DialogUtil } from '../shared/utils';

import { Admin } from '../shared/models/';
import "rxjs/add/operator/takeWhile";

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

  // rootPage: any = 'LoginPage';

  rootPage: any = "StartupLoadingPage";
  currentComponent: any = 'StartupLoadingPage';

  selectedSideMenuIndex: number = 0;
  pages: PageInterface[];

  // counter: number = 0;

  admin: Admin;

  alive: boolean = true;

  constructor(
    public menuCtrl: MenuController,
    public platform: Platform, 
    public cacheService: CacheService,
    public afAuth: AngularFireAuth,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public dialogUtil: DialogUtil,
    public adminService: AdminService,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.admin = new Admin();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: 'DashboardPage', index: 0, icon: 'dashboard' },
      { title: 'Applications List', component: 'AppsListPage', index: 1, icon: 'format_list_bulleted' },
      { title: 'App Categories', component: 'AppCategoryTabsPage', index: 2, icon: 'label' },
      { title: 'App Requests', component: 'RequestTabsPage', index: 3, icon: 'error' },
      { title: 'User Accounts', component: 'UserAccountsTabsPage', index: 4, icon: 'supervisor_account'},
      { title: 'Reports from Users', component: 'ReportTabsPage', index: 5, icon: 'rate_review' },
      { title: 'Maintenance', component: 'MaintenancePage', index: 6, icon: 'settings' , requiresSuper: true},
      { title: 'Sign out', component: null, index: 99, icon: 'subdirectory_arrow_left'}
    ];

  }

  initializeApp() {
    this.afAuth.authState.subscribe(admin => {
      if(admin){

        console.log('Triggered authState'); 
        this.cacheService.admin_uid = admin.uid;
        this.watchForAdminStatus();
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
        this.adminService._getAdminData(this.cacheService.admin_uid).subscribe(admin=>{
          if(admin){
            this.cacheService.admin_status = admin.status;
            this.cacheService.isSuperAdmin = admin.isSuperAdmin || false;
            this.admin.name = admin.name;
            this.admin.photoURL = admin.photoURL;
            this.admin.email = admin.email;

            // if(this.counter === 0){
              this.menuCtrl.enable(true);
              // this.nav.setRoot('DashboardPage');
              // this.counter++;
            // }
          }
        });

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

  watchForAdminRole(){
    this.adminService.watchAdminRole()
      .subscribe(res=>{
        this.cacheService.isSuperAdmin = res.$value || false;
      });
  }

  watchForAdminStatus(){
    this.adminService.watchAdminStatus()
      .subscribe(res=>{
        console.log(res);
        if(!res.$value){
          return this.adminService.signOut().then(()=>{
            this.nav.setRoot('LoginPage');
            return this.menuCtrl.enable(false);
          });
        }
        
        this.cacheService.admin_status = res.$value;
        if(this.cacheService.admin_status === 'active'){
          this.adminService.setOnlineState();
          this.watchForAdminRole();
          this.cacheService.isSignInPage = false;
          this.selectedSideMenuIndex = 0;
          
          this.nav.setRoot('DashboardPage');
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

  changeProfileData(){
    if(this.admin && this.admin.name){
      this.modalCtrl.create('ChangeProfilePage').present();
    }
  }

  ngOnDestroy(){
    this.alive = false;
  }
}
