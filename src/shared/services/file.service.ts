import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';

import { PlatformUtil } from "../utils";

// Services
import { CacheService } from './';
// Models
import { App } from "../models"; 

@Injectable()
export class FileService {

    constructor(
        // public afAuth: AngularFireAuth,
        // public afDB: AngularFireDatabase,
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
    ){

    }
    
    downloadFile(url){
        // url = url.replace(/^http\:\/\//, '')
                //  .replace(/^https\:\/\//, '') // remove the leading https://
        url = decodeURIComponent(url);
        if(this.platformUtil.checkPlatform() === 'browser'){
            console.log('Downloading using native downloader in browser');
            window.open(url, '_self');
        }else if(this.platformUtil.checkPlatform() === 'android'){
            console.log('Downloading using native downloader in android OS');
        }
    }

}