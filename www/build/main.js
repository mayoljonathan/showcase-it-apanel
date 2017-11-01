webpackJsonp([28],{

/***/ 1157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_models___ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_takeWhile__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_takeWhile__);
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
    function MyApp(menuCtrl, platform, cacheService, afAuth, statusBar, splashScreen, dialogUtil, adminService, modalCtrl, events) {
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.cacheService = cacheService;
        this.afAuth = afAuth;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.dialogUtil = dialogUtil;
        this.adminService = adminService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        // rootPage: any = 'LoginPage';
        this.rootPage = "StartupLoadingPage";
        this.currentComponent = 'StartupLoadingPage';
        this.selectedSideMenuIndex = 0;
        this.alive = true;
        this.admin = new __WEBPACK_IMPORTED_MODULE_7__shared_models___["a" /* Admin */]();
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Dashboard', component: 'DashboardPage', index: 0, icon: 'dashboard' },
            { title: 'Applications List', component: 'AppsListPage', index: 1, icon: 'format_list_bulleted' },
            { title: 'App Categories', component: 'AppCategoryTabsPage', index: 2, icon: 'label' },
            { title: 'App Requests', component: 'RequestTabsPage', index: 3, icon: 'error' },
            { title: 'User Accounts', component: 'UserAccountsTabsPage', index: 4, icon: 'supervisor_account' },
            { title: 'Reports from Users', component: 'ReportTabsPage', index: 5, icon: 'rate_review' },
            { title: 'Maintenance', component: 'MaintenancePage', index: 6, icon: 'settings', requiresSuper: true },
            { title: 'Sign out', component: null, index: 99, icon: 'subdirectory_arrow_left' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (admin) {
            if (admin) {
                console.log('Triggered authState');
                _this.cacheService.admin_uid = admin.uid;
                _this.watchForAdminStatus();
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
                _this.adminService._getAdminData(_this.cacheService.admin_uid).subscribe(function (admin) {
                    if (admin) {
                        _this.cacheService.admin_status = admin.status;
                        _this.cacheService.isSuperAdmin = admin.isSuperAdmin || false;
                        _this.admin.name = admin.name;
                        _this.admin.photoURL = admin.photoURL;
                        _this.admin.email = admin.email;
                        // if(this.counter === 0){
                        _this.menuCtrl.enable(true);
                        // this.nav.setRoot('DashboardPage');
                        // this.counter++;
                        // }
                    }
                });
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
    MyApp.prototype.watchForAdminRole = function () {
        var _this = this;
        this.adminService.watchAdminRole()
            .subscribe(function (res) {
            _this.cacheService.isSuperAdmin = res.$value || false;
        });
    };
    MyApp.prototype.watchForAdminStatus = function () {
        var _this = this;
        this.adminService.watchAdminStatus()
            .subscribe(function (res) {
            console.log(res);
            if (!res.$value) {
                return _this.adminService.signOut().then(function () {
                    _this.nav.setRoot('LoginPage');
                    return _this.menuCtrl.enable(false);
                });
            }
            _this.cacheService.admin_status = res.$value;
            if (_this.cacheService.admin_status === 'active') {
                _this.adminService.setOnlineState();
                _this.watchForAdminRole();
                _this.cacheService.isSignInPage = false;
                _this.selectedSideMenuIndex = 0;
                _this.nav.setRoot('DashboardPage');
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
    MyApp.prototype.changeProfileData = function () {
        if (this.admin && this.admin.name) {
            this.modalCtrl.create('ChangeProfilePage').present();
        }
    };
    MyApp.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\app\app.html"*/'<ion-split-pane>\n\n  <ion-menu [content]="content">\n    <ion-header>\n      <div class="side-nav-panel">\n        <img tappable [src]="admin?.photoURL ? admin?.photoURL : \'https://storage.googleapis.com/showcase-it.appspot.com/user-placeholder.png\'" alt="" class="admin-photo" (click)="changeProfileData()">\n        <div tappable *ngIf="admin?.name" class="display-grid pad-5 admin-data-container" (click)="changeProfileData()">\n          <span class="bold white">{{admin?.name}}</span>\n          <span class="white">{{admin?.email}}</span>\n        </div>\n      </div>\n    </ion-header>\n\n    <ion-content>\n      <ion-list class="mtop-10" no-lines>\n        <div *ngFor="let p of pages" [class.sideMenuActive]="selectedSideMenuIndex==p.index ? true:null">\n          <button ion-item menuClose (click)="openPage(p)" [class.sideMenuActive]="selectedSideMenuIndex==p.index ? true:null" *ngIf="(p.requiresSuper && cacheService.isSuperAdmin) || !p.requiresSuper">\n            <ion-icon item-start md-name [md-name]="p.icon" [color]="selectedSideMenuIndex==p.index ? \'primary\':null"></ion-icon>{{p.title}}\n            <!--<ion-badge item-right color="danger">{{p?.count}}</ion-badge>-->\n          </button>\n        </div>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav main [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n</ion-split-pane>'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services__["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__shared_utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_5__shared_services__["a" /* AdminService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Events */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
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
webpackEmptyAsyncContext.id = 284;

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/app-category-tabs/app-category-tabs.module": [
		1158,
		27
	],
	"../pages/app-category-tabs/applications-cat-list/applications-cat-list.module": [
		1159,
		19
	],
	"../pages/app-category-tabs/filtered-apps/filtered-apps.module": [
		1160,
		5
	],
	"../pages/app-category-tabs/games-cat-list/games-cat-list.module": [
		1161,
		18
	],
	"../pages/apps-list/apps-list.module": [
		1162,
		4
	],
	"../pages/change-profile/change-profile.module": [
		1163,
		26
	],
	"../pages/dashboard/dashboard.module": [
		1164,
		3
	],
	"../pages/login/login.module": [
		1165,
		20
	],
	"../pages/main-app-details/main-app-details.module": [
		1166,
		2
	],
	"../pages/main-app-details/review-list/review-list.module": [
		1167,
		1
	],
	"../pages/maintenance/maintenance.module": [
		1168,
		17
	],
	"../pages/report-tabs/detailed-problem/detailed-problem.module": [
		1170,
		16
	],
	"../pages/report-tabs/flag-reviews-list/flag-reviews-list.module": [
		1171,
		15
	],
	"../pages/report-tabs/problems-list/problems-list.module": [
		1172,
		14
	],
	"../pages/report-tabs/report-tabs.module": [
		1169,
		25
	],
	"../pages/request-tabs/apk-details/apk-details.module": [
		1174,
		13
	],
	"../pages/request-tabs/content-update/content-update.module": [
		1175,
		12
	],
	"../pages/request-tabs/detailed-app/detailed-app.module": [
		1176,
		11
	],
	"../pages/request-tabs/publish-request/publish-request.module": [
		1177,
		10
	],
	"../pages/request-tabs/request-reject/request-reject.module": [
		1178,
		9
	],
	"../pages/request-tabs/request-tabs.module": [
		1173,
		24
	],
	"../pages/request-tabs/requests-log/requests-log.module": [
		1179,
		8
	],
	"../pages/startup-loading/startup-loading.module": [
		1180,
		23
	],
	"../pages/user-accounts-tabs/add-administrator/add-administrator.module": [
		1182,
		22
	],
	"../pages/user-accounts-tabs/administrators-list/administrators-list.module": [
		1183,
		7
	],
	"../pages/user-accounts-tabs/user-accounts-tabs.module": [
		1181,
		21
	],
	"../pages/user-accounts-tabs/users-list/users-list.module": [
		1184,
		6
	],
	"../pages/user-profile/user-profile.module": [
		1185,
		0
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
webpackAsyncContext.id = 326;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */]])
], PlatformUtil);

//# sourceMappingURL=platform.js.map

/***/ }),

/***/ 439:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 439;

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_model__ = __webpack_require__(881);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__app_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_model__ = __webpack_require__(882);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__admin_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__review_model__ = __webpack_require__(883);
/* unused harmony namespace reexport */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(536);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(1157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_super_tabs__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic2_material_icons__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_auth__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_services__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_clipboard__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_browser_tab__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__ = __webpack_require__(377);
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
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_10_ionic2_material_icons__["a" /* MaterialIconsModule */],
            __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__["a" /* IonicImageViewerModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/app-category-tabs/app-category-tabs.module#AppCategoryTabsPageModule', name: 'AppCategoryTabsPage', segment: 'app-categories', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/app-category-tabs/applications-cat-list/applications-cat-list.module#ApplicationsCatListPageModule', name: 'ApplicationsCatListPage', segment: 'applications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/app-category-tabs/filtered-apps/filtered-apps.module#FilteredAppsPageModule', name: 'FilteredAppsPage', segment: '{type}/{category_uid}', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/app-category-tabs/games-cat-list/games-cat-list.module#GamesCatListPageModule', name: 'GamesCatListPage', segment: 'games', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/apps-list/apps-list.module#AppsListPageModule', name: 'AppsListPage', segment: 'apps-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/change-profile/change-profile.module#ChangeProfilePageModule', name: 'ChangeProfilePage', segment: 'change-profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/main-app-details/main-app-details.module#MainAppDetailsPageModule', name: 'MainAppDetailsPage', segment: 'app/:app_uid', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/main-app-details/review-list/review-list.module#ReviewListPageModule', name: 'ReviewListPage', segment: 'review-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/maintenance/maintenance.module#MaintenancePageModule', name: 'MaintenancePage', segment: 'maintenance', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/report-tabs/report-tabs.module#ReportTabsPageModule', name: 'ReportTabsPage', segment: 'user-reports', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/report-tabs/detailed-problem/detailed-problem.module#DetailedProblemPageModule', name: 'DetailedProblemPage', segment: 'problem/:uid', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/report-tabs/flag-reviews-list/flag-reviews-list.module#FlagReviewsListPageModule', name: 'FlagReviewsListPage', segment: 'flag-review', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/report-tabs/problems-list/problems-list.module#ProblemsListPageModule', name: 'ProblemsListPage', segment: 'reported-problems', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/request-tabs.module#RequestTabsPageModule', name: 'RequestTabsPage', segment: 'requests', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/apk-details/apk-details.module#ApkDetailsPageModule', name: 'ApkDetailsPage', segment: 'apk-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/content-update/content-update.module#ContentUpdatePageModule', name: 'ContentUpdatePage', segment: 'content-update', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/detailed-app/detailed-app.module#DetailedAppPageModule', name: 'DetailedAppPage', segment: 'details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/publish-request/publish-request.module#PublishRequestPageModule', name: 'PublishRequestPage', segment: 'publish', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/request-reject/request-reject.module#RequestRejectPageModule', name: 'RequestRejectPage', segment: 'request-reject', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request-tabs/requests-log/requests-log.module#RequestsLogPageModule', name: 'RequestsLogPage', segment: 'requests-log', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/startup-loading/startup-loading.module#StartupLoadingPageModule', name: 'StartupLoadingPage', segment: 'startup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-accounts-tabs/user-accounts-tabs.module#UserAccountsTabsPageModule', name: 'UserAccountsTabsPage', segment: 'user-accounts', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-accounts-tabs/add-administrator/add-administrator.module#AddAdministratorPageModule', name: 'AddAdministratorPage', segment: 'add-administrator', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-accounts-tabs/administrators-list/administrators-list.module#AdministratorsListPageModule', name: 'AdministratorsListPage', segment: 'admins-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-accounts-tabs/users-list/users-list.module#UsersListPageModule', name: 'UsersListPage', segment: 'users-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-profile/user-profile.module#UserProfilePageModule', name: 'UserProfilePage', segment: 'user-profile/:uid', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* FabContainer */],
            __WEBPACK_IMPORTED_MODULE_14__shared_services__["f" /* UserService */], __WEBPACK_IMPORTED_MODULE_14__shared_services__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_14__shared_services__["c" /* CacheService */], __WEBPACK_IMPORTED_MODULE_14__shared_services__["b" /* AppService */], __WEBPACK_IMPORTED_MODULE_14__shared_services__["d" /* FileService */], __WEBPACK_IMPORTED_MODULE_14__shared_services__["e" /* MailService */],
            __WEBPACK_IMPORTED_MODULE_15__shared_utils__["c" /* PlatformUtil */], __WEBPACK_IMPORTED_MODULE_15__shared_utils__["a" /* DialogUtil */], __WEBPACK_IMPORTED_MODULE_15__shared_utils__["b" /* HelperUtil */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_browser_tab__["a" /* BrowserTab */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_13_angularfire2_auth__["a" /* AngularFireAuth */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(334);
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
        this.isSuperAdmin = false;
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
CacheService.apiKey = 'AIzaSyDsUKRYcTMx0EI2jtLAKY84j2dM9vTKW68';
CacheService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], CacheService);

//# sourceMappingURL=cache.service.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5____ = __webpack_require__(67);
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
    UserService.prototype.getUserPresence = function (user_uid) {
        return this.afDB.object("_server/user_presence/" + user_uid);
    };
    UserService.prototype.getUserData = function (user_uid) {
        return this.afDB.object("users/user_data/" + user_uid);
    };
    UserService.prototype.getUserIsDeveloper = function (user_uid) {
        return this.afDB.object("users/developer_data/" + user_uid + "/developerDateCreated");
    };
    UserService.prototype.setUserStatus = function (user_uid, status) {
        return this.afDB.object("users/user_data/" + user_uid).update({ status: status });
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_5____["c" /* CacheService */]])
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
            if (!insistData) {
                timeoutListener = setInterval(function () {
                    console.log("TIMEOUT in Loader");
                    // console.log(this.loader);
                    _this.loader.data.content = 'Looks like something happened. Click outside to hide.';
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
    DialogUtil.prototype.showPrompt = function (title, message, inputs, buttons, type) {
        this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: inputs.name,
                    placeholder: inputs.placeholder,
                    value: inputs.value,
                    type: type
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
    DialogUtil.prototype.showRadio = function (choices, buttons, title) {
        var _this = this;
        return new Promise(function (resolve) {
            var alert = _this.alertCtrl.create();
            alert.setTitle(title);
            choices.forEach(function (choice) {
                alert.addInput({
                    type: 'radio',
                    label: choice.name,
                    value: choice.name,
                    checked: choice.checked
                });
            });
            alert.addButton(buttons[0]);
            alert.addButton({
                text: buttons[1],
                handler: function (data) {
                    resolve(data);
                }
            });
            alert.present();
        });
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* LoadingController */]])
], DialogUtil);

//# sourceMappingURL=dialog.js.map

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_copy_to_clipboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_browser_tab__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(377);
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
    HelperUtil.prototype.isEmpty = function (string) {
        return string.trim().length == 0;
    };
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
    // Just a short UID
    HelperUtil.prototype.randomUid = function () {
        return 'xxxx4xxxyxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return HelperUtil;
}());
HelperUtil = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_clipboard__["a" /* Clipboard */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_browser_tab__["a" /* BrowserTab */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_3__platform__["a" /* PlatformUtil */]])
], HelperUtil);

//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4____ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_request__);
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

// Models

var MailService = MailService_1 = (function () {
    function MailService(afDB, platformUtil, cacheService, injector) {
        var _this = this;
        this.afDB = afDB;
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
        this.injector = injector;
        setTimeout(function () { _this.mailService = injector.get(MailService_1); });
    }
    MailService.prototype.sendRequestEmail = function (type, mailData) {
        console.log(mailData);
        mailData = encodeURIComponent(JSON.stringify(mailData));
        console.log(mailData);
        var url = "https://us-central1-showcase-it.cloudfunctions.net/sendRequestEmail?apiKey=" + __WEBPACK_IMPORTED_MODULE_4____["c" /* CacheService */].apiKey + "&data=" + mailData;
        // let url = `http://localhost:5000/showcase-it/us-central1/sendRequestEmail?apiKey=${CacheService.apiKey}&data=${mailData}`;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_5_request__(url, { json: true }, function (err, res, body) {
                if (err) {
                    return reject(err);
                }
                if (res.statusCode === 200 || body.code === 250) {
                    resolve('Email sent to the owner');
                }
                else {
                    reject('Email not sent to the owner');
                }
            });
        });
    };
    return MailService;
}());
MailService = MailService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_4____["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
], MailService);

