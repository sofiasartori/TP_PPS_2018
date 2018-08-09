import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuListUsersPage } from './su-list-users';

@NgModule({
  declarations: [
    SuListUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(SuListUsersPage),
  ],
})
export class SuListUsersPageModule {}
