import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedProblemPage } from './detailed-problem';

import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    DetailedProblemPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DetailedProblemPage),
  ],
})
export class DetailedProblemPageModule {}
