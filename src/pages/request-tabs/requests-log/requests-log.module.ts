import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestsLogPage } from './requests-log';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RequestsLogPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(RequestsLogPage),
  ],
})
export class RequestsLogPageModule {}
