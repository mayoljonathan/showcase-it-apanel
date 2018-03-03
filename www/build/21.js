webpackJsonp([21],{

/***/ 1181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAccountsTabsPageModule", function() { return UserAccountsTabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_accounts_tabs__ = __webpack_require__(1362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UserAccountsTabsPageModule = (function () {
    function UserAccountsTabsPageModule() {
    }
    return UserAccountsTabsPageModule;
}());
UserAccountsTabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__user_accounts_tabs__["a" /* UserAccountsTabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__["a" /* SuperTabsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__user_accounts_tabs__["a" /* UserAccountsTabsPage */]),
        ],
    })
], UserAccountsTabsPageModule);

//# sourceMappingURL=user-accounts-tabs.module.js.map

/***/ }),

/***/ 1362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAccountsTabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services___ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserAccountsTabsPage = (function () {
    function UserAccountsTabsPage(navCtrl, cacheService, navParams) {
        this.navCtrl = navCtrl;
        this.cacheService = cacheService;
        this.navParams = navParams;
        this.tab1 = 'UsersListPage';
        this.tab2 = 'AdministratorsListPage';
        this.pageLoaded = false;
    }
    UserAccountsTabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad UserAccountsTabsPage');
        this.pageLoaded = true;
        setTimeout(function () {
            _this.superTabs.enableTabsSwipe(false);
        }, 250);
    };
    UserAccountsTabsPage.prototype.ionViewCanEnter = function () {
        return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
    };
    return UserAccountsTabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('superTabs'),
    __metadata("design:type", Object)
], UserAccountsTabsPage.prototype, "superTabs", void 0);
UserAccountsTabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])({ segment: 'user-accounts' }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-user-accounts-tabs',template:/*ion-inline-start:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\user-accounts-tabs\user-accounts-tabs.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n    <ion-title>User Accounts</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <super-tabs #superTabs scrollTabs="true" sideMenu="left" toolbarColor="white" toolbarBackground="super-tabs-default" indicatorColor="white" *ngIf="pageLoaded">\n    <super-tab [root]="tab1" title="Users"></super-tab>\n    <super-tab [root]="tab2" title="Administrators"></super-tab>\n  </super-tabs>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\user-accounts-tabs\user-accounts-tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */]])
], UserAccountsTabsPage);

//# sourceMappingURL=user-accounts-tabs.js.map

/***/ })

});
//# sourceMappingURL=21.js.map