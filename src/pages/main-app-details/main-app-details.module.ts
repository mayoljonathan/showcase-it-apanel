import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainAppDetailsPage } from './main-app-details';

import { PipesModule } from '../../shared/pipes/pipes.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { MasonryModule } from 'angular2-masonry';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MainAppDetailsPage,
  ],
  imports: [
    PipesModule,
    IonicImageViewerModule,
    MaterialIconsModule,
    MasonryModule,
    ComponentsModule,
    IonicPageModule.forChild(MainAppDetailsPage),
  ],
})
export class MainAppDetailsPageModule {}
