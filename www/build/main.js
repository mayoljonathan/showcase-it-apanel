webpackJsonp([7],{

/***/ 184:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 184;

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/analytics/analytics.module": [
		725,
		6
	],
	"../pages/home/home.module": [
		724,
		5
	],
	"../pages/login/login.module": [
		726,
		2
	],
	"../pages/request-tabs/content-update/content-update.module": [
		728,
		4
	],
	"../pages/request-tabs/detailed-app/detailed-app.module": [
		729,
		1
	],
	"../pages/request-tabs/publish-request/publish-request.module": [
		730,
		0
	],
	"../pages/request-tabs/request-tabs.module": [
		727,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 226;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(353);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic2_super_tabs__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_material_icons__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_clipboard__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_browser_tab__ = __webpack_require__(866);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__ = __webpack_require__(867);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Native


// Modules




// import { TooltipsModule } from 'ionic-tooltips';

// Providers




// Ionic native



// import { ComponentsModule } from "../components/components.module";
// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyDsUKRYcTMx0EI2jtLAKY84j2dM9vTKW68",
    authDomain: "showcase-it.firebaseapp.com",
    databaseURL: "https://showcase-it.firebaseio.com",
    projectId: "showcase-it",
    storageBucket: "showcase-it.appspot.com",
    messagingSenderId: "648259907848"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_9_ionic2_material_icons__["a" /* MaterialIconsModule */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__["a" /* IonicImageViewerModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/analytics/analytics.module#AnalyticsPageModule', name: 'AnalyticsPage', segment: 'analytics', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/request-tabs.module#RequestTabsPageModule', name: 'RequestTabsPage', segment: 'requests', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/content-update/content-update.module#ContentUpdatePageModule', name: 'ContentUpdatePage', segment: 'content-update', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/detailed-app/detailed-app.module#DetailedAppPageModule', name: 'DetailedAppPage', segment: 'details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/publish-request/publish-request.module#PublishRequestPageModule', name: 'PublishRequestPage', segment: 'publish', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_13__shared_services__["e" /* UserService */], __WEBPACK_IMPORTED_MODULE_13__shared_services__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_13__shared_services__["c" /* CacheService */], __WEBPACK_IMPORTED_MODULE_13__shared_services__["b" /* AppService */], __WEBPACK_IMPORTED_MODULE_13__shared_services__["d" /* FileService */],
            __WEBPACK_IMPORTED_MODULE_14__shared_utils__["c" /* PlatformUtil */], __WEBPACK_IMPORTED_MODULE_14__shared_utils__["a" /* DialogUtil */], __WEBPACK_IMPORTED_MODULE_14__shared_utils__["b" /* HelperUtil */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_browser_tab__["a" /* BrowserTab */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["a" /* AngularFireAuth */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
var CacheService = (function () {
    function CacheService(
        // public afAuth: AngularFireAuth,
        // public afDB: AngularFireDatabase,
        storage) {
        this.storage = storage;
        this.admin_uid = '';
        this.admin_status = '';
        // appLoadedOnce: boolean = false;
        this.isDoneCheckingAdminData = false;
        this.isConnected = false;
        this.isSignInPage = true;
    }
    Object.defineProperty(CacheService.prototype, "isLoggedIn", {
        get: function () {
            return !!this.admin_uid && this.admin_status === 'active';
        },
        enumerable: true,
        configurable: true
    });
    CacheService.prototype.getStorage = function (key) {
        return this.storage.get(key);
    };
    CacheService.prototype.setStorage = function (key, value) {
        return this.storage.set(key, value);
    };
    CacheService.prototype.removeStorage = function (key) {
        return this.storage.remove(key);
    };
    return CacheService;
}());
CacheService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], CacheService);

//# sourceMappingURL=cache.service.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5____ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AngularFireAuth } from 'angularfire2/auth';
// import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
// import { Network } from '@ionic-native/network';

// Services

var UserService = (function () {
    function UserService(
        // public afAuth: AngularFireAuth,
        afDB, 
        // public fb: Facebook,
        // public network: Network,
        dialogUtil, menuCtrl, platformUtil, cacheService) {
        this.afDB = afDB;
        this.dialogUtil = dialogUtil;
        this.menuCtrl = menuCtrl;
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
    }
    UserService.prototype.getUsers = function (type) {
        if (type === 'all') {
            return this.afDB.list("users/user_data");
        }
        else if (type === 'online_users') {
            return this.afDB.list("_server/user_presence/");
        }
    };
    UserService.prototype.getUserData = function (user_uid) {
        return this.afDB.object("users/user_data/" + user_uid);
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_5____["c" /* CacheService */]])
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlatformUtil = (function () {
    function PlatformUtil(platform) {
        this.platform = platform;
    }
    PlatformUtil.prototype.checkPlatform = function () {
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            console.log("Using a browser");
            return "browser";
        }
        else if (this.platform.is("android")) {
            console.log("You are using a android app");
            return "android";
        }
        else {
            console.log("Action is not supported in this platform");
            return null;
        }
    };
    PlatformUtil.prototype.isTouchDevice = function () {
        if (this.platform.is('core')) {
            return false;
        }
        else if (this.platform.is('android') || this.platform.is('mobile') || this.platform.is('mobileweb') || this.platform.is('tablet') || this.platform.is('phablet')) {
            return true;
        }
    };
    return PlatformUtil;
}());
PlatformUtil = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* Platform */]])
], PlatformUtil);

