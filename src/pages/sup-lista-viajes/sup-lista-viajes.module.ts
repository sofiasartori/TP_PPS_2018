import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupListaViajesPage } from './sup-lista-viajes';

@NgModule({
  declarations: [
    SupListaViajesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupListaViajesPage),
  ],
})
export class SupListaViajesPageModule {}
