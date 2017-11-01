import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";

import { ObjectToArray } from "../../../shared/pipes/helper/objToArray";
import { Sort } from "../../../shared/pipes/helper/sort";

@IonicPage({segment: 'flag-review'})
@Component({
  selector: 'page-flag-reviews-list',
  templateUrl: 'flag-reviews-list.html',
})
export class FlagReviewsListPage {

  alive: boolean = true;
  flagReviews: Array<any>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public events: Events,
    public userService: UserService,
  ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlagReviewsListPage');
    this.appService.getReportsFromUser('flag_reviews')
      .takeWhile(()=>this.alive)
      .subscribe(appsWithFlagReviews=>{
        console.log(appsWithFlagReviews);
        if(appsWithFlagReviews && appsWithFlagReviews.length > 0){
          let flagReviews = [];
          appsWithFlagReviews.forEach((app,index)=>{
            let app_uid = app.$key;
            let review = new ObjectToArray().transform(app);
            let reviewData = {
              flags: Object.keys(app).length,
              dateLastFlagged: new Sort().transform(review,'dateFlagged','desc')[0]['dateFlagged']
            }; 
            this.appService.getMainAppDetails(app_uid).takeWhile(()=>this.alive).subscribe(appData=>{
              app['appData'] = {};
              app['appData']['title'] = appData['title'];
              app['appData']['thumbIconURL'] = appData['thumbIconURL'];

              this.userService.getUserData(appData['user_uid']).takeWhile(()=>this.alive).subscribe(userData=>{
                app['userData'] = {};
                app['userData']['name'] = userData['name'];
                app['userData']['photoURL'] = userData['photoURL'];

                flagReviews.push({
                  app_uid: app_uid,
                  reviewData: reviewData,
                  appData: app['appData'],
                  userData: app['userData']
                });

                if(appsWithFlagReviews.length === index+1){
                  this.flagReviews = flagReviews;
                  this.events.publish('flag_reviews_count', this.flagReviews.length);
                }
              });
            });
          });
        }else{
          this.flagReviews = appsWithFlagReviews;
        }
      });
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }
  loadedOwnerImg(index){
    document.getElementById('owner-img-placeholder-'+index).className = '';
  }

  navigateToApp(app){
    this.rootNavCtrl.push('MainAppDetailsPage', {app_uid: app.app_uid});
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
