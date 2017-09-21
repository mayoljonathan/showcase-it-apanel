import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Events,MenuController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
// import { Network } from '@ionic-native/network';

import { PlatformUtil,DialogUtil } from "../utils";

// Services
import { CacheService } from './';
// Models
import { Admin } from "../models"; 

@Injectable()
export class AdminService {

    constructor(
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        // public fb: Facebook,
        // public network: Network,
        public dialogUtil: DialogUtil,
        public menuCtrl: MenuController,
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
    ){

    }

    watchAdminStatus(){
        return this.afDB.object(`_admin/${this.cacheService.admin_uid}/status`);
    }

    sendPasswordReset(email){
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    signInWithEmail(admin:Admin){
        return this.afAuth.auth.signInWithEmailAndPassword(admin.email,admin.password);
    }

    signOut(){
        this.cacheService.admin_uid = '';
        this.cacheService.admin_status = '';
        this.cacheService.isSignInPage = true;
        // this.menuCtrl.enable(false);
        return this.afAuth.auth.signOut();
    }


    getAdminData(admin_uid){
        // query once
        return firebase.database().ref(`_admin/${admin_uid}`).once('value').then(snapshot=>{
            return snapshot.val();
        });
        // return this.afDB.object(`_admin/${admin_uid}`).take(1);
    }

}