//# sourceMappingURL=platform.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogUtil = (function () {
    function DialogUtil(alertCtrl, toastCtrl, actionSheetCtrl, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    DialogUtil.prototype.showLoader = function (content, insistData) {
        var _this = this;
        if (content === void 0) { content = 'Loading'; }
        if (insistData === void 0) { insistData = false; }
        var timeoutMs = 30000;
        var timeoutListener;
        this.loader = this.loadingCtrl.create({
            content: content,
            enableBackdropDismiss: false,
        });
        this.loader.onDidDismiss(function () {
            clearInterval(timeoutListener);
        });
        this.loader.present().then(function () {
            if (insistData) {
                timeoutListener = setInterval(function () {
                    console.log("TIMEOUT in Loader");
                    // console.log(this.loader);
                    _this.loader.data.content = 'Looks like you have slow connection. Click outside to hide.';
                    _this.loader.data.enableBackdropDismiss = true;
                    clearInterval(timeoutListener);
                }, timeoutMs);
            }
        });
    };
    DialogUtil.prototype.hideLoader = function () {
        if (this.loader) {
            this.loader.dismiss();
        }
    };
    DialogUtil.prototype.showAlert = function (content, button, title) {
        console.log(content);
        this.alertCtrl.create({
            title: title,
            subTitle: content,
            // message: content,
            buttons: [button]
        }).present();
    };
    DialogUtil.prototype.showConfirm = function (content, buttons, title) {
        this.alertCtrl.create({
            title: title,
            subTitle: content,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: buttons[0].text,
                    role: 'cancel',
                    handler: function () {
                        buttons[0].handler();
                    }
                },
                {
                    text: buttons[1].text,
                    handler: function () {
                        buttons[1].handler();
                    }
                }
            ]
        }).present();
    };
    DialogUtil.prototype.showActionSheet = function (content, buttons, title) {
        this.actionSheetCtrl.create({
            title: title,
            subTitle: content,
            buttons: buttons
        }).present();
    };
    DialogUtil.prototype.showPrompt = function (title, message, inputs, buttons) {
        this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: inputs.name,
                    placeholder: inputs.placeholder,
                    value: inputs.value
                },
            ],
            buttons: [
                {
                    text: buttons[0].text,
                    role: 'cancel',
                    handler: function (data) {
                        buttons[0].handler();
                    }
                },
                {
                    text: buttons[1].text,
                    handler: function (data) {
                        buttons[1].handler(data);
                    }
                }
            ]
        }).present();
    };
    DialogUtil.prototype.showCheckbox = function (choices, buttons, title) {
        var _this = this;
        return new Promise(function (resolve) {
            var alert = _this.alertCtrl.create();
            alert.setTitle(title);
            choices.forEach(function (choice) {
                alert.addInput({
                    type: 'checkbox',
                    label: choice.name,
                    value: choice.name,
                    checked: choice.checked
                });
            });
            alert.addButton(buttons[0]);
            alert.addButton({
                text: buttons[1],
                handler: function (data) {
                    console.log('This is what i chose(TRUE): ' + data);
                    resolve(data);
                }
            });
            alert.present();
        });
    };
    DialogUtil.prototype.showToast = function (message, duration, position, showCloseButton, closeButtonText) {
        this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            showCloseButton: showCloseButton,
            closeButtonText: closeButtonText,
        }).present();
    };
    DialogUtil.prototype.handleErrors = function (reason) {
        if (reason === void 0) { reason = 'An error has occured. Please try again.'; }
        this.alertCtrl.create({
            title: 'Error occured',
            subTitle: reason,
            buttons: ['Ok']
        }).present();
    };
    return DialogUtil;
}());
DialogUtil = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* LoadingController */]])
], DialogUtil);

