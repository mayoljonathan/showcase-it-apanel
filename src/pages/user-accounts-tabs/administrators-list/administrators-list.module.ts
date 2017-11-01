import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministratorsListPage } from './administrators-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    AdministratorsListPage,
  ],
  imports: [
    PipesModule,
    MaterialIconsModule,
    IonicPageModule.forChild(AdministratorsListPage),
  ],
})
export class AdministratorsListPageModule {}
