webpackJsonp([3],{

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestTabsPageModule", function() { return RequestTabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__request_tabs__ = __webpack_require__(860);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RequestTabsPageModule = (function () {
    function RequestTabsPageModule() {
    }
    return RequestTabsPageModule;
}());
RequestTabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__request_tabs__["a" /* RequestTabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic2_super_tabs__["a" /* SuperTabsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__request_tabs__["a" /* RequestTabsPage */]),
        ],
    })
], RequestTabsPageModule);

//# sourceMappingURL=request-tabs.module.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestTabsPage; });
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


var RequestTabsPage = (function () {
    function RequestTabsPage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.tab1 = 'PublishRequestPage';
        this.tab2 = 'ContentUpdatePage';
        this.prCount = 0; //publish_request
        this.cuCount = 0; //content_update
    }
    RequestTabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.superTabs.enableTabsSwipe(false);
        console.log('ionViewDidLoad RequestTabsPage');
        this.events.subscribe('publish_request_count', function (count) { return _this.prCount = count; });
        this.events.subscribe('content_update_request_count', function (count) { return _this.cuCount = count; });
    };
    RequestTabsPage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('publish_request_count');
        this.events.unsubscribe('content_update_request_count');
    };
    return RequestTabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('superTabs'),
    __metadata("design:type", Object)
], RequestTabsPage.prototype, "superTabs", void 0);
RequestTabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* IonicPage */])({ segment: 'requests' }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-request-tabs',template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\pages\request-tabs\request-tabs.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon color="white" name="menu"></ion-icon>\n    </button>\n    <ion-title>App Requests</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!--toolbarBackground="dev-dark" toolbarColor="pure-white" indicatorColor="pure-white" (tabSelect)="onTabSelect($event)"-->\n  <!--#superTabs-->\n  <super-tabs #superTabs scrollTabs="true" sideMenu="left" badgeColor="danger" toolbarColor="white" toolbarBackground="super-tabs-default" indicatorColor="white">\n    <super-tab [root]="tab1" [badge]="prCount != 0 ? prCount : \'\'" title="Publish Requests"></super-tab>\n    <super-tab [root]="tab2" [badge]="cuCount != 0 ? cuCount : \'\'" title="Content Update Requests"></super-tab>\n  </super-tabs>\n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\pages\request-tabs\request-tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
], RequestTabsPage);

//# sourceMappingURL=request-tabs.js.map

/***/ })

});
//# sourceMappingURL=3.js.map