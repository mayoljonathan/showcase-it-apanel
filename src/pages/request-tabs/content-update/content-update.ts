import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";

@IonicPage({segment: 'content-update'})
@Component({
  selector: 'page-content-update',
  templateUrl: 'content-update.html',
})
export class ContentUpdatePage {

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
    console.log('ionViewDidLoad ContentUpdatePage');
    this.getPublishRequests();
  }

  getPublishRequests(){
    this.appService.getRequests('content_update_requests')
      .takeWhile(()=> this.alive)
      .subscribe((requests:any)=>{ 

        console.log('REQUESTS')
        console.log(requests);

        requests.forEach((request,i)=>{
          this.appService.getAppData(request.app_uid,request.user_uid).takeWhile(()=> this.alive).subscribe(appData=>{
            console.log('DONE GET APP DATA');
            console.log(appData);
            this.appService.getCategoryData(appData.type,appData.category).takeWhile(()=> this.alive).subscribe(category=>{
              appData['category_name'] = category.name || '-';
              request = Object.assign(request, {appData:appData});
            });
          });
          this.userService.getUserData(request.user_uid).takeWhile(()=> this.alive).subscribe(userData=>{
            request = Object.assign(request, {userData:userData});
          });
        });
        this.requests = requests;
        console.log('ALL REQ');
        console.log(this.requests);

        this.events.publish('content_update_request_count', this.requests.length);
      });
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }
  loadedOwnerImg(index){
    document.getElementById('owner-img-placeholder-'+index).className = '';
  }

  navigateToRequest(index){
    this.rootNavCtrl.push('DetailedAppPage',{data: this.requests[index], type: 'content_update_requests', viewingNewData: true, readOnly:'false'});
    // this.rootNavCtrl.setRoot('DetailedAppPage',{request:request,app_uid:request.app_uid}, {
    //   animate: true,
    //   direction: 'forward'
    // });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
