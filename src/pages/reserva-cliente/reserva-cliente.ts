import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { DatePicker } from '../../../node_modules/@ionic-native/date-picker';

/**
 * Generated class for the ReservaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva-cliente',
  templateUrl: 'reserva-cliente.html',
})
export class ReservaClientePage {
  dia_hora = '10-10-2018-T10-10';
  destino = 'Gorriti 10';
  origen = 'Somellera 409';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private database: DatabaseProvider,
    public alerCtrl: AlertController,
    private datePicker: DatePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaClientePage');
  }

  generarReserva(form: NgForm) {
    // form.resetForm()
    const loading = this.loadingCtrl.create({
      content: 'Reservando...'
    });
    loading.present();
    const data = {
      origen: form.value.origen,
      destino: form.value.destino,
      hora: form.value.dia_hora
    }
    this.database.guardarReserva(data).then(data => {
      loading.dismiss();
      const alert = this.alerCtrl.create({
        title: 'Reserva',
        message: 'Su reserva fue recibida correctamente',
        buttons: ['Aceptar']
      });
      alert.onDidDismiss(() => {
        form.resetForm();
      });

    })
  }
  getTiempo() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date)
        this.dia_hora =date.toDateString(); 
        // this.hora = `${Utils.paddy(date.getHours())}-${Utils.paddy(date.getMinutes())}`;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
