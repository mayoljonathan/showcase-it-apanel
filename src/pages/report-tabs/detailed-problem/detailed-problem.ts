import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";
import { DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: 'problem/:uid'})
@Component({
  selector: 'page-detailed-problem',
  templateUrl: 'detailed-problem.html',
})
export class DetailedProblemPage {

  problem_uid: string;
  problem = {
    email: null,
    problem: null,
  };

  alive = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public dialogUtil: DialogUtil,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedProblemPage');
    this.problem_uid = this.navParams.get('uid');
    if(!this.problem_uid){ this.goBack(); }
    this.appService.getReportedProblem(this.problem_uid)
      .takeWhile(()=>this.alive)
      .subscribe(problemData=>{
        if(problemData['problem']){
          this.problem = problemData;
        }else{
          this.goBack();
        }
      });
  }

  emailUser(){
    window.open('mailto:'+this.problem.email);
    return false;
  }
  deleteProblem(){
    new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      this.dialogUtil.showConfirm('Are you sure to delete this problem? This action cannot be undone.', buttons,'');
    }).then(()=>{
      this.dialogUtil.showLoader('Deleting problem.');
      this.appService.removeReportProblem(this.problem_uid).then(()=>{
        this.dialogUtil.showToast('Success in doing the operation.', 3000, 'bottom');
        this.dialogUtil.hideLoader();
      },e=>{
        this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 4000, 'bottom');
        this.dialogUtil.hideLoader();
      });
    },()=>{});
  }

  goBack(){
    this.navCtrl.pop();
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
