import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';

import { PlatformUtil,DialogUtil,HelperUtil } from "../utils";

// Services
import { CacheService,UserService,MailService } from './';
// Models
import { App } from "../models"; 

import * as request from 'request'

@Injectable()
export class AppService {

    // app: App;

    constructor(
        // public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        public platformUtil: PlatformUtil,
        public userService: UserService,
        public helperUtil: HelperUtil,
        public cacheService: CacheService,
        public mailService: MailService,
    ){

    }

    // USED FOR WATCHING CHANGES IN REQUESTS
    getRequest(type,request_uid){
        return this.afDB.object(`_requests/${type}/${request_uid}`);
    }
    getRequests(type){
        // type = publish_requests,content_update_requests
        return this.afDB.list(`_requests/${type}`);
    }

    getRequestInLog(request_uid){
        return this.afDB.list(`_requests/log/`, {
            query: {
                orderByChild: 'request_uid',
                equalTo: request_uid,
                limitToLast: 1
            }
        });
    }

    getAppData(app_uid,user_uid){
        return this.afDB.object(`users/developer_data/${user_uid}/user_personal_apps/${app_uid}`);
    }
    _getAppData(app_uid,user_uid){
        return firebase.database().ref(`users/developer_data/${user_uid}/user_personal_apps/${app_uid}`);
    }

    // USED IN GETTIGN APP DETAILS IN MAIN// NOT IN DEV
    getMainAppDetails(app_uid){
        return this.afDB.object(`applications/${app_uid}`);
    }

    managePublishRequest(action,requestData,type,mailData?){
        return new Promise((resolve,reject)=>{
            let request_uid = requestData.key;
            let app = Object.assign({},requestData);
            let data = {};
            let userAppsRoot = `users/developer_data/${app.user_uid}/user_personal_apps/${app.app_uid}/`;
            let requestsRoot = `_requests/${type}/${request_uid}`;
            
            app['action'] = action;
            app['userData'] = null;
            app['admin_uid'] = this.cacheService.admin_uid;
            app['request_type'] = type==='publish_requests' ? 'publish_request' : 'content_update';
            app['request_uid'] = request_uid;
            app['log_dateCreated'] = firebase.database.ServerValue.TIMESTAMP;

            // REMOVE 'checked' in mailData reasons
            if(mailData.reasons){
                mailData.reasons.forEach(r=>{
                    delete r['checked'];
                });
            }

            app.appData.iconFileSize = null;
            app.appData.dateCreated = null;
            app.appData.dateUpdated = null;
            // Save the request as backup to request log
            // SEND TO LOG
            let logUid = this.helperUtil.generatePushID();
            data[`_requests/log/${logUid}}`] = app;

            if(action === 'approve'){
                // Update users apps data
                data[userAppsRoot+`status`] = 'published';
                data[userAppsRoot+`datePublished`] = firebase.database.ServerValue.TIMESTAMP;
                // Remove to requestRoot
                data[requestsRoot] = null;

                app.appData.user_uid = app.user_uid;
                app.appData.status = 'published';
                app.appData.datePublished = firebase.database.ServerValue.TIMESTAMP;
                // Pushing published applications
                data[`applications/${app.app_uid}`] = app.appData;
            }else if(action === 'reject'){
                console.log('REJECTING');
                data[requestsRoot] = null;

                if(type==='publish_requests'){
                    data[userAppsRoot+`status`] = 'draft';
                    app.appData.status = 'draft';
                }else{
                    data[userAppsRoot+`status_cu`] = null;
                }

                app['reject_reasons'] = mailData.reasons;
            }else if(action === 'reject_remove'){
                console.log('REJECT REMOVE');
                data[userAppsRoot] = null;
                data[requestsRoot] = null;
                app['reject_reasons'] = mailData.reasons;

                // Archive the applicationsRoot in Showcase It
                // Get the data from applicationsRoot and archive it to other node
                return this.afDB.object(`applications/${app.app_uid}`).take(1).subscribe(appData=>{
                    appData['archivedByUserType'] = 'admin';
                    appData['archivedByUserUid'] = this.cacheService.admin_uid;
                    appData['archivedDate'] = firebase.database.ServerValue.TIMESTAMP;

                    data[`_archive/applications/${app.app_uid}`] = appData;
                    data[`applications/${app.app_uid}`] = null;
                    return this.afDB.object('/').update(data).then(()=>{
                        return this.mailService.sendRequestEmail(type,mailData).then(()=>resolve(true),e=>reject());
                    },e=>reject());
                });
            }
            // ADDED FOR CU
            else if(action === 'approve_cu'){
                data[userAppsRoot+`dateUpdated`] = firebase.database.ServerValue.TIMESTAMP;
                data[userAppsRoot+`status_cu`] = null;
                // Remove to requestRoot
                data[requestsRoot] = null;

                app.appData.user_uid = app.user_uid;
                app.appData.dateUpdated = firebase.database.ServerValue.TIMESTAMP;
                // Pushing published applications
                data[`applications/${app.app_uid}`] = app.appData;
            }

            // console.log('HERE !!!');
            // console.log(data);
            this.afDB.object('/').update(data).then(()=>{
                this.mailService.sendRequestEmail(type,mailData).then(()=> resolve(true),e=> reject());
            },e=>reject());
        });
    }

