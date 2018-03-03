import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";
import { App } from "../../../shared/models/";
import { DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: ':type/:category_uid'})
@Component({
  selector: 'page-filtered-apps',
  templateUrl: 'filtered-apps.html',
})
export class FilteredAppsPage {

  category: any;
  apps: Array<App>;

  alive: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
  ) {
    this.category = this.navParams.get('category');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilteredAppsPage');
    this.appService.getAppsByCategory(this.category.uid)
      .takeWhile(()=> this.alive)
      .subscribe(apps=>{
        if(apps.length != 0){
          apps.forEach((app:App)=>{
            this.userService.getUserData(app['user_uid']).takeWhile(()=> this.alive).subscribe(userData=>{
              app['userName'] = userData.name;
              app['userPhotoURL'] = userData.photoURL;
            });
          });
        }
        this.apps = apps;
      });
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }

  loadedUserPhoto(index){
    document.getElementById('user-img-placeholder-'+index).className = '';
  }
  
  showMoreActions(i){
    
  }


  ngOnDestroy(){
    this.alive = false;
  }

}
