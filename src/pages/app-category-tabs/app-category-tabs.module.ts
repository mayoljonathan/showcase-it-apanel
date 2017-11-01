import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { AppCategoryTabsPage } from './app-category-tabs';

@NgModule({
  declarations: [
    AppCategoryTabsPage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(AppCategoryTabsPage),
  ],
})
export class AppCategoryTabsPageModule {}
