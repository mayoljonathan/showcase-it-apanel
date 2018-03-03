webpackJsonp([25],{

/***/ 1169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportTabsPageModule", function() { return ReportTabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__report_tabs__ = __webpack_require__(1350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__ = __webpack_require__(528);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ReportTabsPageModule = (function () {
    function ReportTabsPageModule() {
    }
    return ReportTabsPageModule;
}());
ReportTabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__report_tabs__["a" /* ReportTabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__["a" /* SuperTabsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__report_tabs__["a" /* ReportTabsPage */]),
        ],
    })
], ReportTabsPageModule);

//# sourceMappingURL=report-tabs.module.js.map

/***/ }),

/***/ 1350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportTabsPage; });
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



var ReportTabsPage = (function () {
    function ReportTabsPage(navCtrl, navParams, cacheService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cacheService = cacheService;
        this.events = events;
        this.tab1 = 'FlagReviewsListPage';
        this.tab2 = 'ProblemsListPage';
        this.pageLoaded = false;
        this.frCount = 0; //publish_request
        this.rpCount = 0; //content_update
    }
    ReportTabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.pageLoaded = true;
        this.events.subscribe('flag_reviews_count', function (count) { return _this.frCount = count; });
        this.events.subscribe('reported_problems_count', function (count) { return _this.rpCount = count; });
        setTimeout(function () {
            _this.superTabs.enableTabsSwipe(false);
        }, 250);
    };
    ReportTabsPage.prototype.ionViewCanEnter = function () {
        return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
    };
    ReportTabsPage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('flag_reviews_count');
        this.events.unsubscribe('reported_problems_count');
    };
    return ReportTabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('superTabs'),
    __metadata("design:type", Object)
], ReportTabsPage.prototype, "superTabs", void 0);
ReportTabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])({ segment: 'user-reports' }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-report-tabs',template:/*ion-inline-start:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\report-tabs\report-tabs.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n    <ion-title>Reports from Users</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <super-tabs #superTabs scrollTabs="true" sideMenu="left" badgeColor="danger" toolbarColor="white" toolbarBackground="super-tabs-default" indicatorColor="white" *ngIf="pageLoaded">\n    <super-tab [root]="tab1" [badge]="frCount != 0 ? frCount : \'\'" title="Flag Reviews"></super-tab>\n    <super-tab [root]="tab2" [badge]="rpCount != 0 ? rpCount : \'\'" title="Reported Problems"></super-tab>\n  </super-tabs>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\report-tabs\report-tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Events */]])
], ReportTabsPage);

//# sourceMappingURL=report-tabs.js.map

/***/ })

});
//# sourceMappingURL=25.js.map