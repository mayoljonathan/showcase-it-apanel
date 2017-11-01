import { Component,Input } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { HelperUtil } from '../../shared/utils';
import { AppService,CacheService,UserService,AdminService } from '../../shared/services';

@Component({
  selector: 'dashboard-cards',
  templateUrl: 'dashboard-cards.html'
})
export class DashboardCardsComponent {

  @Input('card') card;

  alive: boolean = true;

  accountSegmentSelected: string;
  platformSelected: string;

  accounts = {
    user: [],
    admin: [],
  }
  appStats = {
    ratings_reviews: 0,
    most_viewed: 0,
    most_downloaded: 0
  };

  algolia = {
    applications_sync: 0,
    users_sync: 0,
  }
  searchLogs = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public userService: UserService,
    public adminService: AdminService,
  ) {
  }

  ngOnInit(){
    if(this.card.id === 'users'){ this.onUsersCard() }
    if(this.card.id === 'highest_rated' || this.card.id === 'most_downloaded' || this.card.id === 'most_viewed'){ this.getAppStats() }
    if(this.card.id === 'most_downloaded'){ this.platformSelected = 'overall';}
    if(this.card.id === 'algolia_api'){ this.onAlgoliaAPI() }
    if(this.card.id === 'algolia_logs'){ this.onAlgoliaLogs() }
  }

  segmentChanged(e){
    this.accountSegmentSelected = e.value;
  }
  platformChanged(e){
    this.platformSelected = e.value;
  }
  onUsersCard(){
    this.accountSegmentSelected = 'users';
    this.getOnlineAccounts();
  }
  getOnlineAccounts(){
    this.adminService.getOnlineAccounts('user')
      .takeWhile(()=> this.alive)
      .subscribe(users=>{
        if(users && users.length > 0){
          this.accounts.user = [];
          users.forEach((user,index)=>{
            if(user.$value === true){
              this.userService.getUserData(user.$key).takeWhile(()=>this.alive).subscribe(userData=>{
                let onlineUser = {
                  uid: user.$key,
                  name: userData.name,
                  photoURL: userData.photoURL
                }
                this.accounts.user.push(onlineUser);
              });
            }
          });
        }else{
          this.accounts.user = users;
        }
      });

    this.adminService.getOnlineAccounts('admin')
      .takeWhile(()=> this.alive)
      .subscribe(admins=>{
        if(admins && admins.length > 0){
          this.accounts.admin = [];
          admins.forEach((admin,index)=>{
            if(admin.$value === true){
              this.adminService._getAdminData(admin.$key).takeWhile(()=>this.alive).subscribe(adminData=>{
                let onlineUser = {
                  uid: admin.$key,
                  name: adminData.name,
                  photoURL: adminData.photoURL
                }
                this.accounts.admin.push(onlineUser);
              });
            }
          });
        }else{
          this.accounts.admin = admins;
        }
      });
  }
  navigateToUser(uid){
    this.navCtrl.push('UserProfilePage',{uid: uid, isAdmin: false});
  }

  getAppStats(){
    this.appService.getAppStatsInDashboard()
      .takeWhile(()=>this.alive)
      .subscribe((res:any)=>{
        this.appStats[res.id] = res.data;
    });
  }

  navigateToApp(app_uid){
    this.navCtrl.push('MainAppDetailsPage', {app_uid: app_uid});
  }

  onAlgoliaAPI(){
    this.adminService.getFirebaseToAlgoliaLatestSync('application_sync')
      .takeWhile(()=>this.alive)
      .subscribe(data=>{
        this.algolia.applications_sync = data.last_index_timestamp;
      });

    this.adminService.getFirebaseToAlgoliaLatestSync('user_sync')
      .takeWhile(()=>this.alive)
      .subscribe(data=>{
        this.algolia.users_sync = data.last_index_timestamp;
      });
  }

  onAlgoliaLogs(){
    this.adminService.getAlgoliaLogs('query').then(data=>{
      this.searchLogs = data;
    });
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
