import { Component,Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HelperUtil,DialogUtil } from '../../shared/utils';
import { AppService,CacheService,UserService } from '../../shared/services';

@Component({
  selector: 'review',
  templateUrl: 'review.html'
})
export class ReviewComponent {

  @Input('review') review;
  @Input('app') app;
  @Input('clampText') clampText;

  shimmerRandomID = this.helperUtil.randomUid();
  reply: string;
  alive: boolean = true;

  constructor(
    public helperUtil: HelperUtil,
    public navCtrl: NavController,
    public dialogUtil: DialogUtil,
    public cacheService: CacheService,
    public userService: UserService,
    public appService: AppService,
  ) {

  }

  ngOnInit(){
    if(this.review){
      this.userService.getUserData(this.review.user_uid).takeWhile(()=>this.alive).subscribe(userData=>{
        this.review['userPhotoURL'] = userData.photoURL;
        this.review['userName'] = userData.name;
      });
    }
    if(this.review.reply){
      this.userService.getUserData(this.review.reply.user_uid)
        .takeWhile(()=>this.alive)
        .subscribe(userData=>{
          this.review.reply['userName'] = userData.name;
          this.review.reply['userPhotoURL'] = userData.photoURL;
        });
    }

  }

  loadedUserPhoto(id){
    document.getElementById('user-photo-placeholder-'+id).classList.remove('user-photo-placeholder');
  }

  navigateToUser(user_uid){
    this.navCtrl.push('UserProfilePage', {uid:user_uid , isAdmin: false});
  }

  reviewOptions(action,review){
    console.log(review);
    if(action === 'unflag'){
      new Promise((resolve,reject)=>{
        let buttons = [
          { text: 'No', handler: reject },
          { text: 'Yes', handler: resolve },
        ];
        let msg = 'Are you sure to remove the flag for this review?';
        this.dialogUtil.showConfirm(msg, buttons,'');
      }).then(()=>{
        this.dialogUtil.showLoader('Removing flag.');
        this.appService.removeFlagReview(this.app.uid, this.review.$key).then(()=>{
          this.dialogUtil.showToast('Flag for this review has been removed.',4000, 'bottom');
          this.dialogUtil.hideLoader();
        },e=>{
          this.dialogUtil.showAlert('Error in removing the flag for this review.','Ok');
          this.dialogUtil.hideLoader();
        });
      },()=>{});

    }else{
      new Promise((resolve,reject)=>{
        let buttons = [
          { text: 'No', handler: reject },
          { text: 'Yes', handler: resolve },
        ];
        this.dialogUtil.showConfirm('Are you sure to delete this review?', buttons,'');
      }).then(()=>{
        this.appService.deleteReview(this.app.uid, this.review.$key).then(()=>{
          this.dialogUtil.showToast('Review has been deleted.',3000,'bottom');
          this.dialogUtil.hideLoader();
        },e=>{
          this.dialogUtil.showAlert('Error in deleting the review.','Ok');
          this.dialogUtil.hideLoader();
        });
      },()=>{});
    }

    
  }

  ngOnDestroy(){
    this.alive = false;
  }
}
