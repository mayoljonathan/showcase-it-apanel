import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

@IonicPage({segment: 'requests'})
@Component({
  selector: 'page-request-tabs',
  templateUrl: 'request-tabs.html',
})
export class RequestTabsPage {

  @ViewChild('superTabs') superTabs; 

  tab1 = 'PublishRequestPage';
  tab2 = 'ContentUpdatePage';

  prCount: number = 0; //publish_request
  cuCount: number = 0; //content_update

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
  ) {
  }

  ionViewDidLoad() {
    this.superTabs.enableTabsSwipe(false);
    console.log('ionViewDidLoad RequestTabsPage');

    this.events.subscribe('publish_request_count', count => this.prCount = count);
    this.events.subscribe('content_update_request_count', count => this.cuCount = count);
  }

  ngOnDestroy(){
    this.events.unsubscribe('publish_request_count');
    this.events.unsubscribe('content_update_request_count');
  }

}
