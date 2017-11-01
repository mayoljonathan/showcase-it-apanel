import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { AppService,UserService,FileService,CacheService } from "../../../shared/services/";
import { HelperUtil,DialogUtil } from "../../../shared/utils/";

@IonicPage()
@Component({
  selector: 'page-request-reject',
  templateUrl: 'request-reject.html',
})
export class RequestRejectPage {

  logInfo: boolean = false;

  app;
  type: string; //publish_requests,content_update_requests
  action:number; //2,3

  // reject_message: string = '';
  reject_reasons: Array<any> = [];

  rejectReasons: Array<any> = [];
  // SelectedReasons
  selectedReasons: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dialogUtil: DialogUtil,
    public appService: AppService,
    public viewCtrl: ViewController,
  ) {
    this.rejectReasons = this.initRejectReasons();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestRejectPage');
    this.app = this.navParams.get('data');
    this.type = this.navParams.get('type');
    this.action = this.navParams.get('action');
    this.logInfo = this.navParams.get('logInfo');
    console.log(this.app);
    console.log('Log info? '+this.logInfo);
    console.log(this.action);
  }

  initRejectReasons(){
    return [
      {name: 'Misrepresentation', message: `App's content are misleading.\n`},
      {name: 'Sexually Explicit Content', message: `App contains or promote sexually explicit content, such as pornography.\n`},
      {name: 'Violence', message: `App shows or facilitate gratuitous violence or other dangerous activities.\n`},
      {name: 'Harrasment', message: `App contain or facilitate threats, harassment, or bullying.\n`},
      {name: 'Hate Speech', message: `App advocate against groups of people based on their race, religion, disability, gender, age, nationality, veteran status, sexual orientation, or gender identity.\n`},
      {name: 'Illegal Activities', message: `App facilitate or promote illegal activities.\n`}
    ]
  }

  selectReasons(){
    let newSelectedReasons = this.initRejectReasons();
    this.dialogUtil.showCheckbox(this.rejectReasons,['Cancel','Done'],'Select Reasons').then((selections:Array<any>)=>{
      this.selectedReasons = [];
      for(let i=0;i < selections.length;i++){
        newSelectedReasons.forEach(r => {
          if(r.name === selections[i]){ 
            r['checked'] = true;
            this.selectedReasons.push(r);
          }
        });
      }
      this.rejectReasons = newSelectedReasons;
    });
  }

  submitReject(){
    if(this.selectedReasons.length != 0){
      let action;
      action = this.action == 3 ? 'reject_remove' : 'reject';
      return new Promise((resolve,reject)=>{
        let buttons = [
          { text: 'No', handler: reject },
          { text: 'Yes', handler: resolve },
        ];
        let msg = 'Once you click YES, publish request will be rejected and we will send an email to the owner of the app. Do you want to continue?';
        if(action == 'reject_remove'){
          msg = 'Once you click YES, publish request will be rejected and the app will be deleted from the applications list of the owner. Furthermore, we will send an email to the owner of the app. Do you want to continue?';
        }
        this.dialogUtil.showConfirm(msg,buttons,'');
      }).then(()=>{
        this.appService.getRequest(this.type,this.app.key).take(1).subscribe(r=>{
          if(r.app_uid){ 
            let mailData = {
              action: action,
              email: this.app.userData.email,
              usersName: this.app.userData.name,
              appTitle: this.app.appData.title,
              reasons: this.selectedReasons,
              requestType: this.type,
            };
            let msg = 'Rejecting the publish request.';
            if(this.type === 'content_update_requests'){ 
              msg = 'Rejecting the content update request.'; 
            }
            this.dialogUtil.showLoader(msg);
            this.appService.managePublishRequest(action,this.app,this.type,mailData).then((res)=>{
              this.dialogUtil.hideLoader();
              if(res){
                this.dismiss();
                let msg = this.type === 'publish_requests' ? 'Publish request rejected successfully ' : 'Content update request rejected successfully ';
                return this.dialogUtil.showToast(msg+'and an email has been sent to the owner.', 4000 , 'bottom');
                // return this.navCtrl.setRoot('RequestTabsPage',{},{
                //   animate: true,
                //   direction: 'backward'
                // });
              }
              this.dialogUtil.showToast('Error in doing the operation.', 3000 , 'bottom');
            },e=>{
              this.dialogUtil.hideLoader();
              this.dialogUtil.showToast(`Error in doing the operation. Error: ${e}`, 3000 , 'bottom');
            });
          }else{
            this.dialogUtil.showToast('Error in doing the operation.', 3000 , 'bottom');
          }
        });
      }).catch(()=>{});
    }
  }

  loadedAdminImg(){
    document.getElementById('admin-img-placeholder').className = '';
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
