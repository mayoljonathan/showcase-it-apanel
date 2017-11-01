webpackJsonp([26],{

/***/ 1163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeProfilePageModule", function() { return ChangeProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_profile__ = __webpack_require__(1343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__ = __webpack_require__(530);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChangeProfilePageModule = (function () {
    function ChangeProfilePageModule() {
    }
    return ChangeProfilePageModule;
}());
ChangeProfilePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__change_profile__["a" /* ChangeProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__["a" /* IonicImageViewerModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_profile__["a" /* ChangeProfilePage */]),
        ],
    })
], ChangeProfilePageModule);

//# sourceMappingURL=change-profile.module.js.map

/***/ }),

/***/ 1343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeProfilePage; });
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






var ChangeProfilePage = (function () {
    function ChangeProfilePage(formBuilder, navCtrl, navParams, adminService, userService, viewCtrl, dialogUtil, cacheService, fileService) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adminService = adminService;
        this.userService = userService;
        this.viewCtrl = viewCtrl;
        this.dialogUtil = dialogUtil;
        this.cacheService = cacheService;
        this.fileService = fileService;
        this.submitAttempt = false;
        this.alive = true;
        this.isUploading = false;
        this.errorUpload = false;
        this.progress = 0;
        this.password = '****************';
        this.passwordDirty = false;
        this.admin = new __WEBPACK_IMPORTED_MODULE_5__shared_models__["a" /* Admin */]();
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(50)]),
        });
    }
    ChangeProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ChangeProfilePage');
        this.adminService._getAdminData(this.cacheService.admin_uid)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (adminData) {
            console.log(adminData);
            _this.admin = adminData;
        });
    };
    ChangeProfilePage.prototype.onPhotoChange = function (event) {
        var _this = this;
        if (event.target.files) {
            var filename_1 = event.target.files[0]['name'];
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.uploadPhoto(event.target.result, filename_1);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    ChangeProfilePage.prototype.uploadPhoto = function (data, filename) {
        var _this = this;
        this.isUploading = true;
        this.fileService.uploadFile('admin_photo', "admin/photo/" + this.cacheService.admin_uid, data, filename)
            .subscribe(function (data) {
            if (data.progress) {
                _this.progress = data.progress;
            }
            else if (data.downloadURL) {
                _this.isUploading = false;
                _this.admin.photoURL = data.downloadURL;
                _this.photoUpload.nativeElement.value = '';
                _this.progress = 0;
                _this.adminService.updateProfile(_this.cacheService.admin_uid, _this.admin).then(function () {
                    _this.dialogUtil.showToast('Photo has been saved.', 3000, 'bottom');
                }, function (e) {
                    _this.dialogUtil.showToast('Error in saving the photo.', 3000, 'bottom');
                });
            }
            else if (data.error) {
                _this.isUploading = false;
                _this.errorUpload = true;
                _this.progress = 0;
                _this.photoUpload.nativeElement.value = '';
                if (data.error.code !== 'storage/canceled' || data.error.code === 'function/busy') {
                    _this.errorUpload = true;
                }
            }
        });
    };
    ChangeProfilePage.prototype.submitForm = function (form) {
        var _this = this;
        this.submitAttempt = true;
        if (form.valid) {
            this.admin.name = form.value.name;
            this.dialogUtil.showLoader('Updating profile.');
            this.adminService.updateProfile(this.cacheService.admin_uid, this.admin).then(function () {
                _this.dialogUtil.hideLoader();
                _this.dialogUtil.showToast('Profile updated successfully.', 3000, 'bottom');
            }, function (e) {
                _this.dialogUtil.hideLoader();
                _this.dialogUtil.showToast("An error has occured. " + e, 4000, 'bottom');
            });
        }
    };
    ChangeProfilePage.prototype.onPasswordFocus = function () {
        this.password = '';
        this.passwordDirty = true;
    };
    ChangeProfilePage.prototype.updatePassword = function () {
        var _this = this;
        if (this.passwordDirty) {
            if (this.password.length < 6) {
                this.dialogUtil.showToast('Password must be 6 characters above.', 3000, 'bottom');
            }
            else {
                this.dialogUtil.showLoader('Updating password.');
                this.adminService.updatePassword(this.password).then(function (res) {
                    _this.dialogUtil.hideLoader();
                    _this.dialogUtil.showToast('Password updated successfully.', 3000, 'bottom');
                    _this.password = '****************';
                    _this.passwordDirty = false;
                }, function (e) {
                    _this.dialogUtil.hideLoader();
                    console.log('Need reauthentication');
                    new Promise(function (resolve, reject) {
                        var promptTitle = 'Reauthenticate needed';
                        var promptMsg = 'Please enter your old password to reauthenticate.';
                        var inputs = {
                            name: 'password',
                            placeholder: 'Enter your password',
                            type: 'password',
                        };
                        var buttons = [
                            { text: 'Cancel', handler: reject },
                            { text: 'Ok', handler: resolve },
                        ];
                        _this.dialogUtil.showPrompt(promptTitle, promptMsg, inputs, buttons, 'password');
                    }).then(function (data) {
                        if (data.password.length < 6) {
                            return _this.dialogUtil.showToast('Password must be 6 characters above.', 4000, 'bottom');
                        }
                        _this.dialogUtil.showLoader('Authenticating user.');
                        _this.adminService.reauthenticateUser(data.password).then(function () {
                            _this.dialogUtil.hideLoader();
                            _this.dialogUtil.showToast('Reauthenticated! Changing your password.', 3000, 'bottom');
                            _this.updatePassword();
                        }, function (e) {
                            _this.dialogUtil.hideLoader();
                            _this.dialogUtil.handleErrors('Error in reauthentication. Password may not be correct.');
                        });
                    }, function () { });
                });
            }
        }
    };
    ChangeProfilePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ChangeProfilePage.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    return ChangeProfilePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('photoUpload'),
    __metadata("design:type", Object)
], ChangeProfilePage.prototype, "photoUpload", void 0);
ChangeProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-change-profile',template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\pages\change-profile\change-profile.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>Update Profile</ion-title>\n		<ion-buttons end>\n			<button ion-button (click)="dismiss()">\n				<ion-icon name="close" color="white"></ion-icon>\n			</button>\n		</ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="user-photo-container">\n    <img tappable [src]="admin?.photoURL ? admin?.photoURL : \'assets/images/user-placeholder.png\'" alt="" class="admin-photo" imageViewer>\n  </div>\n  <div class="flex-hv">\n    <div margin-top *ngIf="isUploading">Uploading {{progress ? progress : \'0\'}}%</div>\n    <div margin-top *ngIf="errorUpload">Error in uploading the photo</div>\n    <label class="custom-file-upload" margin-top tappable [hidden]="isUploading">Upload Photo\n      <input #photoUpload hidden type="file" accept="image/*" (change)="onPhotoChange($event)" />\n    </label>\n  </div>\n\n  <form [formGroup]="form" (ngSubmit)="submitForm(form)">\n    <ion-list>\n      <ion-item no-padding>\n        <ion-label floating>Name</ion-label>\n        <ion-input formControlName="name" type="text" [value]="admin?.name ? admin?.name : \'\'"></ion-input>  \n      </ion-item>\n      <p ion-text *ngIf="form.controls.name.value.trim().length==0 && (form.controls.name.dirty || submitAttempt)" color="danger">Name is required</p>\n      <p ion-text *ngIf="form.controls.name.value.trim().length>50 && (form.controls.name.dirty || submitAttempt)" color="danger">Name must not exceed to 50 characters</p>\n    \n      <ion-item no-padding>\n        <ion-label floating>Email</ion-label>\n        <ion-input disabled [value]="admin?.email ? admin?.email : \'\'"></ion-input>  \n      </ion-item>\n    </ion-list>\n\n    <ion-row margin-bottom float-right>\n      <button ion-button [disabled]="isUploading" type="submit">Save Changes</button>\n    </ion-row>\n  </form>\n\n  <ion-item no-padding>\n    <ion-label stacked>Password</ion-label>\n    <ion-input [(ngModel)]="password" type="password" (ionFocus)="onPasswordFocus()"></ion-input>  \n    <button type="button" (click)="updatePassword()" ion-button item-right [disabled]="!passwordDirty || password.length<6">Update</button>\n  </ion-item>\n  <p ion-text *ngIf="password.length<6" color="danger">Password must be 6 characters above</p>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\pages\change-profile\change-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["a" /* AdminService */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["f" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["D" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4__shared_utils___["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_3__shared_services___["d" /* FileService */]])
], ChangeProfilePage);

//# sourceMappingURL=change-profile.js.map

/***/ })

});
//# sourceMappingURL=26.js.map