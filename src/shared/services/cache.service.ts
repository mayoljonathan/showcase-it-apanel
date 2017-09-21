import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

@Injectable()
export class CacheService {
    admin_uid: string = '';
    admin_status: string = '';

    // appLoadedOnce: boolean = false;
    isDoneCheckingAdminData: boolean = false;
    isConnected: boolean = false;

    isSignInPage: boolean = true;

    constructor(
        // public afAuth: AngularFireAuth,
        // public afDB: AngularFireDatabase,
        public storage: Storage
    ){

    }

    get isLoggedIn(): any {
        return !!this.admin_uid && this.admin_status === 'active';
    }

    getStorage(key){
        return this.storage.get(key);
    }

    setStorage(key,value){
        return this.storage.set(key,value);
    }

    removeStorage(key){
        return this.storage.remove(key);
    }
}