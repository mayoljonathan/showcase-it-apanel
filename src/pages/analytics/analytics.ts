import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from "../../shared/models/";
import { CacheService,UserService } from "../../shared/services/";

import "rxjs/add/operator/takeWhile";

@IonicPage()
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage {

  alive: boolean = true;

  onlineUsers: Array<any> = [];
  usersList: Array<User> = [];

  constructor(
    public navCtrl: NavController,
    public cacheService: CacheService,
    public userService: UserService,
  ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyticsPage');
    this.getUsers('all');
    this.getUsers('online_users');
  }

  getUsers(type){
    //all, online_users
    this.userService.getUsers(type)
      .takeWhile(()=> this.alive)
      .subscribe(users=>{
        if(type === 'online_users'){
          this.onlineUsers = users.filter((u) => u.$value === true)
          this.onlineUsers.forEach((user,i)=>{
            this.userService.getUserData(user.$key).takeWhile(()=> this.alive).subscribe(userData=>{
              this.onlineUsers[i] = userData;
            });
          });
        }else{
          this.usersList = users;
        }
      });
  }

  ionViewCanEnter(){
    return this.cacheService.isLoggedIn && this.cacheService.isDoneCheckingAdminData ? true : false;
  }

  ngOnDestroy(){
    console.log('Destroying analytics');
    this.alive = false;
  }

}
