import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemsListPage } from './problems-list';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ProblemsListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ProblemsListPage),
  ],
})
export class ProblemsListPageModule {}
