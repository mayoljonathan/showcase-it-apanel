import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl }   from '@angular/forms';

import { AppService,AdminService,UserService,CacheService,FileService } from "../../shared/services/";
import { DialogUtil } from "../../shared/utils/";

import { Admin } from '../../shared/models';

@IonicPage()
@Component({
  selector: 'page-change-profile',
  templateUrl: 'change-profile.html',
})
export class ChangeProfilePage {

  @ViewChild('photoUpload') photoUpload;

  admin: Admin;

  private form: FormGroup;
  submitAttempt:boolean = false;

  alive: boolean = true;

  isUploading: boolean = false;
  errorUpload: boolean = false;
  progress: number= 0;

  password: string = '****************';
  passwordDirty: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public adminService: AdminService,
    public userService: UserService,
    public viewCtrl: ViewController,
    public dialogUtil: DialogUtil,
    public cacheService: CacheService,
    public fileService: FileService,
  ) {
    this.admin = new Admin();
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeProfilePage');
    this.adminService._getAdminData(this.cacheService.admin_uid)
      .takeWhile(()=>this.alive)
      .subscribe(adminData=>{
        console.log(adminData);
        this.admin = adminData;
      });
  }

  onPhotoChange(event:any){
    if (event.target.files) {
      let filename = event.target.files[0]['name'];
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.uploadPhoto(event.target.result,filename);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadPhoto(data,filename){
    this.isUploading = true;
    this.fileService.uploadFile('admin_photo',`admin/photo/${this.cacheService.admin_uid}`,data,filename)
        // .takeWhile(()=>this.alive)
        .subscribe((data:any)=>{
          if(data.progress){
            this.progress = data.progress;
          }else if(data.downloadURL){
            this.isUploading = false;
            this.admin.photoURL = data.downloadURL;
            this.photoUpload.nativeElement.value = '';
            this.progress = 0;
            this.adminService.updateProfile(this.cacheService.admin_uid, this.admin).then(()=>{
              this.dialogUtil.showToast('Photo has been saved.', 3000, 'bottom');
            },e=>{
              this.dialogUtil.showToast('Error in saving the photo.', 3000, 'bottom');
            });
          }else if(data.error){
            this.isUploading = false;
            this.errorUpload = true;
            this.progress = 0;
            this.photoUpload.nativeElement.value = '';
            if(data.error.code !== 'storage/canceled' || data.error.code === 'function/busy'){
              this.errorUpload = true;
            }
          }
        });

  }

  submitForm(form){
    this.submitAttempt = true;
    if(form.valid){
      this.admin.name = form.value.name;
      this.dialogUtil.showLoader('Updating profile.');
      this.adminService.updateProfile(this.cacheService.admin_uid,this.admin).then(()=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast('Profile updated successfully.', 3000, 'bottom');
      },e=>{
        this.dialogUtil.hideLoader();
        this.dialogUtil.showToast(`An error has occured. ${e}`, 4000, 'bottom');
      });
    }
  }
  
  onPasswordFocus(){
    this.password = '';
    this.passwordDirty = true;
  }

  updatePassword(){
    if(this.passwordDirty){
      if(this.password.length < 6){
        this.dialogUtil.showToast('Password must be 6 characters above.',3000,'bottom');
      }else{
        this.dialogUtil.showLoader('Updating password.');
        this.adminService.updatePassword(this.password).then((res)=>{
          this.dialogUtil.hideLoader();
          this.dialogUtil.showToast('Password updated successfully.',3000,'bottom');
          this.password = '****************';
          this.passwordDirty = false;
        },e=>{
          this.dialogUtil.hideLoader();
          console.log('Need reauthentication');
          new Promise((resolve,reject)=>{
            let promptTitle = 'Reauthenticate needed';
            let promptMsg = 'Please enter your old password to reauthenticate.';
            let inputs = {
              name: 'password',
              placeholder: 'Enter your password',
              type: 'password',
            };
            let buttons = [
              { text: 'Cancel', handler: reject },
              { text: 'Ok', handler: resolve },
            ];
            this.dialogUtil.showPrompt(promptTitle,promptMsg,inputs,buttons,'password');
          }).then((data:any)=>{
            if(data.password.length < 6){
              return this.dialogUtil.showToast('Password must be 6 characters above.', 4000, 'bottom');
            }
            this.dialogUtil.showLoader('Authenticating user.');
            this.adminService.reauthenticateUser(data.password).then(()=>{
              this.dialogUtil.hideLoader();
              this.dialogUtil.showToast('Reauthenticated! Changing your password.', 3000,'bottom');
              this.updatePassword();
            },e=>{
              this.dialogUtil.hideLoader();
              this.dialogUtil.handleErrors('Error in reauthentication. Password may not be correct.');
            });
          },()=>{});

        });
      }
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
