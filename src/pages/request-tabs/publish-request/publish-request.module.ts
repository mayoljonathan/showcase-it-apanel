import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishRequestPage } from './publish-request';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    PublishRequestPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(PublishRequestPage),
  ],
})
export class PublishRequestPageModule {}