    deleteApp(app_uid,user_uid){
        return new Promise((resolve,reject)=>{
            let data = {};
            let userAppsRoot = `users/developer_data/${user_uid}/user_personal_apps/${app_uid}/`;
            data[userAppsRoot] = null;
            return this.afDB.object(`applications/${app_uid}`).take(1).subscribe(appData=>{
                appData['archivedByUserType'] = 'admin';
                appData['archivedByUserUid'] = this.cacheService.admin_uid;
                appData['archivedDate'] = firebase.database.ServerValue.TIMESTAMP;

                data[`_archive/applications/${app_uid}`] = appData;
                data[`applications/${app_uid}`] = null;
                return this.afDB.object('/').update(data).then(()=>{ return resolve();
                },e=>reject());
            });
        });
    }


    // Removing file in the publish request/content_update
    removeFile(type,app,args?,removeMainApp?){
        console.log(type);
        console.log(app);
        console.log(args);
        let root = `users/developer_data/${app.user_uid}/user_personal_apps/${app.app_uid}/`;
        let data = {};
        if(type === 'remove_os_archive'){
            data[root+`openSource/sourceCodeDownloadURL`] = null;
            data[root+`openSource/sourceCodeFilename`] = null;
            data[root+`openSource/sourceCodeFilesize`] = null;
            data[root+`openSource/dateCreated`] = null;
        }else if(type === 'remove_desktop_archive'){
            data[root+`platforms/desktop/dateCreated`] = null;
            data[root+`platforms/desktop/demoDownloadURL`] = null;
            data[root+`platforms/desktop/demoFileSize`] = null;
            data[root+`platforms/desktop/demoFilename`] = null;
        }else if(type === 'remove_android_release'){
            data[root+`platforms/android/releases/${args.masterReleaseCode}`] = null;
        }

        if(removeMainApp){
            let mainAppRoot = `applications/${app.app_uid}/`;
            if(type === 'remove_os_archive'){
                data[mainAppRoot+`openSource/sourceCodeDownloadURL`] = null;
                data[mainAppRoot+`openSource/sourceCodeFilename`] = null;
                data[mainAppRoot+`openSource/sourceCodeFilesize`] = null;
                data[mainAppRoot+`openSource/dateCreated`] = null;
            }else if(type === 'remove_desktop_archive'){
                data[mainAppRoot+`platforms/desktop/dateCreated`] = null;
                data[mainAppRoot+`platforms/desktop/demoDownloadURL`] = null;
                data[mainAppRoot+`platforms/desktop/demoFileSize`] = null;
                data[mainAppRoot+`platforms/desktop/demoFilename`] = null;
            }else if(type === 'remove_android_release'){
                data[mainAppRoot+`platforms/android/releases/${args.masterReleaseCode}`] = null;
            }
        }

        console.log(data);
        return this.afDB.object('/').update(data);
    }


