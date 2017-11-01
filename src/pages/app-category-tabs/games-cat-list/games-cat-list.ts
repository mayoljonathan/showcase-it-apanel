import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppService } from "../../../shared/services/";
import { DialogUtil } from "../../../shared/utils/";

@IonicPage({segment: 'games'})
@Component({
  selector: 'page-games-cat-list',
  templateUrl: 'games-cat-list.html',
})
export class GamesCatListPage {

  alive: boolean = true;
  categories: Array<any>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    // public viewCtrl: ViewController,
    // public modalCtrl: ModalController,
    // public events: Events,
    public dialogUtil: DialogUtil,
    public navParams: NavParams,
    public appService: AppService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationsCatListPage');
    this.getCategories();
  }

  getCategories(){
    this.appService.getCategories('games')
      .takeWhile(()=> this.alive)
      .subscribe((categories:any)=>{
        if(categories.length > 0){
          categories.forEach(category=>{
            this.appService.getAppsByCategory(category.uid).takeWhile(()=> this.alive).subscribe(appList=>{
              category['appCount'] = appList.length;
            });
          });
        }
        this.categories = categories;
      });
  }
  
  showAddCategory(isEditing?,category_uid?,category_name?){
    new Promise((resolve,reject)=>{
      let promptTitle = !isEditing ? 'Add category' : 'Edit category';
      let inputs = {
        name: 'category',
        placeholder: 'Category',
        value: !isEditing ? '': category_name
      };
      let buttons = [
        { text: 'Cancel', handler: reject },
        { text: !isEditing ? 'Add' : 'Update', handler: resolve },
      ];
      this.dialogUtil.showPrompt(promptTitle,'',inputs,buttons);
    }).then((data:any)=>{
      if(data.category.trim().length > 30){
        return this.dialogUtil.showToast('Category has a minimum characters of 30.', 4000, 'bottom');
      }else if(data.category.trim().length == 0){
        return this.dialogUtil.showToast('Please input your category name.', 4000, 'bottom');
      }
      var category_data:any;
      if(isEditing){
        category_data = {
          name: data.category.trim(),
          uid: category_uid
        }
      }else{
        category_data = data.category.trim();
      }
      this.dialogUtil.showLoader(`${!isEditing ? 'Adding category.' : 'Updating category.'}`);
      this.appService.updateCategory('games',isEditing,category_data).then(()=>{
        this.dialogUtil.showToast(`${!isEditing ? 'Category has been added.' : 'Category has been updated.'}`, 3000,'bottom');
        this.dialogUtil.hideLoader();
      });
    },()=>{});

  }

  navigateToCategory(category){
    this.rootNavCtrl.push('FilteredAppsPage', {type:'apps',category: category});
  }

  onChangeStatus(checked,index){
    this.categories[index]['status'] = checked ? 1 : 0;
    this.dialogUtil.showLoader('Updating category.');
    this.appService.updateCategory('games',true,this.categories[index]).then(()=>{
      this.dialogUtil.hideLoader();
      this.dialogUtil.showToast(`Category has been updated.`, 3000 , 'bottom');
    },e=>{  
      this.dialogUtil.hideLoader();
      this.dialogUtil.showToast(`Error in doing the operation. ${e}`, 3000 , 'bottom');
    });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
