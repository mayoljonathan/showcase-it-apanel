webpackJsonp([23],{

/***/ 1180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupLoadingPageModule", function() { return StartupLoadingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__startup_loading__ = __webpack_require__(1361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StartupLoadingPageModule = (function () {
    function StartupLoadingPageModule() {
    }
    return StartupLoadingPageModule;
}());
StartupLoadingPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__startup_loading__["a" /* StartupLoadingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__startup_loading__["a" /* StartupLoadingPage */]),
        ],
    })
], StartupLoadingPageModule);

//# sourceMappingURL=startup-loading.module.js.map

/***/ }),

/***/ 1361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartupLoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StartupLoadingPage = (function () {
    function StartupLoadingPage(navCtrl, navParams, cacheService, menuCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cacheService = cacheService;
        this.menuCtrl = menuCtrl;
        this.timeoutCounter = 0;
        this.connectionError = false;
        menuCtrl.enable(false);
        // let url = window.location.href;
        // var parts = url.split('/');
        // var lastSegment = parts.pop();  // handle potential trailing slash
        // console.log(lastSegment);
        var redirectUrl = this.getParameterByName('req', window.location.href);
        setTimeout(function () {
            if (redirectUrl) {
                redirectUrl = redirectUrl
                    .replace(/^http\:\/\//, '') // remove the leading http:// (temporarily)
                    .replace(/\/+/g, '/') // replace consecutive slashes with a single slash
                    .replace(/\/+$/, ''); // remove trailing slashes  
            }
            console.log(redirectUrl);
            // redirectUrl = redirectUrl.replace(/\//g, "");
            if (!redirectUrl || redirectUrl == null || redirectUrl == 'undefined' || redirectUrl == 'startup') {
                redirectUrl = 'login';
            }
            console.log("Redirecting to : #" + redirectUrl);
            _this.menuCtrl.enable(false);
            window.location.href = "#" + redirectUrl;
        }, 1000);
    }
    StartupLoadingPage.prototype.retry = function () {
        this.navCtrl.setRoot('DashboardPage');
    };
    StartupLoadingPage.prototype.getParameterByName = function (name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    StartupLoadingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StartupLoadingPage');
        this.listenConnection();
    };
    StartupLoadingPage.prototype.listenConnection = function () {
        var _this = this;
        var listener = setInterval(function () {
            if (_this.timeoutCounter == 60) {
                _this.connectionError = true;
                clearInterval(listener);
            }
            if (_this.cacheService.isConnected) {
                clearInterval(listener);
                // this.navCtrl.setRoot('HomePage');
            }
            _this.timeoutCounter++;
        }, 500);
    };
    return StartupLoadingPage;
}());
StartupLoadingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */])({ segment: 'startup' }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-startup-loading',template:/*ion-inline-start:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\startup-loading\startup-loading.html"*/'<ion-content class="bg">\n  <div class="full-height flex-hv">\n    <div class="grid-center" *ngIf="connectionError">\n      <ion-icon name="close" class="large-icon"></ion-icon>\n      <span>Please check your internet connection.</span>\n      <button ion-button class="half-width center mtop-5" (click)="retry()">Retry</button>\n    </div>\n    <div class="grid-center" *ngIf="!connectionError">\n      <div class="loader"></div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\pc\ShowcaseIT - Admin Panel\src\pages\startup-loading\startup-loading.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__shared_services__["c" /* CacheService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* MenuController */]])
], StartupLoadingPage);

//# sourceMappingURL=startup-loading.js.map

/***/ })

});
//# sourceMappingURL=23.js.map