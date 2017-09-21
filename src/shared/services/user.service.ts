import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Events,MenuController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
// import { Network } from '@ionic-native/network';

import { PlatformUtil,DialogUtil } from "../utils";

// Services
import { CacheService } from './';
// Models
import { User } from "../models"; 

@Injectable()
export class UserService {

    user: User;

    constructor(
        // public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        // public fb: Facebook,
        // public network: Network,
        public dialogUtil: DialogUtil,
        public menuCtrl: MenuController,
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
    ){

    }

    getUsers(type){
        if(type === 'all'){
            return this.afDB.list(`users/user_data`);
        }else if(type === 'online_users'){
            return this.afDB.list(`_server/user_presence/`);
        }
    }
    
    getUserData(user_uid){
        return this.afDB.object(`users/user_data/${user_uid}`);
    }

}