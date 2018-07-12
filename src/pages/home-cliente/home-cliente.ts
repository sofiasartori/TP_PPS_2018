import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../lib/Utils';
import { DatabaseProvider } from '../../providers/database';
import { NgForm } from "@angular/forms";

/**
 * Generated class for the HomeClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-cliente',
  templateUrl: 'home-cliente.html',
})
export class HomeClientePage {

  destino = 'Gorriti 11 Lomas de zamora';
  hora = '10-15';
  tieneViajes = false;
  constructor(
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private database: DatabaseProvider
  ) {

  }
  ionViewWillEnter() {

    this.tieneViajes = !!this.database.dataUserFb.recorrido
  }
  getHora() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date)

        this.hora = `${Utils.paddy(date.getHours())}-${Utils.paddy(date.getMinutes())}`;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  generarPedido(form: NgForm) {
    const hora = this.hora;
    const destino = form.value.destino;
    this.database.guardarNuevaRuta({ hora: hora, destino: destino })
  }
}