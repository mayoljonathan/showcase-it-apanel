import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";

@IonicPage({segment: 'publish'})
@Component({
  selector: 'page-publish-request',
  templateUrl: 'publish-request.html',
})
export class PublishRequestPage {

  alive: boolean = true;
  requests: Array<any>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public events: Events,
    public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishRequestPage');
    this.getPublishRequests();
  }

  getPublishRequests(){
    this.appService.getRequests('publish_requests')
      .takeWhile(()=> this.alive)
      .subscribe((requests:any)=>{ 
        requests.forEach((request,i)=>{
          this.appService.getAppData(request.app_uid,request.user_uid).takeWhile(()=> this.alive).subscribe(appData=>{
            request = Object.assign(request, {appData:appData});
          });
          this.userService.getUserData(request.user_uid).takeWhile(()=> this.alive).subscribe(userData=>{
            request = Object.assign(request, {userData:userData});
          });
        });
        this.requests = requests;
        this.events.publish('publish_request_count', this.requests.length);
      });
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }

  navigateToRequest(index){
    this.rootNavCtrl.push('DetailedAppPage',this.requests[index]);
    // this.rootNavCtrl.setRoot('DetailedAppPage',{request:request,app_uid:request.app_uid}, {
    //   animate: true,
    //   direction: 'forward'
    // });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
