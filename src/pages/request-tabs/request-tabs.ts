import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { CacheService } from "../../shared/services/";

@IonicPage({segment: 'requests'})
@Component({
  selector: 'page-request-tabs',
  templateUrl: 'request-tabs.html',
})
export class RequestTabsPage {

  @ViewChild('superTabs') superTabs; 

  tab1 = 'PublishRequestPage';
  tab2 = 'ContentUpdatePage';
  tab3 = 'RequestsLogPage';

  pageLoaded:boolean = false;

  prCount: number = 0; //publish_request
  cuCount: number = 0; //content_update

  constructor(
    public navCtrl: NavController, 
    public cacheService: CacheService,
    public navParams: NavParams,
    public events: Events,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTabsPage');
    this.pageLoaded = true;
    this.events.subscribe('publish_request_count', count => this.prCount = count);
    this.events.subscribe('content_update_request_count', count => this.cuCount = count);
    setTimeout(()=>{
      this.superTabs.enableTabsSwipe(false);
    },250);
  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

  ngOnDestroy(){
    this.events.unsubscribe('publish_request_count');
    this.events.unsubscribe('content_update_request_count');
  }
}