    // GETTING APP CATEGORIES
    // app_type = apps,games
    getCategories(app_type){
        return this.afDB.list(`_category/${app_type}`);
    }
    
    getCategoryData(app_type,category_uid){
        return this.afDB.object(`_category/${app_type}/${category_uid}`);
    }

    updateCategory(app_type,isEditing,data){
        if(isEditing){
            return this.afDB.object(`_category/${app_type}/${data.uid}/`).update(data);
        }else{
            let uid = this.helperUtil.generatePushID();
            return this.afDB.object(`_category/${app_type}/${uid}`).update({
                uid: uid,
                name: data,
                status: 1,
                dateCreated: firebase.database.ServerValue.TIMESTAMP
            });
        }
    }
    
    // GET ALL APPS
    getAllApps(){
        return this.afDB.list(`applications/`);
    }

    getAppsByCategory(category_uid){
        return this.afDB.list(`applications/`, {
            query: {
                orderByChild: 'category',
                equalTo: category_uid
            }
        });
    }

    // GETTING USER'S SHOWCASED APPS
    getUserShowcasedApps(user_uid){
        return this.afDB.list(`applications/`, {
            query: {
                orderByChild: 'user_uid',
                equalTo: user_uid
            }
        });
    }

    // With calculation
    getReviews(app_uid,alive?){
        return new Observable(observer=>{
            this.afDB.list(`applications_stats/reviews/${app_uid}`).takeWhile(()=>alive).subscribe(reviews=>{
                if(reviews && reviews.length > 0){
                    let stars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                    let averageStarRating = 0;
                    let overallRating = 0;
                    let totalReviews = 0;
                    // Tally for each review star to the stars object
                    reviews.forEach((review)=>{ stars[review.stars]++; });
                    for(let i=1;i<=5;i++){
                        overallRating += i * stars[i];
                        totalReviews += stars[i];
                    }
                    averageStarRating = overallRating / totalReviews;

                    let data = {
                        totalReviews: totalReviews,
                        averageStarRating: averageStarRating.toFixed(1),
                        reviews: reviews,
                        stars: stars
                    };
                    observer.next(data);
                }else{
                    observer.next({
                        totalReviews: 0,
                        averageStarRating: 0,
                        reviews: [],
                        stars: 0,
                    });
                }
            });
        });
    }
    // No calculation
    getReviewsOnly(app_uid){
        return this.afDB.list(`applications_stats/reviews/${app_uid}`);
    }
    getTotalViews(app_uid){
        return this.afDB.list(`applications_stats/views/${app_uid}/`);
    }
    getTotalDownloads(app_uid,alive){
        return new Observable(observer=>{
            let types = ['source_code','desktop','android'];
            let downloadsObj = {
                totalDownloads: 0,
                downloads: {
                    source_code: 0,
                    desktop: 0,
                    android: 0,
                    android_releases: {}
                }
            };
            for(let i=0;i<types.length;i++){
                this.afDB.list(`applications_stats/downloads/${types[i]}/${app_uid}`).takeWhile(()=>alive).subscribe(data=>{
                    if(types[i] == 'android'){
                        // $key is the releaseCode
                        // data returns an array of downloaders in that release
                        if(data && data.length > 0){
                            // Reset the androids count because for every change in realtime, it will doubles the count
                            downloadsObj['downloads'][types[i]] = 0;
                            data.forEach(release=>{
                                let releaseDownloadersCount = Object.keys(release).length;
                                // Passes the length of downloads to the android_releases/releaseCode
                                downloadsObj['downloads']['android_releases'][release.$key] = releaseDownloadersCount;
                                // For every release , add the length of the downloads
                                downloadsObj['downloads'][types[i]] += releaseDownloadersCount;
                            });
                        }
                    }else{
                        downloadsObj['downloads'][types[i]] = data.length;
                    }
                    downloadsObj.totalDownloads = downloadsObj.downloads.android + downloadsObj.downloads.desktop + downloadsObj.downloads.source_code;
                    observer.next(downloadsObj);
                });
            }
        });
    }

