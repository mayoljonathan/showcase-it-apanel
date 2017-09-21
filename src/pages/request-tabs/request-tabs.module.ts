import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { RequestTabsPage } from './request-tabs';

@NgModule({
  declarations: [
    RequestTabsPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(RequestTabsPage),
  ],
})
export class RequestTabsPageModule {}
