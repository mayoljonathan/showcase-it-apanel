import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersListPage } from './users-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    UsersListPage,
  ],
  imports: [
    PipesModule,
    MaterialIconsModule,
    IonicPageModule.forChild(UsersListPage),
  ],
})
export class UsersListPageModule {}
