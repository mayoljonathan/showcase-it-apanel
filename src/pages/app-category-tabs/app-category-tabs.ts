import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CacheService } from "../../shared/services/";

@IonicPage({segment: 'app-categories'})
@Component({
  selector: 'page-app-category-tabs',
  templateUrl: 'app-category-tabs.html',
})
export class AppCategoryTabsPage {

  @ViewChild('superTabs') superTabs; 

  tab1 = 'ApplicationsCatListPage';
  tab2 = 'GamesCatListPage';

  pageLoaded:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public cacheService: CacheService,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppCategoryTabsPage');
    this.pageLoaded = true;
    setTimeout(()=>{
      this.superTabs.enableTabsSwipe(false);
    },250);
  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

}
