import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl }   from '@angular/forms';

import { AppService,AdminService,UserService } from "../../../shared/services/";
import { DialogUtil } from "../../../shared/utils/";

import { Admin } from '../../../shared/models';

// import * as EmailValidator from 'email-validator';

@IonicPage()
@Component({
  selector: 'page-add-administrator',
  templateUrl: 'add-administrator.html',
  // directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AddAdministratorPage {
  
  admin: Admin;

  private form: FormGroup;
  
  useDefaultPassword:boolean = false;
  submitAttempt:boolean = false;

  // administratorForm: FormGroup;
  // name: AbstractControl;
  // email: AbstractControl;
  // password: AbstractControl;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public adminService: AdminService,
    public userService: UserService,
    public viewCtrl: ViewController,
    public dialogUtil: DialogUtil,
  ) {
    this.admin = new Admin();
    this.admin.superAdmin = false;
    // this.form = formBuilder.group({
    //   name: ['',Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required]) ],
    //   email: ['',Validators.compose([Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'), Validators.required]) ],
    //   password: ['',Validators.required]
    // });
    // this.administratorForm = this.formBuilder.group({
    //   name: ['', Validators.compose([Validators.required])],
    //   email: ['', Validators.compose([Validators.required])],
    //   password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    // });
    // this.name = this.administratorForm.controls['name'];
    // this.email = this.administratorForm.controls['email'];
    // this.password = this.administratorForm.controls['password'];
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required,Validators.maxLength(50)]),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl({value:'',disabled: false}, [Validators.required,Validators.minLength(6)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdministratorPage');
  }
  
  setDefaultPassword(checked){
    this.useDefaultPassword = checked;
    checked ? this.form.controls.password.setValue('abc123') : this.form.controls.password.setValue('');
  }

  onSuperAdminChange(checked){
    this.admin.superAdmin = checked;
  }

  submitForm(form){
    this.submitAttempt = true;
    if(form.valid){
      let data = form.value;
      data['superAdmin'] = this.admin.superAdmin;
      this.dialogUtil.showLoader('Checking email address if it exists.');
      this.adminService.checkEmailIfExists(data.email).then((res:any)=>{
        if(res.exists){
          this.dialogUtil.hideLoader();
          return this.dialogUtil.showToast('Email address is taken. Please choose another one.', 4000, 'bottom');
        }else{
          this.dialogUtil.hideLoader();
          this.dialogUtil.showLoader('Adding administrator account.');
          this.adminService.addAdministrator(data).then(()=>{
            this.dialogUtil.hideLoader();
            this.dismiss();
            return this.dialogUtil.showToast('Administrator account successfully added.', 4000, 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`An error has occured. ${e}`, 4000, 'bottom');
          });
        }
      });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