var MailService_1;
//# sourceMappingURL=mail.service.js.map

/***/ }),

/***/ 669:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(562);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__cache_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(566);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mail_service__ = __webpack_require__(628);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__mail_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_service__ = __webpack_require__(834);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__admin_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__(861);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__app_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__file_service__ = __webpack_require__(862);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__file_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apk_service__ = __webpack_require__(879);
/* unused harmony namespace reexport */







//# sourceMappingURL=index.js.map

/***/ }),

/***/ 670:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(372);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__platform__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog__ = __webpack_require__(620);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__dialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(621);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__helper__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 724:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 743:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 793:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 793;

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6____ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_request__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_algoliasearch__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_algoliasearch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_algoliasearch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_query_string__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_query_string__);
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
    function AdminService(afAuth, afDB, dialogUtil, platformUtil, cacheService, mailService) {
        this.afAuth = afAuth;
        this.afDB = afDB;
        this.dialogUtil = dialogUtil;
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
        this.mailService = mailService;
        this.appFirstLoaded = false;
        this.algolia = __WEBPACK_IMPORTED_MODULE_8_algoliasearch__("XGEVJWSCYP", "013e7ff8361fd5806238412d8c1f2bb8", { protocol: 'https:' });
    }
    AdminService.prototype.watchAdminStatus = function () {
        return this.afDB.object("_admin/" + this.cacheService.admin_uid + "/status");
    };
    AdminService.prototype.watchAdminRole = function () {
        return this.afDB.object("_admin/" + this.cacheService.admin_uid + "/isSuperAdmin");
    };
    AdminService.prototype.sendPasswordReset = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AdminService.prototype.signInWithEmail = function (admin) {
        return this.afAuth.auth.signInWithEmailAndPassword(admin.email, admin.password);
    };
    AdminService.prototype.updatePassword = function (password) {
        return this.afAuth.auth.currentUser.updatePassword(password);
    };
    AdminService.prototype.reauthenticateUser = function (password) {
        var email = this.afAuth.auth.currentUser.email;
        var credential = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].EmailAuthProvider.credential(email, password);
        return this.afAuth.auth.currentUser.reauthenticateWithCredential(credential);
    };
    AdminService.prototype.signOut = function () {
        if (this.cacheService.admin_uid) {
            var userRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("_server/admin_presence/" + this.cacheService.admin_uid);
            userRef.set(__WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP);
        }
        this.cacheService.admin_uid = '';
        this.cacheService.admin_status = '';
        this.cacheService.isSuperAdmin = false;
        this.cacheService.isSignInPage = true;
        // this.menuCtrl.enable(false);
        return this.afAuth.auth.signOut();
    };
    AdminService.prototype.updateProfile = function (admin_uid, data) {
        return this.afDB.object("_admin/" + admin_uid).update(data);
    };
    AdminService.prototype.getAdminData = function (admin_uid) {
        // query once
        return __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("_admin/" + admin_uid).once('value').then(function (snapshot) {
            return snapshot.val();
        });
        // return this.afDB.object(`_admin/${admin_uid}`).take(1);
    };
    AdminService.prototype._getAdminData = function (admin_uid) {
        return this.afDB.object("_admin/" + admin_uid);
    };
    AdminService.prototype.getAdmins = function () {
        return this.afDB.list("_admin");
    };
    AdminService.prototype.setOnlineState = function () {
        var _this = this;
        var imOnline = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('.info/connected');
        var userRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("_server/admin_presence/" + this.cacheService.admin_uid);
        imOnline.on('value', function (snapshot) {
            _this.cacheService.isConnected = snapshot.val();
            if (_this.appFirstLoaded && _this.cacheService.isConnected) {
                _this.dialogUtil.showToast('You are now connected.', 4000, 'bottom');
            }
            if (!_this.cacheService.isConnected) {
                _this.dialogUtil.showToast('You are not connected to the server right now.', 4000, 'bottom');
            }
            if (!_this.appFirstLoaded) {
                _this.appFirstLoaded = true;
            }
            console.log('Online status: ' + _this.cacheService.isConnected);
            if (snapshot.val()) {
                userRef.onDisconnect().set(__WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP);
                userRef.set(true);
            }
        });
    };
    AdminService.prototype.checkEmailIfExists = function (email) {
        var _this = this;
        var checkInAdmin = function () {
            return _this.afDB.list("_admin/", {
                query: {
                    orderByChild: 'email',
                    equalTo: email.toLowerCase(),
                }
            }).take(1);
        };
        var checkInUser = function () {
            return _this.afDB.list("users/user_data/", {
                query: {
                    orderByChild: 'email',
                    equalTo: email.toLowerCase(),
                }
            }).take(1);
        };
        return new Promise(function (resolve) {
            checkInAdmin().subscribe(function (adminRes) {
                if (adminRes.length == 0) {
                    checkInUser().subscribe(function (userRes) {
                        userRes.length == 0 ? resolve({ exists: false }) : resolve({ exists: true });
                    });
                }
                else {
                    resolve({ exists: true });
                }
            });
        });
    };
    AdminService.prototype.addAdministrator = function (data) {
        data = encodeURIComponent(JSON.stringify(data));
        console.log(data);
        var url = "https://us-central1-showcase-it.cloudfunctions.net/addAdministrator?apiKey=" + __WEBPACK_IMPORTED_MODULE_6____["c" /* CacheService */].apiKey + "&data=" + data;
        // let url = `http://localhost:5000/showcase-it/us-central1/addAdministrator?apiKey=${CacheService.apiKey}&data=${data}`;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_7_request__(url, { json: true }, function (err, res, body) {
                console.log('HERE');
                console.log(err);
                console.log(res);
                console.log(body);
                if (err) {
                    return reject(err);
                }
                if (res.statusCode === 200 || body.code === 250) {
                    resolve();
                }
                else {
                    reject('Request failed.');
                }
            });
        });
    };
    AdminService.prototype.getAdminPresence = function (admin_uid) {
        return this.afDB.object("_server/admin_presence/" + admin_uid);
    };
    AdminService.prototype.setAdminStatus = function (admin_uid, status) {
        return this.afDB.object("_admin/" + admin_uid).update({ status: status });
    };
    AdminService.prototype.setAdminRole = function (admin_uid, isSuperAdmin) {
        return this.afDB.object("_admin/" + admin_uid).update({ isSuperAdmin: isSuperAdmin });
    };
    AdminService.prototype.getProjectStatus = function () {
        return this.afDB.object("_project/isAvailable");
    };
    AdminService.prototype.toggleProjectStatus = function (state) {
        return this.afDB.object("_project/").update({
            isAvailable: state,
        });
    };
    AdminService.prototype.getOnlineAccounts = function (type) {
        return this.afDB.list("_server/" + type + "_presence/");
    };
    AdminService.prototype.getFirebaseToAlgoliaLatestSync = function (type) {
        return this.afDB.object("_server/" + type);
    };
    AdminService.prototype.getAlgoliaLogs = function (type, length) {
        if (length === void 0) { length = 50; }
        return this.algolia.getLogs({
            offset: 0,
            length: length,
            type: type // which logs do you want, default to no value (all)
        }).then(function (result) {
            result = result.logs;
            if (result && result.length > 0) {
                var container_1 = [];
                result.forEach(function (data) {
                    // let d =     queryString.parse(data.url);
                    var url = data.url;
                    var res = url.startsWith('/1/indexes/applications/query');
                    if (res) {
                        var parsed = __WEBPACK_IMPORTED_MODULE_9_query_string__["parse"](data.query_params);
                        var timestamp = new Date(data.timestamp);
                        timestamp = timestamp.getTime();
                        var newData = {
                            query: parsed.query,
                            timestamp: timestamp
                        };
                        container_1.push(newData);
                    }
                });
                return container_1;
            }
            else {
                return [];
            }
        });
    };
    return AdminService;
}());
AdminService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* DialogUtil */],
        __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_6____["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_6____["e" /* MailService */]])
], AdminService);

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ 851:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6____ = __webpack_require__(67);
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
        afDB, platformUtil, userService, helperUtil, cacheService, mailService) {
        this.afDB = afDB;
        this.platformUtil = platformUtil;
        this.userService = userService;
        this.helperUtil = helperUtil;
        this.cacheService = cacheService;
        this.mailService = mailService;
    }
    // USED FOR WATCHING CHANGES IN REQUESTS
    AppService.prototype.getRequest = function (type, request_uid) {
        return this.afDB.object("_requests/" + type + "/" + request_uid);
    };
    AppService.prototype.getRequests = function (type) {
        // type = publish_requests,content_update_requests
        return this.afDB.list("_requests/" + type);
    };
    AppService.prototype.getRequestInLog = function (request_uid) {
        return this.afDB.list("_requests/log/", {
            query: {
                orderByChild: 'request_uid',
                equalTo: request_uid,
                limitToLast: 1
            }
        });
    };
    AppService.prototype.getAppData = function (app_uid, user_uid) {
        return this.afDB.object("users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid);
    };
    AppService.prototype._getAppData = function (app_uid, user_uid) {
        return __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid);
    };
    // USED IN GETTIGN APP DETAILS IN MAIN// NOT IN DEV
    AppService.prototype.getMainAppDetails = function (app_uid) {
        return this.afDB.object("applications/" + app_uid);
    };
    AppService.prototype.managePublishRequest = function (action, requestData, type, mailData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request_uid = requestData.key;
            var app = Object.assign({}, requestData);
            var data = {};
            var userAppsRoot = "users/developer_data/" + app.user_uid + "/user_personal_apps/" + app.app_uid + "/";
            var requestsRoot = "_requests/" + type + "/" + request_uid;
            app['action'] = action;
            app['userData'] = null;
            app['admin_uid'] = _this.cacheService.admin_uid;
            app['request_type'] = type === 'publish_requests' ? 'publish_request' : 'content_update';
            app['request_uid'] = request_uid;
            app['log_dateCreated'] = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
            // REMOVE 'checked' in mailData reasons
            if (mailData.reasons) {
                mailData.reasons.forEach(function (r) {
                    delete r['checked'];
                });
            }
            app.appData.iconFileSize = null;
            app.appData.dateCreated = null;
            app.appData.dateUpdated = null;
            // Save the request as backup to request log
            // SEND TO LOG
            var logUid = _this.helperUtil.generatePushID();
            data["_requests/log/" + logUid + "}"] = app;
            if (action === 'approve') {
                // Update users apps data
                data[userAppsRoot + "status"] = 'published';
                data[userAppsRoot + "datePublished"] = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                // Remove to requestRoot
                data[requestsRoot] = null;
                app.appData.user_uid = app.user_uid;
                app.appData.status = 'published';
                app.appData.datePublished = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                // Pushing published applications
                data["applications/" + app.app_uid] = app.appData;
            }
            else if (action === 'reject') {
                console.log('REJECTING');
                data[requestsRoot] = null;
                if (type === 'publish_requests') {
                    data[userAppsRoot + "status"] = 'draft';
                    app.appData.status = 'draft';
                }
                else {
                    data[userAppsRoot + "status_cu"] = null;
                }
                app['reject_reasons'] = mailData.reasons;
            }
            else if (action === 'reject_remove') {
                console.log('REJECT REMOVE');
                data[userAppsRoot] = null;
                data[requestsRoot] = null;
                app['reject_reasons'] = mailData.reasons;
                // Archive the applicationsRoot in Showcase It
                // Get the data from applicationsRoot and archive it to other node
                return _this.afDB.object("applications/" + app.app_uid).take(1).subscribe(function (appData) {
                    appData['archivedByUserType'] = 'admin';
                    appData['archivedByUserUid'] = _this.cacheService.admin_uid;
                    appData['archivedDate'] = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                    data["_archive/applications/" + app.app_uid] = appData;
                    data["applications/" + app.app_uid] = null;
                    return _this.afDB.object('/').update(data).then(function () {
                        return _this.mailService.sendRequestEmail(type, mailData).then(function () { return resolve(true); }, function (e) { return reject(); });
                    }, function (e) { return reject(); });
                });
            }
            else if (action === 'approve_cu') {
                data[userAppsRoot + "dateUpdated"] = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                data[userAppsRoot + "status_cu"] = null;
                // Remove to requestRoot
                data[requestsRoot] = null;
                app.appData.user_uid = app.user_uid;
                app.appData.dateUpdated = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                // Pushing published applications
                data["applications/" + app.app_uid] = app.appData;
            }
            // console.log('HERE !!!');
            // console.log(data);
            _this.afDB.object('/').update(data).then(function () {
                _this.mailService.sendRequestEmail(type, mailData).then(function () { return resolve(true); }, function (e) { return reject(); });
            }, function (e) { return reject(); });
        });
    };
    AppService.prototype.deleteApp = function (app_uid, user_uid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {};
            var userAppsRoot = "users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid + "/";
            data[userAppsRoot] = null;
            return _this.afDB.object("applications/" + app_uid).take(1).subscribe(function (appData) {
                appData['archivedByUserType'] = 'admin';
                appData['archivedByUserUid'] = _this.cacheService.admin_uid;
                appData['archivedDate'] = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP;
                data["_archive/applications/" + app_uid] = appData;
                data["applications/" + app_uid] = null;
                return _this.afDB.object('/').update(data).then(function () {
                    return resolve();
                }, function (e) { return reject(); });
            });
        });
    };
    // Removing file in the publish request/content_update
    AppService.prototype.removeFile = function (type, app, args, removeMainApp) {
        console.log(type);
        console.log(app);
        console.log(args);
        var root = "users/developer_data/" + app.user_uid + "/user_personal_apps/" + app.app_uid + "/";
        var data = {};
        if (type === 'remove_os_archive') {
            data[root + "openSource/sourceCodeDownloadURL"] = null;
            data[root + "openSource/sourceCodeFilename"] = null;
            data[root + "openSource/sourceCodeFilesize"] = null;
            data[root + "openSource/dateCreated"] = null;
        }
        else if (type === 'remove_desktop_archive') {
            data[root + "platforms/desktop/dateCreated"] = null;
            data[root + "platforms/desktop/demoDownloadURL"] = null;
            data[root + "platforms/desktop/demoFileSize"] = null;
            data[root + "platforms/desktop/demoFilename"] = null;
        }
        else if (type === 'remove_android_release') {
            data[root + ("platforms/android/releases/" + args.masterReleaseCode)] = null;
        }
        if (removeMainApp) {
            var mainAppRoot = "applications/" + app.app_uid + "/";
            if (type === 'remove_os_archive') {
                data[mainAppRoot + "openSource/sourceCodeDownloadURL"] = null;
                data[mainAppRoot + "openSource/sourceCodeFilename"] = null;
                data[mainAppRoot + "openSource/sourceCodeFilesize"] = null;
                data[mainAppRoot + "openSource/dateCreated"] = null;
            }
            else if (type === 'remove_desktop_archive') {
                data[mainAppRoot + "platforms/desktop/dateCreated"] = null;
                data[mainAppRoot + "platforms/desktop/demoDownloadURL"] = null;
                data[mainAppRoot + "platforms/desktop/demoFileSize"] = null;
                data[mainAppRoot + "platforms/desktop/demoFilename"] = null;
            }
            else if (type === 'remove_android_release') {
                data[mainAppRoot + ("platforms/android/releases/" + args.masterReleaseCode)] = null;
            }
        }
        console.log(data);
        return this.afDB.object('/').update(data);
    };
    // GETTING APP CATEGORIES
    // app_type = apps,games
    AppService.prototype.getCategories = function (app_type) {
        return this.afDB.list("_category/" + app_type);
    };
    AppService.prototype.getCategoryData = function (app_type, category_uid) {
        return this.afDB.object("_category/" + app_type + "/" + category_uid);
    };
    AppService.prototype.updateCategory = function (app_type, isEditing, data) {
        if (isEditing) {
            return this.afDB.object("_category/" + app_type + "/" + data.uid + "/").update(data);
        }
        else {
            var uid = this.helperUtil.generatePushID();
            return this.afDB.object("_category/" + app_type + "/" + uid).update({
                uid: uid,
                name: data,
                status: 1,
                dateCreated: __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"].ServerValue.TIMESTAMP
            });
        }
    };
    // GET ALL APPS
    AppService.prototype.getAllApps = function () {
        return this.afDB.list("applications/");
    };
    AppService.prototype.getAppsByCategory = function (category_uid) {
        return this.afDB.list("applications/", {
            query: {
                orderByChild: 'category',
                equalTo: category_uid
            }
        });
    };
    // GETTING USER'S SHOWCASED APPS
    AppService.prototype.getUserShowcasedApps = function (user_uid) {
        return this.afDB.list("applications/", {
            query: {
                orderByChild: 'user_uid',
                equalTo: user_uid
            }
        });
    };
    // With calculation
    AppService.prototype.getReviews = function (app_uid, alive) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.afDB.list("applications_stats/reviews/" + app_uid).takeWhile(function () { return alive; }).subscribe(function (reviews) {
                if (reviews && reviews.length > 0) {
                    var stars_1 = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                    var averageStarRating = 0;
                    var overallRating = 0;
                    var totalReviews = 0;
                    // Tally for each review star to the stars object
                    reviews.forEach(function (review) { stars_1[review.stars]++; });
                    for (var i = 1; i <= 5; i++) {
                        overallRating += i * stars_1[i];
                        totalReviews += stars_1[i];
                    }
                    averageStarRating = overallRating / totalReviews;
                    var data = {
                        totalReviews: totalReviews,
                        averageStarRating: averageStarRating.toFixed(1),
                        reviews: reviews,
                        stars: stars_1
                    };
                    observer.next(data);
                }
                else {
                    observer.next({
                        totalReviews: 0,
                        averageStarRating: 0,
                        reviews: [],
                        stars: 0,
                    });
                }
            });
        });
    };
    // No calculation
    AppService.prototype.getReviewsOnly = function (app_uid) {
        return this.afDB.list("applications_stats/reviews/" + app_uid);
    };
    AppService.prototype.getTotalViews = function (app_uid) {
        return this.afDB.list("applications_stats/views/" + app_uid + "/");
    };
    AppService.prototype.getTotalDownloads = function (app_uid, alive) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var types = ['source_code', 'desktop', 'android'];
            var downloadsObj = {
                totalDownloads: 0,
                downloads: {
                    source_code: 0,
                    desktop: 0,
                    android: 0,
                    android_releases: {}
                }
            };
            var _loop_1 = function (i) {
                _this.afDB.list("applications_stats/downloads/" + types[i] + "/" + app_uid).takeWhile(function () { return alive; }).subscribe(function (data) {
                    if (types[i] == 'android') {
                        // $key is the releaseCode
                        // data returns an array of downloaders in that release
                        if (data && data.length > 0) {
                            // Reset the androids count because for every change in realtime, it will doubles the count
                            downloadsObj['downloads'][types[i]] = 0;
                            data.forEach(function (release) {
                                var releaseDownloadersCount = Object.keys(release).length;
                                // Passes the length of downloads to the android_releases/releaseCode
                                downloadsObj['downloads']['android_releases'][release.$key] = releaseDownloadersCount;
                                // For every release , add the length of the downloads
                                downloadsObj['downloads'][types[i]] += releaseDownloadersCount;
                            });
                        }
                    }
                    else {
                        downloadsObj['downloads'][types[i]] = data.length;
                    }
                    downloadsObj.totalDownloads = downloadsObj.downloads.android + downloadsObj.downloads.desktop + downloadsObj.downloads.source_code;
                    observer.next(downloadsObj);
                });
            };
            for (var i = 0; i < types.length; i++) {
                _loop_1(i);
            }
        });
    };
    AppService.prototype.removeFlagReview = function (app_uid, review_key) {
        var data = {};
        data["applications_stats/reviews/" + app_uid + "/" + review_key + "/isFlagged"] = null;
        data["_reports/flag_reviews/" + app_uid + "/" + review_key] = null;
        return this.afDB.object('/').update(data);
    };
    AppService.prototype.deleteReview = function (app_uid, review_key) {
        var data = {};
        data["applications_stats/reviews/" + app_uid + "/" + review_key] = null;
        data["_reports/flag_reviews/" + app_uid + "/" + review_key] = null;
        return this.afDB.object('/').update(data);
    };
    AppService.prototype.getReportsFromUser = function (type) {
        return this.afDB.list("_reports/" + type);
    };
    AppService.prototype.removeReportProblem = function (problem_uid) {
        return this.afDB.object("_reports/problem/" + problem_uid).remove();
    };
    AppService.prototype.getReportedProblem = function (problem_uid) {
        return this.afDB.object("_reports/problem/" + problem_uid);
    };
    AppService.prototype.doAdminDisableApp = function (app_uid, user_uid, state) {
        var data = {};
        data["applications/" + app_uid + "/disabledByAdminUid"] = !state ? this.cacheService.admin_uid : null;
        data["users/developer_data/" + user_uid + "/user_personal_apps/" + app_uid + "/disabledByAdminUid"] = !state ? this.cacheService.admin_uid : null;
        return this.afDB.object('/').update(data);
    };
    // App stats, 
    AppService.prototype.getAppStatsInDashboard = function () {
        var highestRatedApps = [];
        var mostViewedApps = [];
        var mostDownloadedApps = [];
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var appsRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("applications");
            appsRef.on('value', function (snapshot) {
                var apps = snapshot.val();
                for (var uid in apps) {
                    var app_uid = uid;
                    getMostDownloaded(app_uid).subscribe(function (mostDownloadedApps) {
                        var overallDownloads = mostDownloadedApps.slice(0);
                        var androidDownloads = mostDownloadedApps.slice(0);
                        var desktopDownloads = mostDownloadedApps.slice(0);
                        var sourceCodeDownloads = mostDownloadedApps.slice(0);
                        overallDownloads = sortToHighestDownload(overallDownloads, 'totalDownloads');
                        androidDownloads = sortToHighestDownload(androidDownloads, 'android');
                        desktopDownloads = sortToHighestDownload(desktopDownloads, 'desktop');
                        sourceCodeDownloads = sortToHighestDownload(sourceCodeDownloads, 'source_code');
                        var data = {
                            overall: overallDownloads,
                            android: androidDownloads,
                            desktop: desktopDownloads,
                            source_code: sourceCodeDownloads
                        };
                        observer.next({ id: 'most_downloaded', data: data });
                    });
                    getMostViewedApps(app_uid).subscribe(function (mostViewedApps) {
                        mostViewedApps = sortToHighest(mostViewedApps, 'viewCount');
                        observer.next({ id: 'most_viewed', data: mostViewedApps });
                    });
                    calculateReviews(app_uid).subscribe(function (highestRatedApps) {
                        highestRatedApps = sortToHighest(highestRatedApps, 'stars');
                        var data = ObjectToArray(highestRatedApps);
                        observer.next({ id: 'ratings_reviews', data: data });
                    });
                }
            });
            function ObjectToArray(value) {
                var arr = [];
                for (var key in value) {
                    value[key]['key'] = key;
                    arr.push(value[key]);
                }
                return arr;
            }
            function sortToHighest(array, field) {
                array.sort(function (a, b) {
                    if (a[field] > b[field]) {
                        return -1;
                    }
                    else if (a[field] < b[field]) {
                        return 1;
                    }
                    return 0;
                });
                return array;
            }
            function sortToHighestDownload(array, field) {
                array.sort(function (a, b) {
                    if (a['downloadsObj'][field] > b['downloadsObj'][field]) {
                        return -1;
                    }
                    else if (a['downloadsObj'][field] < b['downloadsObj'][field]) {
                        return 1;
                    }
                    return 0;
                });
                return array;
            }
            function getMostViewedApps(app_uid) {
                var appViewsRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("applications_stats/views/" + app_uid + "/");
                return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
                    appViewsRef.on('value', function (snapshot) {
                        if (snapshot.val()) {
                            // mostViewedApps
                            var viewCount_1 = Object.keys(snapshot.val()).length;
                            getAppData(app_uid).subscribe(function (appData) {
                                var data = {
                                    appData: appData,
                                    viewCount: viewCount_1,
                                };
                                mostViewedApps.push(data);
                                observer.next(mostViewedApps);
                            });
                        }
                    });
                });
            }
            function calculateReviews(app_uid) {
                return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
                    var appReviews = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("applications_stats/reviews/" + app_uid);
                    appReviews.on('value', function (snapshot) {
                        var reviews = snapshot.val();
                        reviews = ObjectToArray(reviews);
                        if (reviews && reviews.length > 0) {
                            var stars_2 = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                            var averageStarRating_1 = 0;
                            var overallRating = 0;
                            var totalReviews_1 = 0;
                            // Tally for each review star to the stars object
                            reviews.forEach(function (review) { stars_2[review.stars]++; });
                            for (var i = 1; i <= 5; i++) {
                                overallRating += i * stars_2[i];
                                totalReviews_1 += stars_2[i];
                            }
                            averageStarRating_1 = overallRating / totalReviews_1;
                            getAppData(app_uid).subscribe(function (appData) {
                                var data = {
                                    appData: appData,
                                    totalReviews: totalReviews_1,
                                    stars: averageStarRating_1,
                                };
                                // observer.next(data);
                                highestRatedApps.push(data);
                                observer.next(highestRatedApps);
                            });
                        }
                    });
                });
            }
            function getMostDownloaded(app_uid) {
                return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
                    var types = ['source_code', 'desktop', 'android'];
                    var downloadsObj = {
                        totalDownloads: 0,
                        source_code: 0,
                        desktop: 0,
                        android: 0,
                    };
                    var _loop_2 = function (i) {
                        var appDownloadsRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("applications_stats/downloads/" + types[i] + "/" + app_uid);
                        appDownloadsRef.on('value', function (snapshot) {
                            if (types[i] == 'android') {
                                if (snapshot.val()) {
                                    var releases = Object.keys(snapshot.val());
                                    if (releases && releases.length > 0) {
                                        downloadsObj[types[i]] = 0;
                                        for (var x = 0; x < releases.length; x++) {
                                            downloadsObj[types[i]] += Object.keys(snapshot.val()[releases[x]]).length;
                                        }
                                    }
                                }
                            }
                            else {
                                downloadsObj[types[i]] = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
                            }
                            downloadsObj.totalDownloads = downloadsObj.android + downloadsObj.desktop + downloadsObj.source_code;
                        });
                    };
                    for (var i = 0; i < types.length; i++) {
                        _loop_2(i);
                    }
                    setTimeout(function () {
                        getAppData(app_uid).subscribe(function (appData) {
                            var data = {
                                appData: appData,
                                downloadsObj: downloadsObj,
                            };
                            if (data.downloadsObj.totalDownloads > 0) {
                                mostDownloadedApps.push(data);
                                observer.next(mostDownloadedApps);
                            }
                        });
                    }, 1000);
                });
            }
            function getAppData(app_uid) {
                return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
                    var appDataRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref("applications/" + app_uid);
                    appDataRef.once('value', function (snapshot) {
                        var data = {
                            uid: snapshot.val().uid,
                            title: snapshot.val().title,
                            thumbIconURL: snapshot.val().thumbIconURL,
                            iconURL: snapshot.val().iconURL
                        };
                        observer.next(data);
                    });
                });
            }
        });
    };
    return AppService;
}());
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_6____["f" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__utils__["b" /* HelperUtil */],
        __WEBPACK_IMPORTED_MODULE_6____["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_6____["e" /* MailService */]])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_storage__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6____ = __webpack_require__(67);
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



// Services

var FileService = (function () {
    // public uploadTasks = [];
    function FileService(platformUtil, cacheService) {
        this.platformUtil = platformUtil;
        this.cacheService = cacheService;
        this.storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["storage"]().ref();
    }
    FileService.prototype.downloadFile = function (url) {
        // url = url.replace(/^http\:\/\//, '')
        //  .replace(/^https\:\/\//, '') // remove the leading https://
        // url = decodeURIComponent(url);
        if (this.platformUtil.checkPlatform() === 'browser') {
            console.log('Downloading using native downloader in browser');
            window.open(url, '_self');
        }
        else if (this.platformUtil.checkPlatform() === 'android') {
            console.log('Downloading using native downloader in android OS');
        }
    };
    FileService.prototype.uploadFile = function (taskType, remotePath, localPath, filename, args) {
        var uploadTask = this.storageRef.child(remotePath + "/" + filename).putString(localPath, 'data_url');
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                observer.next({
                    progress: Math.round(progress),
                    transferred: snapshot.bytesTransferred
                });
            }, function (error) {
                observer.next({ error: error });
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                observer.next({ downloadURL: downloadURL });
                // this.getThumbUrl(remotePath,`thumb_${filename}`).then(thumb_url=>{
                //     observer.next({
                //         downloadURL: downloadURL,
                //         thumbURL: thumb_url,
                //     });
                // }).catch(e=>{
                //     observer.next({error: {code: 'function/busy'}});
                // });
            });
        });
    };
    FileService.prototype.getThumbUrl = function (path, filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var counter = 0;
            var urlListener = setInterval(function () {
                _this.storageRef.child(path + "/" + filename).getDownloadURL().then(function (url) {
                    clearInterval(urlListener);
                    resolve(url);
                }).catch(function (err) {
                    counter++;
                    if (counter == 60) {
                        clearInterval(urlListener);
                        return reject();
                    }
                });
            }, 1000);
        });
    };
    return FileService;
}());
FileService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_6____["c" /* CacheService */]])
], FileService);

//# sourceMappingURL=file.service.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ApkService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(67);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* PlatformUtil */],
        __WEBPACK_IMPORTED_MODULE_2____["c" /* CacheService */]])
], ApkService);

//# sourceMappingURL=apk.service.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
var App = (function () {
    function App() {
        this.platforms = {
            web: {
                isCompatible: null,
                demoURL: null,
            },
            android: {
                isCompatible: null,
                releases: [],
                demoURL: null,
            },
            desktop: {
                isCompatible: null,
                demoURL: null,
                demoDownloadURL: null,
                demoFilename: null,
                demoFileSize: null,
                dateCreated: null,
            }
        };
        this.openSource = {
            // isOpenSource: null,
            sourceCodeURL: null,
            sourceCodeDownloadURL: null,
            sourceCodeFilename: null,
            sourceCodeFilesize: null,
            dateCreated: null
        };
    }
    return App;
}());

//# sourceMappingURL=app.model.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Admin; });
var Admin = (function () {
    function Admin() {
    }
    return Admin;
}());

//# sourceMappingURL=admin.model.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Review */
var Review = (function () {
    function Review() {
    }
    return Review;
}());

//# sourceMappingURL=review.model.js.map

/***/ })

},[531]);
//# sourceMappingURL=main.js.map