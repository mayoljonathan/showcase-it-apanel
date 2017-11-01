import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";
import { DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: 'reported-problems'})
@Component({
  selector: 'page-problems-list',
  templateUrl: 'problems-list.html',
})
export class ProblemsListPage {

  alive: boolean = true;
  problems: Array<any>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
    public dialogUtil: DialogUtil,
    public events: Events,
  ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    this.appService.getReportsFromUser('problem')
      .takeWhile(()=> this.alive)
      .subscribe(problemList=>{
        this.problems = problemList;
        this.events.publish('reported_problems_count', this.problems.length);
      });
  }

  navigateToProblem(p){
    this.rootNavCtrl.push('DetailedProblemPage',{uid: p.$key});
  }

  emailUser(p){
    window.open('mailto:'+p.email);
    return false;
  }
  deleteProblem(p){
    new Promise((resolve,reject)=>{
      let buttons = [
        { text: 'No', handler: reject },
        { text: 'Yes', handler: resolve },
      ];
      this.dialogUtil.showConfirm('Are you sure to delete this problem? This action cannot be undone.', buttons,'');
    }).then(()=>{
      this.dialogUtil.showLoader('Deleting problem.');
      this.appService.removeReportProblem(p.$key).then(()=>{
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
