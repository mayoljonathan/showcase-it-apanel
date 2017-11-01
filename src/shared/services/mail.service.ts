import { Injectable,Injector } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { PlatformUtil,DialogUtil } from "../utils";

// Services
import { CacheService } from './';
// Models
import * as request from 'request';

@Injectable()
export class MailService {

    private mailService:MailService;

    constructor(
        public afDB: AngularFireDatabase,
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
        private injector:Injector,
    ){
        setTimeout(()=>{ this.mailService = injector.get(MailService) });
    }

    sendRequestEmail(type,mailData){
        console.log(mailData);
        mailData = encodeURIComponent(JSON.stringify(mailData));
        console.log(mailData);
        let url = `https://us-central1-showcase-it.cloudfunctions.net/sendRequestEmail?apiKey=${CacheService.apiKey}&data=${mailData}`;
        // let url = `http://localhost:5000/showcase-it/us-central1/sendRequestEmail?apiKey=${CacheService.apiKey}&data=${mailData}`;
        return new Promise((resolve,reject)=>{
            request(url , { json: true }, (err, res, body) => {
                if (err) { return reject(err); }
                if(res.statusCode === 200 || body.code === 250){
                    resolve('Email sent to the owner');
                }else{
                    reject('Email not sent to the owner');
                }
            });
        });
    }

    // sendWelcomeMail(email,type){
    //     let url = `https://us-central1-showcase-it.cloudfunctions.net/sendWelcomeEmail?apiKey=${CacheService.apiKey}&email=${email.toLowerCase()}`;
    //     return new Promise((resolve,reject)=>{
    //         request(url , { json: true }, (err, res, body) => {
    //             if (err) { return reject(err); }
    //             if(res.statusCode === 200 || body.code === 250){
    //                 resolve('Welcome mail sent to the recipient');
    //             }else{
    //                 reject('Welcome mail not sent to the reciepent');
    //             }
    //         });
    //     });
    // }

}