//# sourceMappingURL=dialog.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_browser_tab__ = __webpack_require__(866);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(867);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HelperUtil = (function () {
    function HelperUtil(clipboard, browserTab, iab, platformUtil) {
        this.clipboard = clipboard;
        this.browserTab = browserTab;
        this.iab = iab;
        this.platformUtil = platformUtil;
    }
    HelperUtil.prototype.copyText = function (text) {
        if (this.platformUtil.checkPlatform() === 'android') {
            return this.clipboard.copy(text);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard___default()(text);
        }
    };
    HelperUtil.prototype.launchURL = function (url) {
        var _this = this;
        var setURL = function (url) {
            url = url.replace(/^http\:\/\//, '')
                .replace(/^https\:\/\//, ''); // remove the leading https://
            return "http://" + url;
        };
        this.browserTab.isAvailable().then(function (available) {
            available ? _this.browserTab.openUrl(setURL(url)) : _this.iab.create(setURL(url));
        }).catch(function (e) {
            // Meaning cordova_not_available, app opened in desktop web browser
            _this.iab.create(setURL(url));
        });
    };
    HelperUtil.prototype.sortObject = function (object, key, asc) {
        if (asc) {
            object.sort(function (a, b) {
                if (a[key] > b[key])
                    return -1;
                if (a[key] < b[key])
                    return 1;
                return 0;
            });
        }
        // Descending
        object.sort(function (a, b) {
            if (a[key] < b[key])
                return -1;
            if (a[key] > b[key])
                return 1;
            return 0;
        });
        return object;
    };
    HelperUtil.prototype.generatePushID = function () {
        // Modeled after base64 web-safe chars, but ordered by ASCII.
        var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
        // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
        var lastPushTime = 0;
        // We generate 72-bits of randomness which get turned into 12 characters and appended to the
        // timestamp to prevent collisions with other clients.  We store the last characters we
        // generated because in the event of a collision, we'll use those same characters except
        // "incremented" by one.
        var lastRandChars = [];
        var now = new Date().getTime();
        var duplicateTime = (now === lastPushTime);
        lastPushTime = now;
        var timeStampChars = new Array(8);
        for (var i = 7; i >= 0; i--) {
            timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
            // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
            now = Math.floor(now / 64);
        }
        if (now !== 0)
            throw new Error('We should have converted the entire timestamp.');
        var id = timeStampChars.join('');
        if (!duplicateTime) {
            for (i = 0; i < 12; i++) {
                lastRandChars[i] = Math.floor(Math.random() * 64);
            }
        }
        else {
            // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                lastRandChars[i] = 0;
            }
            lastRandChars[i]++;
        }
        for (i = 0; i < 12; i++) {
            id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        if (id.length != 20)
            throw new Error('Length should be 20.');
        return id;
    };
    return HelperUtil;
}());
HelperUtil = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__["a" /* Clipboard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__["a" /* Clipboard */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_browser_tab__["a" /* BrowserTab */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_browser_tab__["a" /* BrowserTab */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__platform__["a" /* PlatformUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__platform__["a" /* PlatformUtil */]) === "function" && _d || Object])
], HelperUtil);

var _a, _b, _c, _d;
//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7____ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
// import { Network } from '@ionic-native/network';

// Services

