import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { PlatformUtil } from "../utils";

// Services
import { CacheService } from './';
// Models
import { App } from "../models"; 

@Injectable()
export class FileService {

    storageRef;
    // public uploadTasks = [];

    constructor(
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
    ){
        this.storageRef = firebase.storage().ref();
    }
    
    downloadFile(url){
        // url = url.replace(/^http\:\/\//, '')
                //  .replace(/^https\:\/\//, '') // remove the leading https://
        // url = decodeURIComponent(url);
        if(this.platformUtil.checkPlatform() === 'browser'){
            console.log('Downloading using native downloader in browser');
            window.open(url, '_self');
        }else if(this.platformUtil.checkPlatform() === 'android'){
            console.log('Downloading using native downloader in android OS');
        }
    }

    uploadFile(taskType,remotePath,localPath,filename?,args?:any){
        var uploadTask = this.storageRef.child(`${remotePath}/${filename}`).putString(localPath, 'data_url');

        return new Observable(observer=>{
            uploadTask.on('state_changed', (snapshot:any)=>{
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                observer.next({
                    progress: Math.round(progress),
                    transferred: snapshot.bytesTransferred
                });
            },(error)=>{
                observer.next({error: error});
            },():any=>{
                var downloadURL = uploadTask.snapshot.downloadURL;
                observer.next({downloadURL: downloadURL});
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
    }

    getThumbUrl(path,filename) : Promise<any>{
        return new Promise((resolve,reject)=>{
            let counter = 0;
            let urlListener = setInterval(()=>{
                this.storageRef.child(`${path}/${filename}`).getDownloadURL().then(url=>{
                    clearInterval(urlListener);
                    resolve(url);
                }).catch(err=>{
                    counter++;
                    if(counter == 60){
                        clearInterval(urlListener);
                        return reject();
                    }
                });
            },1000);
        });
    }

}