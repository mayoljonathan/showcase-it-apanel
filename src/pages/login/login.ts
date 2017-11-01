import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

import * as EmailValidator from 'email-validator';

import { Admin } from "../../shared/models/";
import { AdminService,CacheService } from "../../shared/services/";

import { DialogUtil } from "../../shared/utils/";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  admin : Admin;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public cacheService: CacheService,
    public dialogUtil: DialogUtil,
    public adminService: AdminService  
  ) {
    this.admin = new Admin();
    // this.admin.email = 'showcase.it.team@gmail.com';
    // this.admin.password = 'abc123';
    this.admin.email = '';
    this.admin.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    if(!this.admin.email){
      this.dialogUtil.showToast('Please input your email address.', 3000, 'bottom');
    }else if(!EmailValidator.validate(this.admin.email)){
      this.dialogUtil.showToast('Email address is not valid.', 3000, 'bottom');
    }else if(!this.admin.password){
      this.dialogUtil.showToast('Please input your password.', 3000, 'bottom');
    }else{
      this.dialogUtil.showLoader('Signing in.');
      this.adminService.signInWithEmail(this.admin).then(res=>{
        // If credentials are correct in authentication
        if(res){
          this.adminService.getAdminData(res.uid).then((adminData:Admin)=>{
            // No credentials found in firebase db
            if(!adminData){
              this.adminService.signOut();
              return this.dialogUtil.showAlert('There are no users found in your credentials.','Ok');
            }
            // If credentials found in firebase db
            if(adminData.status === 'disabled'){
              this.dialogUtil.showAlert('Your account has been disabled by the Super admin.', 'Ok');
              this.adminService.signOut();
            }else if(adminData.status === 'active'){
              this.dialogUtil.showToast(`Welcome ${adminData.name}!`, 3000, 'bottom');
              this.navCtrl.setRoot('DashboardPage');
              setTimeout(()=>{
                this.menuCtrl.enable(true);
              });
            }else{
              this.dialogUtil.showAlert('Unable to sign in this account. Please contact the Super admin.', 'Ok');
              this.adminService.signOut();
            }
          });
        }
        this.dialogUtil.hideLoader();
      },error=>{
        let msg = error.message;
        if(error['code'] === 'auth/user-not-found'){
          msg = `The email address you've entered doesn't match any account.`;
        }else if(error['code'] === 'auth/user-disabled'){
          msg = `Your account has been disabled by the Super admin.`;
        }
        this.dialogUtil.showAlert(msg,'Ok');
        this.dialogUtil.hideLoader();
      });
    }

  }

  forgotPassword(){
    new Promise((resolve,reject)=>{
      let promptTitle = 'Forgot password';
      let promptMsg = 'Please enter your email address so that we can send a password reset link.';
      let inputs = {
        name: 'email',
        placeholder: 'Email address',
        value: this.admin.email
      };
      let buttons = [
        { text: 'Cancel', handler: reject },
        { text: 'Send', handler: resolve },
      ];
      this.dialogUtil.showPrompt(promptTitle,promptMsg,inputs,buttons);
    }).then((data:any)=>{
      if(!EmailValidator.validate(data.email)){
        this.dialogUtil.showToast('Email address is not valid.', 3000, 'bottom');
      }else if(!data.email){
        this.dialogUtil.showToast('Please input your email address.', 3000, 'bottom');
      }else{
        this.dialogUtil.showLoader('Sending a password reset link.');
        this.adminService.sendPasswordReset(data.email).then(()=>{
          this.dialogUtil.showToast(`Password reset link successfully sent to ${data.email}`, 4000,'bottom');
          this.dialogUtil.hideLoader();
        },()=>{
          this.dialogUtil.showToast('Error in sending a password reset link.', 3000, 'bottom');
          this.dialogUtil.hideLoader();
        });
      }
    },()=>{});
  }

  ionViewCanEnter(){
      return !this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

}
