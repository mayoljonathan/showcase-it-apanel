import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Admin } from "../../shared/models/";
import { AdminService,CacheService } from "../../shared/services/";
import { DialogUtil } from "../../shared/utils/";

@IonicPage({segment: 'maintenance'})
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html',
})
export class MaintenancePage {

  available: null;

  alive: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public adminService: AdminService,
    public dialogUtil: DialogUtil,
  ) {
  }

  ionViewDidLoad() {
    this.adminService.getProjectStatus()
      .takeWhile(()=> this.alive)
      .subscribe(status=>{
        this.available = status.$value;
      });
  }

  getProjectColor(){
    if(this.available){
      return 'available';
    }else{
      return 'unavailable';
    }
  }

  toggleStatus(available){
    available = !available;
    new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      let msg = `Are you sure to disable Showcase It? User's won't be able to access the web app.`;
      if(available){
        msg = `Are you sure to enable Showcase It? User's will be able to access the web app normally.`;
      }
      this.dialogUtil.showConfirm(msg, buttons,'');
    }).then(()=>{
      this.dialogUtil.showLoader('Doing the operation.');
      this.adminService.toggleProjectStatus(available).then(()=>{
        this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
        this.dialogUtil.hideLoader();
      },e=>{
        this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
        this.dialogUtil.hideLoader();
      });
    },()=>{});
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
