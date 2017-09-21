webpackJsonp([6],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsPageModule", function() { return AnalyticsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analytics__ = __webpack_require__(854);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AnalyticsPageModule = (function () {
    function AnalyticsPageModule() {
    }
    return AnalyticsPageModule;
}());
AnalyticsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__analytics__["a" /* AnalyticsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__analytics__["a" /* AnalyticsPage */]),
        ],
    })
], AnalyticsPageModule);

//# sourceMappingURL=analytics.module.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services___ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeWhile__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeWhile__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AnalyticsPage = (function () {
    function AnalyticsPage(navCtrl, cacheService, userService) {
        this.navCtrl = navCtrl;
        this.cacheService = cacheService;
        this.userService = userService;
        this.alive = true;
        this.onlineUsers = [];
        this.usersList = [];
    }
    AnalyticsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnalyticsPage');
        this.getUsers('all');
        this.getUsers('online_users');
    };
    AnalyticsPage.prototype.getUsers = function (type) {
        var _this = this;
        //all, online_users
        this.userService.getUsers(type)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (users) {
            if (type === 'online_users') {
                _this.onlineUsers = users.filter(function (u) { return u.$value === true; });
                _this.onlineUsers.forEach(function (user, i) {
                    _this.userService.getUserData(user.$key).takeWhile(function () { return _this.alive; }).subscribe(function (userData) {
                        _this.onlineUsers[i] = userData;
                    });
                });
            }
            else {
                _this.usersList = users;
            }
        });
    };
    AnalyticsPage.prototype.ionViewCanEnter = function () {
        return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
    };
    AnalyticsPage.prototype.ngOnDestroy = function () {
        console.log('Destroying analytics');
        this.alive = false;
    };
    return AnalyticsPage;
}());
AnalyticsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-analytics',template:/*ion-inline-start:"C:\Users\pc\ShowcaseItAdmin\src\pages\analytics\analytics.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="light"></ion-icon>\n    </button>\n    <ion-title>Analytics</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row>\n    <!--Users-->\n    <ion-col col-lg-4 col-md-6 col-sm-12 col-12>\n      <ion-card>\n        <ion-card-header> Users </ion-card-header>\n        <ion-card-content>\n          User count: {{usersList?.length}}\n          Online users: {{onlineUsers?.length}}\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-lg-4 col-md-6 col-sm-12 col-12>\n      <ion-card>\n        <ion-card-header> Lorem </ion-card-header>\n        <ion-card-content>\n          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-lg-4 col-md-6 col-sm-12 col-12>\n      <ion-card>\n        <ion-card-header> Users </ion-card-header>\n        <ion-card-content>\n          User count: {{usersList?.length}}\n          Online users: {{onlineUsers?.length}}\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-lg-4 col-md-6 col-sm-12 col-12>\n      <ion-card>\n        <ion-card-header> Lorem </ion-card-header>\n        <ion-card-content>\n          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n  </ion-row>\n\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\pc\ShowcaseItAdmin\src\pages\analytics\analytics.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services___["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services___["e" /* UserService */]])
], AnalyticsPage);

//# sourceMappingURL=analytics.js.map

/***/ })

});
//# sourceMappingURL=6.js.map