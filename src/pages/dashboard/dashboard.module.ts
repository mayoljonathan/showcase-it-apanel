import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';

import { ComponentsModule } from '../../components/components.module';
import { MasonryModule } from 'angular2-masonry';
import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    ComponentsModule,
    MasonryModule,
    PipesModule,
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
