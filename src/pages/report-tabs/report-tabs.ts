import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { CacheService } from "../../shared/services/";

@IonicPage({segment: 'user-reports'})
@Component({
  selector: 'page-report-tabs',
  templateUrl: 'report-tabs.html',
})
export class ReportTabsPage {

  @ViewChild('superTabs') superTabs; 

  tab1 = 'FlagReviewsListPage';
  tab2 = 'ProblemsListPage';

  pageLoaded:boolean = false;

  frCount: number = 0; //publish_request
  rpCount: number = 0; //content_update

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cacheService: CacheService,
    public events: Events,
  ) {
  }

  ionViewDidLoad() {
    this.pageLoaded = true;
    this.events.subscribe('flag_reviews_count', count => this.frCount = count);
    this.events.subscribe('reported_problems_count', count => this.rpCount = count);
    setTimeout(()=>{
      this.superTabs.enableTabsSwipe(false);
    },250);
  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

  ngOnDestroy(){
    this.events.unsubscribe('flag_reviews_count');
    this.events.unsubscribe('reported_problems_count');
  }
}
