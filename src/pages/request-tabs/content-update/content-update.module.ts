import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentUpdatePage } from './content-update';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ContentUpdatePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ContentUpdatePage),
  ],
})
export class ContentUpdatePageModule {}
