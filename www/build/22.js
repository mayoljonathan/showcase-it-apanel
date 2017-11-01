webpackJsonp([22],{

/***/ 1182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAdministratorPageModule", function() { return AddAdministratorPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_administrator__ = __webpack_require__(1363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddAdministratorPageModule = (function () {
    function AddAdministratorPageModule() {
    }
    return AddAdministratorPageModule;
}());
AddAdministratorPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_administrator__["a" /* AddAdministratorPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_administrator__["a" /* AddAdministratorPage */]),
        ],
    })
], AddAdministratorPageModule);

//# sourceMappingURL=add-administrator.module.js.map

/***/ }),

/***/ 1363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAdministratorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services___ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_utils___ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_models__ = __webpack_require__(529);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import * as EmailValidator from 'email-validator';
var AddAdministratorPage = (function () {
    // administratorForm: FormGroup;
    // name: AbstractControl;
    // email: AbstractControl;
    // password: AbstractControl;
    function AddAdministratorPage(formBuilder, navCtrl, navParams, adminService, userService, viewCtrl, dialogUtil) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adminService = adminService;
        this.userService = userService;
        this.viewCtrl = viewCtrl;
        this.dialogUtil = dialogUtil;
        this.useDefaultPassword = false;
        this.submitAttempt = false;
        this.admin = new __WEBPACK_IMPORTED_MODULE_5__shared_models__["a" /* Admin */]();
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
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(50)]),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].email])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]({ value: '', disabled: false }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(6)])
        });
    }
    AddAdministratorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddAdministratorPage');
    };
    AddAdministratorPage.prototype.setDefaultPassword = function (checked) {
        this.useDefaultPassword = checked;
        checked ? this.form.controls.password.setValue('abc123') : this.form.controls.password.setValue('');
    };
    AddAdministratorPage.prototype.onSuperAdminChange = function (checked) {
        this.admin.superAdmin = checked;
    };
    AddAdministratorPage.prototype.submitForm = function (form) {
        var _this = this;
        this.submitAttempt = true;
        if (form.valid) {
            var data_1 = form.value;
            data_1['superAdmin'] = this.admin.superAdmin;
            this.dialogUtil.showLoader('Checking email address if it exists.');
            this.adminService.checkEmailIfExists(data_1.email).then(function (res) {
                if (res.exists) {
                    _this.dialogUtil.hideLoader();
                    return _this.dialogUtil.showToast('Email address is taken. Please choose another one.', 4000, 'bottom');
                }
                else {
                    _this.dialogUtil.hideLoader();
                    _this.dialogUtil.showLoader('Adding administrator account.');
                    _this.adminService.addAdministrator(data_1).then(function () {
                        _this.dialogUtil.hideLoader();
                        _this.dismiss();
                        return _this.dialogUtil.showToast('Administrator account successfully added.', 4000, 'bottom');
                    }, function (e) {
                        _this.dialogUtil.hideLoader();
                        _this.dialogUtil.showToast("An error has occured. " + e, 4000, 'bottom');
                    });
                }
            });
        }
    };
    AddAdministratorPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddAdministratorPage;
}());
AddAdministratorPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-add-administrator',template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\pages\user-accounts-tabs\add-administrator\add-administrator.html"*/'<ion-header>\n\n  <ion-toolbar color="primary">\n\n    <ion-title>Add Administrator</ion-title>\n\n    <ion-buttons end>\n\n			<button ion-button (click)="dismiss()">\n\n				<ion-icon name="close" color="white"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding-left padding-right>\n\n\n\n  <form [formGroup]="form" (ngSubmit)="submitForm(form)">\n\n    <ion-list>\n\n      <ion-item no-padding>\n\n        <ion-label floating>Name</ion-label>\n\n        <ion-input formControlName="name" type="text"></ion-input>  \n\n      </ion-item>\n\n      <p ion-text *ngIf="form.controls.name.value.trim().length==0 && (form.controls.name.dirty || submitAttempt)" color="danger">Name is required</p>\n\n      <p ion-text *ngIf="form.controls.name.value.trim().length>50 && (form.controls.name.dirty || submitAttempt)" color="danger">Name must not exceed to 50 characters</p>\n\n    \n\n      <ion-item no-padding>\n\n        <ion-label floating>Email address</ion-label>\n\n        <ion-input formControlName="email" type="email"></ion-input>  \n\n      </ion-item>\n\n      <p ion-text *ngIf="form.controls.email.value.trim().length==0 && (form.controls.email.dirty || submitAttempt)" color="danger">Email address is required</p>\n\n      <p ion-text *ngIf="form.controls.email.value.trim().length!=0 && (!form.controls.email.valid && (form.controls.email.dirty || submitAttempt))" color="danger">Please enter a valid email address</p>\n\n      \n\n      <ion-item no-padding>\n\n        <ion-label floating>Password</ion-label>\n\n        <ion-input formControlName="password" type="password" [disabled]="useDefaultPassword"></ion-input>  \n\n      </ion-item>\n\n      <p ion-text *ngIf="form.controls.password.value.trim().length==0 && (form.controls.password.dirty || submitAttempt)" color="danger">Password is required</p>\n\n      <p ion-text *ngIf="(form.controls.password.value.trim().length!=0 && form.controls.password.value.trim().length<6) && (form.controls.password.dirty || submitAttempt)" color="danger">Password must be at least 6 characters</p>\n\n      \n\n    </ion-list>\n\n\n\n    <ion-row float-left class="mtop-10">\n\n      <div class="center" float-right>\n\n        <ion-col col-auto style="vertical-align:sub"> \n\n          <ion-checkbox (ionChange)="setDefaultPassword($event.value)"></ion-checkbox>\n\n        </ion-col>\n\n        <ion-col>Use default password</ion-col>\n\n      </div>\n\n    </ion-row>\n\n\n\n    <ion-row float-left class="mleft-10 mtop-10">\n\n      <div class="center" float-right>\n\n        <ion-col col-auto style="vertical-align:sub"> \n\n          <ion-checkbox (ionChange)="onSuperAdminChange($event.value)"></ion-checkbox>\n\n        </ion-col>\n\n        <ion-col>Super Administrator</ion-col>\n\n      </div>\n\n    </ion-row>\n\n    <ion-row margin-bottom float-right>\n\n      <button ion-button type="submit">Add Administrator</button>\n\n    </ion-row>\n\n  </form>\n\n\n\n  <!--<form [formGroup]="form">-->\n\n  <!--  <ion-item no-padding>-->\n\n  <!--    <ion-label floating>Name</ion-label>-->\n\n  <!--    <ion-input formControlName="name" type="text"></ion-input>  -->\n\n  <!--  </ion-item>-->\n\n  <!--</form>-->\n\n\n\n  <!--<div [formGroup]="administratorForm" (ngSubmit)="submitForm(administratorForm)">-->\n\n    <!--<ion-list>-->\n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Name</ion-label>-->\n\n  <!--      <ion-input formControlName="name" type="text"></ion-input>  -->\n\n  <!--    </ion-item>-->\n\n      <!--<ion-item *ngIf="!form.controls.name.valid  && (form.controls.name.dirty || submitAttempt)">-->\n\n      <!--    <p>Name is required</p>-->\n\n      <!--</ion-item>-->\n\n      \n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Email address</ion-label>-->\n\n  <!--      <ion-input formControlName="email" type="email"></ion-input>-->\n\n  <!--    </ion-item>-->\n\n      <!--<ion-item *ngIf="!form.controls.email.valid  && (form.controls.email.dirty || submitAttempt)">-->\n\n      <!--    <p>Please a valid email.</p>-->\n\n      <!--</ion-item>-->\n\n      \n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Password</ion-label>-->\n\n  <!--      <ion-input formControlName="password" type="password"></ion-input>-->\n\n         <!--[disabled]="useDefaultPassword"-->\n\n  <!--    </ion-item>-->\n\n      <!--<ion-item *ngIf="!form.controls.password.valid  && (form.controls.password.dirty || submitAttempt)">-->\n\n      <!--    <p>Please enter the password.</p>-->\n\n      <!--</ion-item>-->\n\n    <!--</ion-list>-->\n\n\n\n    <!--<ion-row float-left class="mtop-10">-->\n\n    <!--  <div class="center" float-right>-->\n\n    <!--    <ion-col col-auto style="vertical-align:sub"> -->\n\n    <!--      <ion-checkbox [(ngModel)]="useDefaultPassword"></ion-checkbox>-->\n\n    <!--    </ion-col>-->\n\n    <!--    <ion-col>Use default password</ion-col>-->\n\n    <!--  </div>-->\n\n    <!--</ion-row>-->\n\n\n\n    <!--<ion-row float-right>-->\n\n    <!--  <button ion-button type="submit">Add Administrator</button>-->\n\n    <!--</ion-row>-->\n\n  <!--</div>-->\n\n\n\n  <!--SAMPLE-->\n\n  <!--<form #form="ngForm" (ngSubmit)="submitForm(form)" novalidate>-->\n\n  <!--  <ion-list>-->\n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Name</ion-label>-->\n\n  <!--      <ion-input type="text" [(ngModel)]="admin.name" name="name" #name="ngModel" required></ion-input>-->\n\n  <!--    </ion-item>-->\n\n  <!--    <p ion-text [hidden]="name.valid || form.submitted === false" color="danger"> Name is required </p>-->\n\n      \n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Email address</ion-label>-->\n\n  <!--      <ion-input type="email" [(ngModel)]="admin.email" name="email" #email="ngModel" required></ion-input>-->\n\n  <!--    </ion-item>-->\n\n  <!--    <p ion-text [hidden]="email.valid || form.submitted === false" color="danger"> Enter a valid email address </p>-->\n\n      \n\n  <!--    <ion-item no-padding>-->\n\n  <!--      <ion-label floating>Password</ion-label>-->\n\n  <!--      <ion-input type="text" [(ngModel)]="admin.password" name="password" #password="ngModel" minLength="6" required></ion-input>-->\n\n  <!--    </ion-item>-->\n\n  <!--    <p ion-text [hidden]="password.length>6 || form.submitted === false" color="danger"> Minimum of 6 characters </p>-->\n\n  <!--    <p ion-text [hidden]="(password.length<6 && password.valid) || form.submitted === false" color="danger"> Password is required </p>-->\n\n      \n\n  <!--  </ion-list>-->\n\n    \n\n  <!--  <ion-row float-right>-->\n\n  <!--    <button ion-button type="submit">Add Administrator</button>-->\n\n  <!--  </ion-row>-->\n\n\n\n  <!--</form>-->\n\n  \n\n  \n\n  \n\n  <!--NEW-->\n\n  \n\n\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\pages\user-accounts-tabs\add-administrator\add-administrator.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["a" /* AdminService */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["f" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["D" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4__shared_utils___["a" /* DialogUtil */]])
], AddAdministratorPage);

//# sourceMappingURL=add-administrator.js.map

/***/ })

});
//# sourceMappingURL=22.js.map