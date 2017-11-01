import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { UserAccountsTabsPage } from './user-accounts-tabs';

@NgModule({
  declarations: [
    UserAccountsTabsPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(UserAccountsTabsPage),
  ],
})
export class UserAccountsTabsPageModule {}
