import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedAppPage } from './detailed-app';

import { MaterialIconsModule } from 'ionic2-material-icons';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    DetailedAppPage,
  ],
  imports: [
    MaterialIconsModule,
    PipesModule,
    IonicImageViewerModule,
    IonicPageModule.forChild(DetailedAppPage),
  ],
})
export class DetailedAppPageModule {}
