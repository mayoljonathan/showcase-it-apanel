import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilteredAppsPage } from './filtered-apps';

import { PipesModule } from '../../../shared/pipes/pipes.module';
// import { MaterialIconsModule } from 'ionic2-material-icons';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    FilteredAppsPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(FilteredAppsPage),
  ],
})
export class FilteredAppsPageModule {}
