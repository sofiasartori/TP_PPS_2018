import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoferListaViajesPendientesPage } from './chofer-lista-viajes-pendientes';

@NgModule({
  declarations: [
    ChoferListaViajesPendientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoferListaViajesPendientesPage),
  ],
})
export class ChoferListaViajesPendientesPageModule {}
