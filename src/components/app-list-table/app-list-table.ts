import { Component,Input } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { AppService,UserService } from "../../shared/services/";
import { App } from '../../shared/models';
import { DialogUtil } from '../../shared/utils';

@Component({
  selector: 'app-list-table',
  templateUrl: 'app-list-table.html'
})
export class AppListTableComponent {

  @Input('apps') apps:Array<App>;
  @Input('hideCategory') hideCategory;
  @Input('hideOwner') hideOwner;
  @Input('hideAppCount') hideAppCount;
  @Input('fullWidth') fullWidth;
  @Input('noPadding') noPadding;

  alive: boolean = true;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public dialogUtil: DialogUtil,
    public userService: UserService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    console.log('HERE AT APPLIST');
    console.log(this.apps);
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }

  loadedOwnerImg(index){
    document.getElementById('owner-img-placeholder-'+index).className = '';
  }
  
  showMoreActions(app){
    console.log(app);
    new Promise(resolve=>{
      let disableAppHandler = function(){ resolve('disable'); }
      let enableAppHandler = function(){ resolve('enable'); }
      let deleteAppHandler = function(){ resolve('delete'); }

      let buttons = [
        { text: 'Disable the app', handler: disableAppHandler },
        { text: 'Enable the app', handler: enableAppHandler },
        { text: 'Delete the app', role: 'destructive', handler: deleteAppHandler },
      ];
        if(app.disabledByAdminUid){
          let index = buttons.findIndex(b => b.handler == disableAppHandler);
          buttons.splice(index,1);
        }else{
          let index = buttons.findIndex(b => b.handler == enableAppHandler);
          buttons.splice(index,1);
        }
      this.dialogUtil.showActionSheet(null,buttons,`${app.title}`);
    }).then(result=>{
      if(result == 'enable' || result == 'disable'){
        let confirmActionName = 'enable';
        let loaderActionName = 'Enabling';
        let state = true;
        if(result === 'disable'){
          state = false;
          confirmActionName = 'disable';
          loaderActionName = 'Disabling';
        }
        new Promise((resolve,reject)=>{
          let buttons = [
            { text: 'No', handler: reject },
            { text: 'Yes', handler: resolve },
          ];
          let msg = `Are you sure to ${confirmActionName} this app? The app will operate normally and will be seen on ShowcaseIT.`;
          if(result === 'disable'){
            msg = `Are you sure to ${confirmActionName} this app? The app will be hidden in ShowcaseIT, and the developer of this app cannot send a content update request in this app. Continue?`;
          }
          this.dialogUtil.showConfirm(msg,buttons,'');
        }).then(()=>{
          this.dialogUtil.showLoader(`${loaderActionName} app.`);
          this.appService.doAdminDisableApp(app.uid,app.user_uid,state).then(()=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
          });
        }).catch(()=>{});
      }else if(result == 'delete'){
        new Promise((resolve,reject)=>{
          let buttons = [
            { text: 'No', handler: reject },
            { text: 'Yes', handler: resolve },
          ];
          this.dialogUtil.showConfirm('Are you sure to delete the app? Both the development app and the app listed in ShowcaseIT will be removed. This action cannot be undone.',buttons,'');
        }).then(()=>{
          this.dialogUtil.showLoader(`Deleting app`);
          this.appService.deleteApp(app.uid,app.user_uid).then(()=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
          });
        }).catch(()=>{});
      }
    });
  }

  navigateToApp(app){
    this.navCtrl.push('MainAppDetailsPage', {app_uid: app.uid});
    // this.rootNavCtrl.push('DetailedAppPage',{data: this.requests[index], readOnly:'false'});
    // this.rootNavCtrl.setRoot('DetailedAppPage',{request:request,app_uid:request.app_uid}, {
    //   animate: true,
    //   direction: 'forward'
    // });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
