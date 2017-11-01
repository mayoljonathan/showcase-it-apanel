import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
// import { Network } from '@ionic-native/network';

import { PlatformUtil,DialogUtil } from "../utils";

// Services
import { CacheService,MailService } from './';
// Models
import { Admin } from "../models"; 

import * as request from 'request';
import * as algolia from 'algoliasearch';
import * as queryString from 'query-string';

@Injectable()
export class AdminService {

    appFirstLoaded: boolean = false;
    algolia = algolia("XGEVJWSCYP", "013e7ff8361fd5806238412d8c1f2bb8", {protocol: 'https:'});

    constructor(
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        public dialogUtil: DialogUtil,
        public platformUtil: PlatformUtil,
        public cacheService: CacheService,
        public mailService: MailService,
    ){

    }

    watchAdminStatus(){
        return this.afDB.object(`_admin/${this.cacheService.admin_uid}/status`);
    }
    watchAdminRole(){
        return this.afDB.object(`_admin/${this.cacheService.admin_uid}/isSuperAdmin`);
    }

    sendPasswordReset(email){
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    signInWithEmail(admin:Admin){
        return this.afAuth.auth.signInWithEmailAndPassword(admin.email,admin.password);
    }

    updatePassword(password){
        return this.afAuth.auth.currentUser.updatePassword(password);
    }

    reauthenticateUser(password){
        const email = this.afAuth.auth.currentUser.email;
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this.afAuth.auth.currentUser.reauthenticateWithCredential(credential);
    }

    signOut(){
        if(this.cacheService.admin_uid){
            let userRef = firebase.database().ref(`_server/admin_presence/${this.cacheService.admin_uid}`);
            userRef.set(firebase.database.ServerValue.TIMESTAMP);
        }
        this.cacheService.admin_uid = '';
        this.cacheService.admin_status = '';
        this.cacheService.isSuperAdmin = false;
        this.cacheService.isSignInPage = true;
        // this.menuCtrl.enable(false);
        return this.afAuth.auth.signOut();
    }

    updateProfile(admin_uid,data){
        return this.afDB.object(`_admin/${admin_uid}`).update(data);
    }


    getAdminData(admin_uid){
        // query once
        return firebase.database().ref(`_admin/${admin_uid}`).once('value').then(snapshot=>{
            return snapshot.val();
        });
        // return this.afDB.object(`_admin/${admin_uid}`).take(1);
    }
    _getAdminData(admin_uid){
        return this.afDB.object(`_admin/${admin_uid}`);
    }
    
    getAdmins(){
        return this.afDB.list(`_admin`);
    }

    setOnlineState(){
        let imOnline = firebase.database().ref('.info/connected');
        let userRef = firebase.database().ref(`_server/admin_presence/${this.cacheService.admin_uid}`);
        imOnline.on('value', (snapshot) => {
            this.cacheService.isConnected = snapshot.val();
            if(this.appFirstLoaded && this.cacheService.isConnected){
                this.dialogUtil.showToast('You are now connected.',4000,'bottom');
            }
            if(!this.cacheService.isConnected){
                this.dialogUtil.showToast('You are not connected to the server right now.',4000,'bottom');
            }
            if(!this.appFirstLoaded){ this.appFirstLoaded = true }
            console.log('Online status: '+this.cacheService.isConnected);
            if (snapshot.val()) {
                userRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                userRef.set(true);
            }
        });
    }

    checkEmailIfExists(email){
        var checkInAdmin = () =>{
            return this.afDB.list(`_admin/`, {
                query: {
                    orderByChild: 'email',
                    equalTo: email.toLowerCase(),
                }
            }).take(1);
        }
        var checkInUser = () =>{
            return this.afDB.list(`users/user_data/`, {
                query: {
                    orderByChild: 'email',
                    equalTo: email.toLowerCase(),
                }
            }).take(1);
        }

        return new Promise(resolve=>{
            checkInAdmin().subscribe(adminRes=>{
                if(adminRes.length == 0){
                    checkInUser().subscribe(userRes=>{
                        userRes.length == 0 ? resolve({exists: false}) : resolve({exists: true})
                    });
                }else{
                    resolve({exists:true});
                }
            });
        });

    }   

    addAdministrator(data){
        data = encodeURIComponent(JSON.stringify(data));
        console.log(data);
        let url = `https://us-central1-showcase-it.cloudfunctions.net/addAdministrator?apiKey=${CacheService.apiKey}&data=${data}`;
        // let url = `http://localhost:5000/showcase-it/us-central1/addAdministrator?apiKey=${CacheService.apiKey}&data=${data}`;
        return new Promise((resolve,reject)=>{
            request(url , { json: true }, (err, res, body) => {
                console.log('HERE');
                console.log(err);
                console.log(res);
                console.log(body);

                if (err) { return reject(err); }
                if(res.statusCode === 200 || body.code === 250){
                    resolve();
                }else{
                    reject('Request failed.');
                }
            });
        });
    }
    
    getAdminPresence(admin_uid){
        return this.afDB.object(`_server/admin_presence/${admin_uid}`);
    }

    setAdminStatus(admin_uid,status){
        return this.afDB.object(`_admin/${admin_uid}`).update({status:status});
    }
    setAdminRole(admin_uid,isSuperAdmin){
        return this.afDB.object(`_admin/${admin_uid}`).update({isSuperAdmin:isSuperAdmin});
    }

    getProjectStatus(){
        return this.afDB.object(`_project/isAvailable`);
    }
    toggleProjectStatus(state){
        return this.afDB.object(`_project/`).update({
            isAvailable: state,
        })
    }

    getOnlineAccounts(type){
        return this.afDB.list(`_server/${type}_presence/`);
    }

    getFirebaseToAlgoliaLatestSync(type){
        return this.afDB.object(`_server/${type}`);
    }

    getAlgoliaLogs(type,length=50){
        return this.algolia.getLogs({
            offset: 0, // where to start from, default to 0
            length: length, // how much lines do you want, default to 10
            type: type // which logs do you want, default to no value (all)
        }).then(result=>{
            result = result.logs;
            if(result && result.length > 0){
                let container = [];
                result.forEach(data=>{
                    // let d =     queryString.parse(data.url);
                    let url = data.url;
                    let res = url.startsWith('/1/indexes/applications/query');
                    if(res){
                        let parsed = queryString.parse(data.query_params);
                        let timestamp = <any>new Date(data.timestamp);
                        timestamp = timestamp.getTime();
                        let newData = {
                            query: parsed.query,
                            timestamp: timestamp
                        }
                        container.push(newData);
                    }
                });
                return container;
            }else{
                return [];
            }
        })
    }

    // getAlgoliaRanking(){
    //     // let index = this.algolia.initIndex('applications');
    //     // index.setSettings({
    //     //     ranking: [
    //     //         'typo',
    //     //         'geo',
    //     //         'words',
    //     //         'filters',
    //     //         'proximity',
    //     //         'attribute',
    //     //         'exact',
    //     //         'custom'
    //     //     ],
    //     //     customRanking: [
    //     //         'desc(title)'
    //     //     ]
    //     // }).then(()=>{
    //     //     index.search({
    //     //         hitsPerPage: 50,
    //     //         attributesToRetrieve: ["*"],
    //     //         getRankingInfo: true
    //     //     }).then(res=>{
    //     //         console.log(res);
    //     //     });
    //     // });
    // }

}