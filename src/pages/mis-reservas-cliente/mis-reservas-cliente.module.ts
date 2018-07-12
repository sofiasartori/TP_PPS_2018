import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisReservasClientePage } from './mis-reservas-cliente';

@NgModule({
  declarations: [
    MisReservasClientePage,
  ],
  imports: [
    IonicPageModule.forChild(MisReservasClientePage),
  ],
})
export class MisReservasClientePageModule {}
