import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { App } from '../../../shared/models';
import { AppService,FileService } from '../../../shared/services';

import { DialogUtil } from '../../../shared/utils';

@IonicPage()
@Component({
  selector: 'page-apk-details',
  templateUrl: 'apk-details.html',
})
export class ApkDetailsPage {

  app: App;
  permissionExpanded: boolean = false;
  screenExpanded: boolean = false;
  supportsScreens = [];

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public appService: AppService,
    public dialogUtil: DialogUtil,
    public fileService: FileService,
    public navParams: NavParams
  ) {
    this.app = new App();
  }

  get supportScreensLength(){
    return Object.keys(this.app.platforms.android.releases[0].supportsScreens).length;
  }

  ionViewDidLoad() {
    this.app.platforms.android.releases[0] = {};
    this.app.uid = this.navParams.get('app_uid');
    this.app.platforms.android.releases[0] = this.navParams.get('app_release');
  }

  downloadApk(url){
    this.fileService.downloadFile(url);
  }

  supportsScreenExpand(){
    this.screenExpanded = !this.screenExpanded;
    
    if(this.app.platforms.android.releases[0].supportsScreens && this.supportsScreens.length == 0){
      Object.keys(this.app.platforms.android.releases[0].supportsScreens).map(key=>{
        let value = this.app.platforms.android.releases[0].supportsScreens[key];

        let size = key.split('Screens');
        key = size[0];
        key += " screen";

        this.supportsScreens.push({key: key, value: value});
      });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
