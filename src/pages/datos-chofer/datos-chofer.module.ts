import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosChoferPage } from './datos-chofer';

@NgModule({
  declarations: [
    DatosChoferPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosChoferPage),
  ],
})
export class DatosChoferPageModule {}
