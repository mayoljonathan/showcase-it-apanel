import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CacheService } from '../../shared/services';
import { HelperUtil } from "../../shared/utils";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  cards: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cacheService: CacheService,
    public helperUtil: HelperUtil,
  ){
    this.cards = [
      {id: 'users'},
      {id: 'highest_rated'},
      {id: 'most_viewed'},
      {id: 'most_downloaded'},
      {id: 'algolia_api'},
      {id: 'algolia_logs'},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  navigateToGenerateReport(){
    this.helperUtil.launchURL('https://mayoljonathan.github.io/ShowcaseIT-Report-Generator');
  }

  ionViewCanEnter(){
    if(!this.cacheService.isLoggedIn){
      return false;
    }
    return true;
  }

}
