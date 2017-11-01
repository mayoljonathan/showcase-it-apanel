import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppService, UserService,FileService,CacheService } from "../../shared/services";
import { HelperUtil,DialogUtil } from "../../shared/utils";
import { User,App } from "../../shared/models";

import * as request from 'request';

@IonicPage({segment: 'user-profile/:uid'})
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: User;
  apps: Array<App> = [];

  alive: boolean = true;

  isDeveloper: boolean = false;

  isAdmin: boolean;

  pageLoaded: boolean = false;
  errorLoad: boolean = false;

  uid: string; //uid, admin_uid

  isOnline: boolean = false;

  choices = [{name: 'Active'},{name: 'Banned'},{name: 'Disabled'}];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public appService: AppService,
    public helperUtil: HelperUtil,
    public dialogUtil: DialogUtil,
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.navParams.get('uid');
    this.isAdmin = this.navParams.get('isAdmin');
    console.log(this.uid);
    if(!this.uid){
      return this.navCtrl.setRoot('UserAccountsTabsPage');
    }

    if(!this.isAdmin){
      this.getUserData();
    }else{
      this.getAdminData();
    }
  }

  getUserData(){
    this.pageLoaded = false;
    this.userService.getUserData(this.uid)
      .takeWhile(()=>this.alive)
      .subscribe(userData=>{

        this.userService.getUserIsDeveloper(this.uid).takeWhile(()=>this.alive).subscribe(res=>{
          if(typeof res['$value'] === 'number'){
            this.user['developerSince'] = res.$value;
            this.isDeveloper = true;
          }else{
            this.isDeveloper = false;
          }
        }); 

        this.appService.getUserShowcasedApps(this.uid).takeWhile(()=> this.alive).subscribe(userApps=>{
          this.apps = userApps;
          this.pageLoaded = true;
        });

        this.userService.getUserPresence(this.uid).takeWhile(()=>this.alive).subscribe(online=>{
          console.log(online);
          if(online['$value'] === true){
            this.isOnline = true;
          }else if(typeof online['$value'] === 'number' || !online['$value']){
            this.isOnline = false;
            this.user['lastSeen'] = online.$value;
          }
        });

        this.user = userData;
        this.setRadioUserStatus();
    });
  }

  getAdminData(){

  }

  launchEmail(){
    if(this.user.email){
      window.open('mailto:'+this.user.email);
      return false;
    }
  }

  getUserProvider(){
    if(this.user.facebook_id){
      return 'facebook';
    }else if(this.user.google_id){
      return 'google';
    }else if(this.user.github_id){
      return 'github';
    }
  }

  setRadioUserStatus(){
    if(this.user.status === 'active'){
      this.choices[0]['checked'] = true;
    }else if(this.user.status === 'banned'){
      this.choices[1]['checked'] = true;
    }else{
      this.choices[2]['checked'] = true;
    }
  }

  showStatusModal(){
    // Clear checked radios
    for(let i=0;i<3;i++){
      this.choices[i]['checked'] = false;
    }
    // Set the users status to radio
    this.setRadioUserStatus();
    this.dialogUtil.showRadio(this.choices,['Cancel','Ok'],"Set user's status to:").then((selection:string)=>{
      selection = selection.toLowerCase();
      if(this.user.status !== selection){
        let confirmActionName = 'activate';
        let loaderActionName = 'Activating';
        if(selection === 'banned'){
          confirmActionName = 'ban';
          loaderActionName = 'Banning';
        }else if(selection === 'disabled'){
          confirmActionName = 'disable';
          loaderActionName = 'Disabling';
        }
        
        return new Promise((resolve,reject)=>{
          let buttons = [
            { text: 'No', handler: reject },
            { text: 'Yes', handler: resolve },
          ];
          let msg = `Are you sure to ${confirmActionName} this user? The user will be logout automatically and will not be able login.`;
          if(selection === 'active'){
            msg = `Are you sure to ${confirmActionName} this user? The user can now login normally.`;
          }
          this.dialogUtil.showConfirm(msg,buttons,'');
        }).then(()=>{
          this.dialogUtil.showLoader(`${loaderActionName} user.`);
          this.userService.setUserStatus(this.user.uid, selection).then(()=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
          });
        }).catch(()=>{});
      }
    });
  }

  getUserStatusColor(){
    if(this.user.status === 'active'){
      return 'primary';
    }else if(this.user.status === 'banned'){
      return 'danger';
    }else if(this.user.status === 'disabled'){
      return 'disabled';
    }
  }

  goToSocialAccount(){
    if(this.user.facebook_id){
      this.helperUtil.launchURL(`http://facebook.com/${this.user.facebook_id}`);
    }else if(this.user.google_id){
      this.helperUtil.launchURL(`https://plus.google.com/u/0/${this.user.google_id}`);
    }else if(this.user.github_id){
      this.dialogUtil.showLoader(`Requesting user's GitHub url`);
      request(`https://api.github.com/user/${this.user.github_id}` , { json: true }, (err, res, body) => {
        this.dialogUtil.hideLoader();
        if(res.statusCode === 200 && body){
          this.helperUtil.launchURL(body.html_url);
        }else{
          this.dialogUtil.showToast('Unable to locate the github account for this user', 4000,'bottom');
        }
      });
    }
  }

  onUserPhotoLoad(){
    document.getElementById('user-photo-placeholder').classList.remove('shimmer');
  }

  retry(){
    this.errorLoad = false;
    this.pageLoaded = false;
    this.getUserData();
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
