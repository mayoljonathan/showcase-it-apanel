import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestRejectPage } from './request-reject';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RequestRejectPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(RequestRejectPage),
  ],
})
export class RequestRejectPageModule {}
