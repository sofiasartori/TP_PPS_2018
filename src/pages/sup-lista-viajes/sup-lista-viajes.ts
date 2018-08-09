import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { ReservaViaje } from '../../models/in-reserva';

@IonicPage()
@Component({
  selector: 'page-sup-lista-viajes',
  templateUrl: 'sup-lista-viajes.html',
})
export class SupListaViajesPage {

  reservas: Array<ReservaViaje> = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaViajesPage');
  }

  ionViewWillEnter() {
  this.traerReservas();
  }

  traerReservas() {
    const ref = firebase.database().ref('reservas');
    ref.on('value', snapshot => {
      this.reservas.length = 0;
        snapshot.forEach(data => {
          this.reservas.push({ ...data.val(), key: data.key });
        });
      });
  }
}
