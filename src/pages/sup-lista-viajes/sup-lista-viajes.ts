import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
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

  constructor(private stringsL:StringsL,public navCtrl: NavController,
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

  eliminar(data: any, slading) {
    // this.database.changeUserStatus(user, key, false);
    // firebase.database().ref('viajes/' + chofer.user).child(chofer.key).remove();
    firebase.database().ref('reservas/').child(data.key).remove();
    slading.close()

  }
}
