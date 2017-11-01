import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppsListPage } from './apps-list';

import { PipesModule } from '../../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AppsListPage,
  ],
  imports: [
    PipesModule,
    MaterialIconsModule,
    ComponentsModule,
    IonicPageModule.forChild(AppsListPage),
  ],
})
export class AppsListPageModule {}
