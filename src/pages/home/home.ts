import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Admin } from "../../shared/models/";

import { CacheService } from "../../shared/services/";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public cacheService: CacheService,
  ) {

  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

}
