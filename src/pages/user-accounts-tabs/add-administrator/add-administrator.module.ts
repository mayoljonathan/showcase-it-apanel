import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAdministratorPage } from './add-administrator';

@NgModule({
  declarations: [
    AddAdministratorPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAdministratorPage),
  ],
})
export class AddAdministratorPageModule {}
