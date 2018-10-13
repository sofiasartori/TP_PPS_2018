import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../lib/Utils';
import { DatabaseProvider } from '../../providers/database';
import { NgForm } from "@angular/forms";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

/**
 * Generated class for the HomeClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

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
  constructor(private stringsL: StringsL,
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private database: DatabaseProvider,
    private geolocation: Geolocation
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
  irEncuesta() {
    this.navCtrl.push("EncuestaClienteQrPage");
  }
  generarPedido(form: NgForm) {
    const hora = this.hora;
    const destino = form.value.destino;
    this.database.guardarNuevaRuta({ hora: hora, destino: destino, origen: form.value.origen }, () => {
      this.verElMapa(form.value.origen, form.value.destino)
    })

  }

  getFromMap() {
    this.navCtrl.push('MapaRutaPage', { returnPosition: true, delegate: this });
  }

  getUbicacion() {
    this.getPosition();
  }

  getPosition(): any {
    var geocoder = new google.maps.Geocoder();

    this.geolocation.getCurrentPosition({ timeout: 10000 }).then(response => {
      // alert(response.coords.longitude)
      geocoder.geocode({
        'latLng': new google.maps.LatLng(response.coords.latitude,response.coords.longitude)
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            this.origen = results[0].formatted_address
            // alert(results[0].formatted_address);
          }
        }
      });
    })
      .catch(error => {
        alert(error);
        console.log(error);
      })


  }

  verElMapa(origen, destino) {
    this.navCtrl.push("MapaRutaPage", { start: this.origen, end: this.destino });
  }
}