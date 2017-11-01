import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AppService,UserService } from "../../shared/services/";
import { App } from '../../shared/models';

@IonicPage({segment: 'apps-list'})
@Component({
  selector: 'page-apps-list',
  templateUrl: 'apps-list.html',
})
export class AppsListPage {

  alive: boolean = true;
  apps: Array<App>;

  // rootNavCtrl: NavController;

  constructor(
    // public navCtrl: NavController,
    // public viewCtrl: ViewController,
    // public events: Events,
    // public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
  ){
    // this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppsListPage');
    this.getApps();
  }

  getApps(){
    this.appService.getAllApps()
      .takeWhile(()=> this.alive)
      .subscribe((apps:any)=>{
        console.log(apps);
        if(apps.length != 0){
          apps.forEach((app:App)=>{
            this.appService.getCategoryData(app.type,app.category).takeWhile(()=> this.alive).subscribe(category=>{
              app['category_name'] = category.name || '-';
            });
            this.userService.getUserData(app['user_uid']).takeWhile(()=> this.alive).subscribe(userData=>{
              app['userName'] = userData.name;
              app['userPhotoURL'] = userData.photoURL;
            });
          });
        }
        this.apps = apps;
      });
  }

  // loadedAppIcon(index){
  //   document.getElementById('app-icon-placeholder-'+index).className = '';
  // }

  // loadedUserPhoto(index){
  //   document.getElementById('user-img-placeholder-'+index).className = '';
  // }
  
  // showMoreActions(i){
    
  // }

  // navigateToApp(index){
  //   // this.rootNavCtrl.push('DetailedAppPage',{data: this.requests[index], readOnly:'false'});
  //   // this.rootNavCtrl.setRoot('DetailedAppPage',{request:request,app_uid:request.app_uid}, {
  //   //   animate: true,
  //   //   direction: 'forward'
  //   // });
  // }

  ngOnDestroy(){
    this.alive = false;
  }

}