    removeFlagReview(app_uid,review_key){
        let data = {};
        data[`applications_stats/reviews/${app_uid}/${review_key}/isFlagged`] = null;
        data[`_reports/flag_reviews/${app_uid}/${review_key}`] = null;
        return this.afDB.object('/').update(data);
    }
    deleteReview(app_uid,review_key){
        let data = {};
        data[`applications_stats/reviews/${app_uid}/${review_key}`] = null;
        data[`_reports/flag_reviews/${app_uid}/${review_key}`] = null;
        return this.afDB.object('/').update(data);
    }

    getReportsFromUser(type){
        return this.afDB.list(`_reports/${type}`);
    }
    removeReportProblem(problem_uid){
        return this.afDB.object(`_reports/problem/${problem_uid}`).remove();
    }
    getReportedProblem(problem_uid){
        return this.afDB.object(`_reports/problem/${problem_uid}`);
    }

    doAdminDisableApp(app_uid,user_uid,state){
        let data = {};
        data[`applications/${app_uid}/disabledByAdminUid`] = !state ? this.cacheService.admin_uid : null;
        data[`users/developer_data/${user_uid}/user_personal_apps/${app_uid}/disabledByAdminUid`] = !state ? this.cacheService.admin_uid : null;
        return this.afDB.object('/').update(data);
    }



