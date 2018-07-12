import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaClienteDatosPage } from './encuesta-cliente-datos';

@NgModule({
  declarations: [
    EncuestaClienteDatosPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaClienteDatosPage),
  ],
})
export class EncuestaClienteDatosPageModule {}
