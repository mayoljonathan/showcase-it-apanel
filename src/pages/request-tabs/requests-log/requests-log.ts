import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppService,UserService,AdminService,CacheService } from "../../../shared/services/";

@IonicPage()
@Component({
  selector: 'page-requests-log',
  templateUrl: 'requests-log.html',
})
export class RequestsLogPage {

  alive: boolean = true;
  pageLoaded: boolean = false;
  requests: Array<any>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cacheService: CacheService,
    public appService: AppService,
    public adminService: AdminService,
    public userService: UserService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsLogPage');
    this.getRequestsLog();
  }

  getRequestsLog(){
    this.appService.getRequests('log')
      .takeWhile(()=> this.alive)
      .subscribe((requests:any)=>{ 
        this.requests = requests;
        if(requests.length > 0){
          requests.forEach((request,i)=>{
            this.userService.getUserData(request.user_uid).takeWhile(()=> this.alive).subscribe(userData=>{
              request = Object.assign(request, {userData:userData});
            });
            this.adminService.getAdminData(request.admin_uid).then(adminData=>{
              request = Object.assign(request, {adminData:adminData});
              this.pageLoaded = true;
            });
          });
        }else{
          this.pageLoaded = true;
        }
      });
  }

  loadedAppIcon(index){
    document.getElementById('app-icon-placeholder-'+index).className = '';
  }

  actionStatus(type,status){
    if(type === 'name'){
      if(status === 'approve' || status === 'approve_cu'){
        return 'md-checkmark-circle-outline';
      }else if(status === 'reject'){
        return 'md-close-circle';
      }else{
        return 'md-trash';
      }
    }else{
      if(status === 'approve' || status === 'approve_cu'){
        return 'secondary';
      }else if(status === 'reject'){
        return 'danger';
      }else{
        return 'danger';
      }
    }
  }

  actionName(action){
    if(action === 'approve' || action === 'approve_cu'){
      return 'approved';
    }else if(action === 'reject'){
      return 'rejected';
    }else{
      return 'rejected and removed';
    }
  }


  navigateToRequest(index){
    this.rootNavCtrl.push('DetailedAppPage',{data: this.requests[index], readOnly:'true'});
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
