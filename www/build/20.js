webpackJsonp([20],{

/***/ 1165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(1345);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 1345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_email_validator__ = __webpack_require__(1346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_email_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_email_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models___ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services___ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_utils___ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, menuCtrl, cacheService, dialogUtil, adminService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.cacheService = cacheService;
        this.dialogUtil = dialogUtil;
        this.adminService = adminService;
        this.admin = new __WEBPACK_IMPORTED_MODULE_3__shared_models___["a" /* Admin */]();
        this.admin.email = '';
        this.admin.password = '';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        if (!this.admin.email) {
            this.dialogUtil.showToast('Please input your email address.', 3000, 'bottom');
        }
        else if (!__WEBPACK_IMPORTED_MODULE_2_email_validator__["validate"](this.admin.email)) {
            this.dialogUtil.showToast('Email address is not valid.', 3000, 'bottom');
        }
        else if (!this.admin.password) {
            this.dialogUtil.showToast('Please input your password.', 3000, 'bottom');
        }
        else {
            this.dialogUtil.showLoader('Signing in.');
            this.adminService.signInWithEmail(this.admin).then(function (res) {
                // If credentials are correct in authentication
                if (res) {
                    _this.adminService.getAdminData(res.uid).then(function (adminData) {
                        // No credentials found in firebase db
                        if (!adminData) {
                            _this.adminService.signOut();
                            return _this.dialogUtil.showAlert('There are no users found in your credentials.', 'Ok');
                        }
                        // If credentials found in firebase db
                        if (adminData.status === 'disabled') {
                            _this.dialogUtil.showAlert('Your account has been disabled by the Super admin.', 'Ok');
                            _this.adminService.signOut();
                        }
                        else if (adminData.status === 'active') {
                            _this.dialogUtil.showToast("Welcome " + adminData.name + "!", 3000, 'bottom');
                            _this.navCtrl.setRoot('DashboardPage');
                            setTimeout(function () {
                                _this.menuCtrl.enable(true);
                            });
                        }
                        else {
                            _this.dialogUtil.showAlert('Unable to sign in this account. Please contact the Super admin.', 'Ok');
                            _this.adminService.signOut();
                        }
                    });
                }
                _this.dialogUtil.hideLoader();
            }, function (error) {
                var msg = error.message;
                if (error['code'] === 'auth/user-not-found') {
                    msg = "The email address you've entered doesn't match any account.";
                }
                else if (error['code'] === 'auth/user-disabled') {
                    msg = "Your account has been disabled by the Super admin.";
                }
                _this.dialogUtil.showAlert(msg, 'Ok');
                _this.dialogUtil.hideLoader();
            });
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        new Promise(function (resolve, reject) {
            var promptTitle = 'Forgot password';
            var promptMsg = 'Please enter your email address so that we can send a password reset link.';
            var inputs = {
                name: 'email',
                placeholder: 'Email address',
                value: _this.admin.email
            };
            var buttons = [
                { text: 'Cancel', handler: reject },
                { text: 'Send', handler: resolve },
            ];
            _this.dialogUtil.showPrompt(promptTitle, promptMsg, inputs, buttons);
        }).then(function (data) {
            if (!__WEBPACK_IMPORTED_MODULE_2_email_validator__["validate"](data.email)) {
                _this.dialogUtil.showToast('Email address is not valid.', 3000, 'bottom');
            }
            else if (!data.email) {
                _this.dialogUtil.showToast('Please input your email address.', 3000, 'bottom');
            }
            else {
                _this.dialogUtil.showLoader('Sending a password reset link.');
                _this.adminService.sendPasswordReset(data.email).then(function () {
                    _this.dialogUtil.showToast("Password reset link successfully sent to " + data.email, 4000, 'bottom');
                    _this.dialogUtil.hideLoader();
                }, function () {
                    _this.dialogUtil.showToast('Error in sending a password reset link.', 3000, 'bottom');
                    _this.dialogUtil.hideLoader();
                });
            }
        }, function () { });
    };
    LoginPage.prototype.ionViewCanEnter = function () {
        return !this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\login\login.html"*/'<ion-content class="default-bg">\n\n  <div class="login-container">\n    <ion-card padding>\n      <ion-card-header>\n        <div class="logo-container"></div>\n        <h1 class="title" text-center text-wrap>ShowcaseIT - Admin Panel</h1>\n      </ion-card-header>\n\n      <ion-card-content padding>\n        <ion-item no-padding>\n          <ion-label floating>Email address</ion-label>\n          <ion-input type="email" [(ngModel)]="admin.email" (keyup.enter)="signIn()"></ion-input>\n        </ion-item>\n\n        <ion-item no-padding>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="admin.password" (keyup.enter)="signIn()"></ion-input>\n        </ion-item>\n        <ion-item no-padding>\n          <ion-label color="primary">\n            <span (click)="forgotPassword()" tappable class="size-14">Forgot Password?</span>\n          </ion-label>  \n        </ion-item>\n\n        <ion-row margin-top class="flex-h">\n          <button class="round-button" (click)="signIn()">\n            <ion-icon class="medium-icon" name="md-arrow-forward" color="primary-text"></ion-icon>\n          </button>\n        </ion-row>\n\n      </ion-card-content>\n\n    </ion-card>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_5__shared_utils___["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_4__shared_services___["a" /* AdminService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 1346:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
exports.validate = function(email)
{
	if (!email)
		return false;
		
	if(email.length>254)
		return false;

	var valid = tester.test(email);
	if(!valid)
		return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if(parts[0].length>64)
		return false;

	var domainParts = parts[1].split(".");
	if(domainParts.some(function(part) { return part.length>63; }))
		return false;

	return true;
}


/***/ })

});
//# sourceMappingURL=20.js.map