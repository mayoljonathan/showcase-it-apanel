import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportTabsPage } from './report-tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    ReportTabsPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(ReportTabsPage),
  ],
})
export class ReportTabsPageModule {}
