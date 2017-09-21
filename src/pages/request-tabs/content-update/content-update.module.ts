import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentUpdatePage } from './content-update';

@NgModule({
  declarations: [
    ContentUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ContentUpdatePage),
  ],
})
export class ContentUpdatePageModule {}
