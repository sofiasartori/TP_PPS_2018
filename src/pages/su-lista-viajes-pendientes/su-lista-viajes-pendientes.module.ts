import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuListaViajesPendientesPage } from './su-lista-viajes-pendientes';

@NgModule({
  declarations: [
    SuListaViajesPendientesPage,
  ],
  imports: [
    IonicPageModule.forChild(SuListaViajesPendientesPage),
  ],
})
export class SuListaViajesPendientesPageModule {}
