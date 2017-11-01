import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlagReviewsListPage } from './flag-reviews-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    FlagReviewsListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(FlagReviewsListPage),
  ],
})
export class FlagReviewsListPageModule {}
