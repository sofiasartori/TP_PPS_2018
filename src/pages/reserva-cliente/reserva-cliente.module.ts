import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservaClientePage } from './reserva-cliente';

@NgModule({
  declarations: [
    ReservaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservaClientePage),
  ],
})
export class ReservaClientePageModule {}
