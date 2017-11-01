import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';

import { AppService,UserService } from "../../../shared/services/";

import { User } from '../../../shared/models';

@IonicPage({segment: 'users-list'})
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  alive: boolean = true;
  users: Array<User>;

  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public events: Events,
    public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
  ){
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersListPage');
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers('all')
      .takeWhile(()=> this.alive)
      .subscribe((users:any)=>{

        if(users.length != 0){
          users.forEach((user:User)=>{
            this.userService.getUserPresence(user.uid).takeWhile(()=> this.alive).subscribe(online=>{
              //returns online.$value = true if its online, else an epoch time
              user['lastSeen'] = online.$value;
            });

            this.appService.getUserShowcasedApps(user.uid).takeWhile(()=> this.alive).subscribe(userApps=>{
              user['appCount'] = userApps.length;
            });

            this.userService.getUserIsDeveloper(user.uid).takeWhile(()=>this.alive).subscribe(res=>{
              if(typeof res['$value'] === 'number'){
                user['isDeveloper'] = true;
              }else{
                user['isDeveloper'] = false;
              }
            }); 
          });
        }

        this.users = users;
      });
  }

  getUserStatusColor(user){
    if(user.status === 'active'){
      return 'primary';
    }else if(user.status === 'banned'){
      return 'danger';
    }else if(user.status === 'disabled'){
      return 'disabled';
    }
  }

  loadedUserPhoto(index){
    document.getElementById('user-img-placeholder-'+index).className = '';
  }

  navigateToUser(user){
    this.rootNavCtrl.push('UserProfilePage',{uid: user.uid, isAdmin: false});
  }

  ngOnDestroy(){
    this.alive = false;
  }
}
