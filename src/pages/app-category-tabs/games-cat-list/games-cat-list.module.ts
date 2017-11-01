import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamesCatListPage } from './games-cat-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    GamesCatListPage,
  ],
  imports: [
    PipesModule,
    MaterialIconsModule,
    IonicPageModule.forChild(GamesCatListPage),
  ],
})
export class GamesCatListPageModule {}
