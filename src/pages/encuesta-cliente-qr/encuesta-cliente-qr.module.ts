import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaClienteQrPage } from './encuesta-cliente-qr';

@NgModule({
  declarations: [
    EncuestaClienteQrPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaClienteQrPage),
  ],
})
export class EncuestaClienteQrPageModule {}
