import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';

import { PlatformUtil,DialogUtil,HelperUtil } from "../utils";

// Services
import { CacheService,UserService } from './';
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


    getAppData(app_uid,user_uid){
        return this.afDB.object(`users/developer_data/${user_uid}/user_personal_apps/${app_uid}`);
    }
    _getAppData(app_uid,user_uid){
        return firebase.database().ref(`users/developer_data/${user_uid}/user_personal_apps/${app_uid}`);
    }


    // Removing file in the publish request/content_update
    removeFile(type,app,args?){
        console.log(app);
        if(type === 'remove_os_archive'){
            let data = {};
            let root = `users/developer_data/${app.user_uid}/user_personal_apps/${app.app_uid}/`;
            data[root+`openSource/sourceCodeDownloadURL`] = null;
            data[root+`openSource/sourceCodeFilename`] = null;
            data[root+`openSource/sourceCodeFilesize`] = null;
            data[root+`openSource/dateCreated`] = null;
            return this.afDB.object('/').update(data);
        }
    }


}