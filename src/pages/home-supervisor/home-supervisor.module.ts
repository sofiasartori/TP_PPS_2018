import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSupervisorPage } from './home-supervisor';

@NgModule({
  declarations: [
    HomeSupervisorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeSupervisorPage),
  ],
})
export class HomeSupervisorPageModule {}
