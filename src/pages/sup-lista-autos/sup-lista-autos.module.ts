import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupListaAutosPage } from './sup-lista-autos';

@NgModule({
  declarations: [
    SupListaAutosPage,
  ],
  imports: [
    IonicPageModule.forChild(SupListaAutosPage),
  ],
})
export class SupListaAutosPageModule {}
