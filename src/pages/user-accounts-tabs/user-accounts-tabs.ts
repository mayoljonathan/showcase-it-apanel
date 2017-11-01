import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CacheService } from "../../shared/services/";

@IonicPage({segment: 'user-accounts'})
@Component({
  selector: 'page-user-accounts-tabs',
  templateUrl: 'user-accounts-tabs.html',
})
export class UserAccountsTabsPage {

  @ViewChild('superTabs') superTabs; 

  tab1 = 'UsersListPage';
  tab2 = 'AdministratorsListPage';

  pageLoaded:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public cacheService: CacheService,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountsTabsPage');
    this.pageLoaded = true;
    setTimeout(()=>{
      this.superTabs.enableTabsSwipe(false);
    },250);
  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

}