var AdminService = (function () {
    function AdminService(afAuth, afDB, 
        // public fb: Facebook,
        // public network: Network,
        dialogUtil, menuCtrl, platformUtil, cacheService) {
        this.afAuth = afAuth;
        this.afDB = afDB;
        this.dialogUtil = dialogUtil;
        this.menuCtrl = menuCtrl;
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
    }
    AdminService.prototype.watchAdminStatus = function () {
        return this.afDB.object("_admin/" + this.cacheService.admin_uid + "/status");
    };
    AdminService.prototype.sendPasswordReset = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AdminService.prototype.signInWithEmail = function (admin) {
        return this.afAuth.auth.signInWithEmailAndPassword(admin.email, admin.password);
    };
    AdminService.prototype.signOut = function () {
        this.cacheService.admin_uid = '';
        this.cacheService.admin_status = '';
        this.cacheService.isSignInPage = true;
        // this.menuCtrl.enable(false);
        return this.afAuth.auth.signOut();
    };
    AdminService.prototype.getAdminData = function (admin_uid) {
        // query once
        return __WEBPACK_IMPORTED_MODULE_5_firebase_app__["database"]().ref("_admin/" + admin_uid).once('value').then(function (snapshot) {
            return snapshot.val();
        });
        // return this.afDB.object(`_admin/${admin_uid}`).take(1);
    };
    return AdminService;
}());
AdminService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_6__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_7____["c" /* CacheService */]])
], AdminService);

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5____ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AngularFireAuth } from 'angularfire2/auth';

// Services

var AppService = (function () {
    // app: App;
    function AppService(
        // public afAuth: AngularFireAuth,
        afDB, platformUtil, userService, helperUtil, cacheService) {
        this.afDB = afDB;
        this.platformUtil = platformUtil;
        this.userService = userService;
        this.helperUtil = helperUtil;
        this.cacheService = cacheService;
    }
    // USED FOR WATCHING CHANGES IN REQUESTS
    AppService.prototype.getRequest = function (type, request_uid) {
        return this.afDB.object("_requests/" + type + "/" + request_uid);
    };
    AppService.prototype.getRequests = function (type) {
        // type = publish_requests,content_update_requests
        return this.afDB.list("_requests/" + type);
    };
    AppService.prototype.getAppData = function (app_uid, user_uid) {
        return this.afDB.object("users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid);
    };
    AppService.prototype._getAppData = function (app_uid, user_uid) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase_app__["database"]().ref("users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid);
    };
    // Removing file in the publish request/content_update
    AppService.prototype.removeFile = function (type, app, args) {
        console.log(app);
        if (type === 'remove_os_archive') {
            var data = {};
            var root = "users/developer_data/" + app.user_uid + "/user_personal_apps/" + app.app_uid + "/";
            data[root + "openSource/sourceCodeDownloadURL"] = null;
            data[root + "openSource/sourceCodeFilename"] = null;
            data[root + "openSource/sourceCodeFilesize"] = null;
            data[root + "openSource/dateCreated"] = null;
            return this.afDB.object('/').update(data);
        }
    };
    return AppService;
}());
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* PlatformUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* PlatformUtil */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5____["e" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5____["e" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* HelperUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* HelperUtil */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5____["c" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5____["c" /* CacheService */]) === "function" && _e || Object])
], AppService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';

// Services

var FileService = (function () {
    function FileService(
        // public afAuth: AngularFireAuth,
        // public afDB: AngularFireDatabase,
        platformUtil, cacheService) {
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
    }
    FileService.prototype.downloadFile = function (url) {
        // url = url.replace(/^http\:\/\//, '')
        //  .replace(/^https\:\/\//, '') // remove the leading https://
        url = decodeURIComponent(url);
        if (this.platformUtil.checkPlatform() === 'browser') {
            console.log('Downloading using native downloader in browser');
            window.open(url, '_self');
        }
        else if (this.platformUtil.checkPlatform() === 'android') {
            console.log('Downloading using native downloader in android OS');
        }
    };
    return FileService;
}());
FileService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* PlatformUtil */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* PlatformUtil */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3____["c" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3____["c" /* CacheService */]) === "function" && _b || Object])
], FileService);

var _a, _b;
//# sourceMappingURL=file.service.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ApkService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

var ApkService = (function () {
    function ApkService(platformUtil, cacheService) {
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
    }
    ApkService.prototype.compareVersion = function (version1, version2) {
        var result = false;
        if (typeof version1 !== 'object') {
            version1 = version1.toString().split('.');
        }
        if (typeof version2 !== 'object') {
            version2 = version2.toString().split('.');
        }
        for (var i = 0; i < (Math.max(version1.length, version2.length)); i++) {
            if (version1[i] == undefined) {
                version1[i] = 0;
            }
            if (version2[i] == undefined) {
                version2[i] = 0;
            }
            if (Number(version1[i]) < Number(version2[i])) {
                result = true;
                break;
            }
            if (version1[i] != version2[i]) {
                break;
            }
        }
        return (result);
    };
    return ApkService;
}());
ApkService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_2____["c" /* CacheService */]])
], ApkService);