    // App stats, 
    getAppStatsInDashboard(){
        var highestRatedApps = [];
        var mostViewedApps = [];
        var mostDownloadedApps= [];

        return new Observable(observer=>{
            let appsRef = firebase.database().ref(`applications`);
            appsRef.on('value' ,snapshot=>{
                let apps = snapshot.val();
                for(let uid in apps){
                    let app_uid = uid;
                    getMostDownloaded(app_uid).subscribe((mostDownloadedApps:any)=>{
                        let overallDownloads = mostDownloadedApps.slice(0);
                        let androidDownloads = mostDownloadedApps.slice(0);
                        let desktopDownloads = mostDownloadedApps.slice(0);
                        let sourceCodeDownloads = mostDownloadedApps.slice(0);

                        overallDownloads = sortToHighestDownload(overallDownloads,'totalDownloads');
                        androidDownloads = sortToHighestDownload(androidDownloads,'android');
                        desktopDownloads = sortToHighestDownload(desktopDownloads,'desktop');
                        sourceCodeDownloads = sortToHighestDownload(sourceCodeDownloads,'source_code');
                        let data = {
                            overall: overallDownloads,
                            android: androidDownloads,
                            desktop: desktopDownloads,
                            source_code: sourceCodeDownloads
                        }
                        observer.next({id: 'most_downloaded', data: data});
                    });
                    getMostViewedApps(app_uid).subscribe(mostViewedApps=>{
                        mostViewedApps = sortToHighest(mostViewedApps,'viewCount');
                        observer.next({id: 'most_viewed', data:mostViewedApps});
                    });
                    calculateReviews(app_uid).subscribe(highestRatedApps=>{
                        highestRatedApps = sortToHighest(highestRatedApps,'stars');
                        let data = ObjectToArray(highestRatedApps);
                        observer.next({id: 'ratings_reviews', data: data});
                    });
                }
            });

        function ObjectToArray(value){
            let arr = [];
            for (let key in value) {
                value[key]['key']= key;
                arr.push(value[key]);
            }
            return arr;
        }
        function sortToHighest(array,field){
            array.sort((a: any, b: any) => {
                if (a[field] > b[field]){ return -1;}
                else if (a[field] < b[field]){ return 1;}
                return 0;
            });
            return array;
        }
        function sortToHighestDownload(array,field){
            array.sort((a: any, b: any) => {
                if (a['downloadsObj'][field] > b['downloadsObj'][field]){ return -1;}
                else if (a['downloadsObj'][field] < b['downloadsObj'][field]){ return 1;}
                return 0;
            });
            return array;
        }

        function getMostViewedApps(app_uid){
            let appViewsRef = firebase.database().ref(`applications_stats/views/${app_uid}/`);
            return new Observable(observer=>{
                appViewsRef.on('value', snapshot=>{
                    if(snapshot.val()){
                        // mostViewedApps
                        let viewCount = Object.keys(snapshot.val()).length;
                        getAppData(app_uid).subscribe(appData=>{
                            let data = {
                                appData: appData,
                                viewCount: viewCount,
                            };
                            mostViewedApps.push(data);
                            observer.next(mostViewedApps);
                        });
                    }
                });
            });
        }
        function calculateReviews(app_uid){
            return new Observable(observer=>{
                let appReviews = firebase.database().ref(`applications_stats/reviews/${app_uid}`);
                appReviews.on('value', snapshot=>{
                    let reviews = snapshot.val();
                    reviews = ObjectToArray(reviews);
                
                    if(reviews && reviews.length > 0){
                        let stars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                        let averageStarRating = 0;
                        let overallRating = 0;
                        let totalReviews = 0;
                        // Tally for each review star to the stars object
                        reviews.forEach((review)=>{ stars[review.stars]++; });
                        for(let i=1;i<=5;i++){
                            overallRating += i * stars[i];
                            totalReviews += stars[i];
                        }
                        averageStarRating = overallRating / totalReviews;

                        getAppData(app_uid).subscribe(appData=>{
                            let data = {
                                appData: appData,
                                totalReviews: totalReviews,
                                stars: averageStarRating,
                            };
                            // observer.next(data);
                            highestRatedApps.push(data);
                            observer.next(highestRatedApps);
                        });
                    }
                });
            });
        }
        function getMostDownloaded(app_uid){
            return new Observable(observer=>{
                let types = ['source_code','desktop','android'];
                let downloadsObj = {
                    totalDownloads: 0,
                    source_code: 0,
                    desktop: 0,
                    android: 0,
                };
                for(let i=0;i<types.length;i++){
                    let appDownloadsRef = firebase.database().ref(`applications_stats/downloads/${types[i]}/${app_uid}`);
                    appDownloadsRef.on('value', snapshot=>{
                        if(types[i] == 'android'){
                            if(snapshot.val()){
                                let releases = Object.keys(snapshot.val());
                                if(releases && releases.length > 0){
                                    downloadsObj[types[i]] = 0;
                                    for(let x=0;x< releases.length;x++){
                                        downloadsObj[types[i]] += Object.keys(snapshot.val()[releases[x]]).length;
                                    }
                                }
                            }
                        }else{
                            downloadsObj[types[i]] = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
                        }
                        downloadsObj.totalDownloads = downloadsObj.android + downloadsObj.desktop + downloadsObj.source_code; 
                    });
                }
                setTimeout(()=>{
                    getAppData(app_uid).subscribe(appData=>{
                        let data = {
                            appData: appData,
                            downloadsObj: downloadsObj,
                        };
                        if(data.downloadsObj.totalDownloads > 0){
                            mostDownloadedApps.push(data);
                            observer.next(mostDownloadedApps);
                        }
                    });
                },1000);
            });


        }
        function getAppData(app_uid){
            return new Observable(observer=>{
                let appDataRef = firebase.database().ref(`applications/${app_uid}`);
                appDataRef.once('value', snapshot=>{
                    let data = {
                        uid: snapshot.val().uid,
                        title: snapshot.val().title,
                        thumbIconURL: snapshot.val().thumbIconURL,
                        iconURL: snapshot.val().iconURL
                    }
                    observer.next(data);
                });
                
            });
        }
        
        });
        
    }

}