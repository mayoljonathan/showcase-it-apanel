webpackJsonp([27],{

/***/ 1158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppCategoryTabsPageModule", function() { return AppCategoryTabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_category_tabs__ = __webpack_require__(1338);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppCategoryTabsPageModule = (function () {
    function AppCategoryTabsPageModule() {
    }
    return AppCategoryTabsPageModule;
}());
AppCategoryTabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_category_tabs__["a" /* AppCategoryTabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__["a" /* SuperTabsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__app_category_tabs__["a" /* AppCategoryTabsPage */]),
        ],
    })
], AppCategoryTabsPageModule);

//# sourceMappingURL=app-category-tabs.module.js.map

/***/ }),

/***/ 1338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppCategoryTabsPage; });
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



var AppCategoryTabsPage = (function () {
    function AppCategoryTabsPage(navCtrl, cacheService, navParams) {
        this.navCtrl = navCtrl;
        this.cacheService = cacheService;
        this.navParams = navParams;
        this.tab1 = 'ApplicationsCatListPage';
        this.tab2 = 'GamesCatListPage';
        this.pageLoaded = false;
    }
    AppCategoryTabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AppCategoryTabsPage');
        this.pageLoaded = true;
        setTimeout(function () {
            _this.superTabs.enableTabsSwipe(false);
        }, 250);
    };
    AppCategoryTabsPage.prototype.ionViewCanEnter = function () {
        return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
    };
    return AppCategoryTabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('superTabs'),
    __metadata("design:type", Object)
], AppCategoryTabsPage.prototype, "superTabs", void 0);
AppCategoryTabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])({ segment: 'app-categories' }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-app-category-tabs',template:/*ion-inline-start:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\app-category-tabs\app-category-tabs.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n    <ion-title>App Categories</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <super-tabs #superTabs scrollTabs="true" sideMenu="left" toolbarColor="white" toolbarBackground="super-tabs-default" indicatorColor="white" *ngIf="pageLoaded">\n    <super-tab [root]="tab1" title="Applications"></super-tab>\n    <super-tab [root]="tab2" title="Games"></super-tab>\n  </super-tabs>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\app-category-tabs\app-category-tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */]])
], AppCategoryTabsPage);

//# sourceMappingURL=app-category-tabs.js.map

/***/ })

});
//# sourceMappingURL=27.js.map