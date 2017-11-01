import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationsCatListPage } from './applications-cat-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    ApplicationsCatListPage,
  ],
  imports: [
    PipesModule,
    MaterialIconsModule,
    IonicPageModule.forChild(ApplicationsCatListPage),
  ],
})
export class ApplicationsCatListPageModule {}
