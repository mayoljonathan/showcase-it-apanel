import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController,ModalController } from 'ionic-angular';

import { AppService,AdminService,UserService,CacheService } from "../../../shared/services/";
import { DialogUtil } from '../../../shared/utils';
import { Admin } from '../../../shared/models';

@IonicPage({segment: 'admins-list'})
@Component({
  selector: 'page-administrators-list',
  templateUrl: 'administrators-list.html',
})
export class AdministratorsListPage {

  alive: boolean = true;
  admins: Array<Admin>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public appService: AppService,
    public dialogUtil: DialogUtil,
    public adminService: AdminService,
    public userService: UserService,
    public cacheService: CacheService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministratorsListPage');
    this.getAdmins();
  }

  getAdmins(){
    this.adminService.getAdmins()
      .takeWhile(()=> this.alive)
      .subscribe((admins:any)=>{

        if(admins.length != 0){
          admins.forEach((admin:Admin)=>{
            this.adminService.getAdminPresence(admin.uid).takeWhile(()=> this.alive).subscribe(online=>{
              //returns online.$value = true if its online, else an epoch time
              admin['lastSeen'] = online.$value;
            });
          });
        }

        this.admins = admins;
      });
  }

  showMoreActions(a){
    new Promise(resolve=>{
      let emailHandler = function(){ resolve('email'); }
      let activateHandler = function(){ resolve('active'); }
      let disableHandler = function(){ resolve('disabled'); }
      let setAsSuperAdmin = function(){ resolve('setSuper'); }
      let removeAsSuperAdmin = function(){ resolve('removeSuper'); }

      let buttons = [
        { text: 'Write an email', handler: emailHandler },
        { text: 'Activate administrator', handler: activateHandler },
        { text: 'Disable administrator', role: 'destructive', handler: disableHandler },
        { text: 'Set as Super Admin', handler: setAsSuperAdmin },
        { text: 'Remove as Super Admin', role: 'destructive', handler: removeAsSuperAdmin },
      ];
      if(!this.cacheService.isSuperAdmin){
        buttons.splice(1,buttons.length);
      }else{
        if(a.status === 'active'){
          let index = buttons.findIndex(b => b.handler == activateHandler);
          buttons.splice(index,1);
        }else if(a.status === 'disabled' || a.status !== 'active'){
          let index = buttons.findIndex(b => b.handler == disableHandler);
          buttons.splice(index,1);
        }

        if(a.isSuperAdmin){
          let index = buttons.findIndex(b => b.handler == setAsSuperAdmin);
          buttons.splice(index,1);
        }else{
          let index = buttons.findIndex(b => b.handler == removeAsSuperAdmin);
          buttons.splice(index,1);
        }
      }
      this.dialogUtil.showActionSheet(null,buttons,`${a.name} <${a.email}>`);
    }).then(result=>{
      if(result == 'email'){
        window.open('mailto:'+a.email);
        return false;
      }else if(result == 'active' || result == 'disabled'){
        let confirmActionName = 'activate';
        let loaderActionName = 'Activating';
        if(result === 'disabled'){
          confirmActionName = 'disable';
          loaderActionName = 'Disabling';
        }
        new Promise((resolve,reject)=>{
          let buttons = [
            { text: 'No', handler: reject },
            { text: 'Yes', handler: resolve },
          ];
          let msg = `Are you sure to ${confirmActionName} this administrator? The administrator will be logout automatically and will not be able login.`;
          if(result === 'active'){
            msg = `Are you sure to ${confirmActionName} this administrator? The administrator can now login normally.`;
          }
          this.dialogUtil.showConfirm(msg,buttons,'');
        }).then(()=>{
          this.dialogUtil.showLoader(`${loaderActionName} administrator.`);
          this.adminService.setAdminStatus(a.uid, result).then(()=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
          },e=>{
            this.dialogUtil.hideLoader();
            this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
          });
        }).catch(()=>{});
      }else if(result == 'setSuper' || result == 'removeSuper'){
        let confirmActionName = 'set as';
        let loaderActionName = 'Setting as';
        let isSuperAdmin = true;
        if(result === 'removeSuper'){
          confirmActionName = 'remove as';
          loaderActionName = 'Removing';
          isSuperAdmin = false;
        }
        new Promise((resolve,reject)=>{
          let buttons = [
            { text: 'No', handler: reject },
            { text: 'Yes', handler: resolve },
          ];
          let msg = `Are you sure to ${confirmActionName} Super Admin this administrator? The administrator will be having new roles such as managing other administrator and can access the maintenance of the system.`;
          if(result === 'removeSuper'){
            msg = `Are you sure to ${confirmActionName} Super Admin this administrator? The administrator will no longer to manage other administrator and can access the maintenance of the system.`;
          }
          this.dialogUtil.showConfirm(msg,buttons,'');
        }).then(()=>{
          this.dialogUtil.showLoader(`${loaderActionName} Super Admin.`);
          this.adminService.setAdminRole(a.uid, isSuperAdmin).then(()=>{
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

  loadedAdminPhoto(index){
    document.getElementById('admin-img-placeholder-'+index).className = '';
  }
  
  addAdministrator(){
    const modal = this.modalCtrl.create('AddAdministratorPage');
    return modal.present();
  }

  // navigateToAdmin(admin){
  //   if(this.cacheService.isSuperAdmin){
  //     this.rootNavCtrl.push('UserProfilePage',{uid: admin.uid, isAdmin: true});
  //   }
  // }

  ngOnDestroy(){
    this.alive = false;
  }

}
