import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
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
  origen = 'Obelisco'
  destino = 'Gorriti 11 Lomas de zamora';
  hora = '10-15';
  tieneViajes = false;
  viaje;
  key;
  constructor(private stringsL:StringsL,
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private database: DatabaseProvider
  ) {

  }
  ionViewWillEnter() {

    this.tieneViajes = !!this.database.dataUserFb.recorrido
    this.database.getViaje((viaje) => {
      if (viaje) {
        this.viaje = viaje.val();
        this.key = viaje.key;
      }
    })
  }

  cancelar() {
    this.database.removeViaje(this.key, () => { this.viaje = null; });
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
  irEncuesta(){
    this.navCtrl.push("EncuestaClienteQrPage");
  }
  generarPedido(form: NgForm) {
    const hora = this.hora;
    const destino = form.value.destino;
    this.database.guardarNuevaRuta({ hora: hora, destino: destino, origen: form.value.origen }, () => {
      this.verElMapa(form.value.origen, form.value.destino)
    })

  }

  verElMapa(origen, destino) {
    this.navCtrl.push("MapaRutaPage", { start: origen, end: destino });
  }
}