import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenancePage } from './maintenance';

import { PipesModule } from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MaintenancePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MaintenancePage),
  ],
})
export class MaintenancePageModule {}