//# sourceMappingURL=apk.service.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(373);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__cache_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(377);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_service__ = __webpack_require__(440);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__admin_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(443);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__app_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__file_service__ = __webpack_require__(444);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__file_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apk_service__ = __webpack_require__(445);
/* unused harmony namespace reexport */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(431);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__platform__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog__ = __webpack_require__(432);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__dialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(433);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__helper__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_utils__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(menuCtrl, platform, cacheService, afAuth, statusBar, splashScreen, dialogUtil, adminService) {
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.cacheService = cacheService;
        this.afAuth = afAuth;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.dialogUtil = dialogUtil;
        this.adminService = adminService;
        this.rootPage = 'LoginPage';
        this.selectedSideMenuIndex = 0;
        this.counter = 0;
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
            { title: 'Sign out', component: null, index: 99, icon: 'subdirectory_arrow_left' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (admin) {
            if (admin) {
                console.log('Triggered authState');
                _this.cacheService.admin_uid = admin.uid;
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
                _this.adminService.getAdminData(_this.cacheService.admin_uid).then(function (admin) {
                    _this.cacheService.admin_status = admin.status;
                });
                if (_this.counter === 0) {
                    _this.watchForAdminStatus();
                    _this.counter++;
                }
            }
            else {
                _this.cacheService.admin_uid = '';
                _this.cacheService.admin_status = '';
                _this.cacheService.isDoneCheckingAdminData = true;
                _this.cacheService.isSignInPage = true;
                _this.nav.setRoot('LoginPage');
                _this.menuCtrl.enable(false);
            }
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.watchForAdminStatus = function () {
        var _this = this;
        this.adminService.watchAdminStatus()
            .subscribe(function (res) {
            _this.cacheService.admin_status = res.$value;
            if (_this.cacheService.admin_status === 'active') {
                _this.cacheService.isSignInPage = false;
                // this.nav.setRoot('AnalyticsPage');
            }
            else {
                if (!_this.cacheService.isSignInPage) {
                    var msg_1 = 'Your account has been disabled by the Super admin.';
                    if (_this.cacheService.admin_status !== 'disabled' && _this.cacheService.admin_status !== 'active') {
                        msg_1 = 'You have been logout. Please sign in again.';
                    }
                    _this.adminService.signOut().then(function () {
                        _this.dialogUtil.showAlert(msg_1, 'Ok');
                        _this.nav.setRoot('LoginPage');
                    });
                }
            }
            _this.cacheService.isDoneCheckingAdminData = true;
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.index == 99) {
            return new Promise(function (resolve, reject) {
                var buttons = [
                    { text: 'No', handler: reject },
                    { text: 'Yes', handler: resolve },
                ];
                _this.dialogUtil.showConfirm('Sign out?', buttons, '');
            }).then(function () {
                _this.dialogUtil.showLoader('Signing out.');
                setTimeout(function () {
                    _this.adminService.signOut().then(function () {
                        _this.nav.setRoot('LoginPage');
                        return _this.dialogUtil.hideLoader();
                    });
                }, 500);
            }).catch(function () { });
        }
        else {
            this.selectedSideMenuIndex = page.index;
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\app\app.html"*/'<ion-split-pane>\n\n  <ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Showcase It - Admin Panel</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list class="mtop-10" no-lines>\n        <div *ngFor="let p of pages" [class.sideMenuActive]="selectedSideMenuIndex==p.index ? true:null">\n          <button ion-item menuClose (click)="openPage(p)" [class.sideMenuActive]="selectedSideMenuIndex==p.index ? true:null">\n            <ion-icon item-start md-name [md-name]="p.icon" [color]="selectedSideMenuIndex==p.index ? \'primary\':null"></ion-icon>{{p.title}}\n          </button>\n        </div>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav main [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n</ion-split-pane>'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services__["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__shared_utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services__["a" /* AdminService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[348]);
//# sourceMappingURL=main.js.map