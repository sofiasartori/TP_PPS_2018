import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../lib/Utils';
import { DatabaseProvider } from '../../providers/database';
import { NgForm } from "@angular/forms";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeAudio } from '@ionic-native/native-audio';
import { NativeStorage } from '@ionic-native/native-storage';
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
  distancia = 0;
  PRECIO_MULTIPLICADOR = 1 / (1000 / 15);
  callService = false;
  soundOn = false;
  constructor(private stringsL: StringsL,
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private database: DatabaseProvider,
    private geolocation: Geolocation,
    private nativeAudio: NativeAudio,
    private nativeStorage: NativeStorage
  ) {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/sounds/bell.mp3').then;
    this.nativeAudio.preloadSimple('uniqueId2', 'assets/sounds/cancel_bell.mp3').then;

  }
  ionViewWillEnter() {
    this.nativeStorage.getItem('soundOn')
      .then(
        data => {
          console.log(data)
          this.soundOn = data.soundOn
        },
        error => console.error(error)
      );
    this.tieneViajes = false
    this.viaje = null;
    this.database.getViaje((viaje) => {
      if (viaje) {
        this.tieneViajes = true;
        this.viaje = viaje.val();
        this.key = viaje.key;
      }
    })
    if (this.callService) {
      this.generarPedido(null);
      this.callService = false;
    }
  }

  cancelar() {
    if (this.soundOn)
      this.nativeAudio.play('uniqueId2');
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
    const destino = this.destino;
    console.log({ hora: hora, destino: destino, origen: this.origen });
    console.log({ precio: this.distancia * this.PRECIO_MULTIPLICADOR });

    this.database.guardarNuevaRuta({ hora: hora, destino: destino, origen: this.origen, precio: this.distancia * this.PRECIO_MULTIPLICADOR }, () => {
      // this.verElMapa(form.value.origen, form.value.destino)
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
        'latLng': new google.maps.LatLng(response.coords.latitude, response.coords.longitude)
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
    if (this.soundOn)
      this.nativeAudio.play('uniqueId1')

    this.navCtrl.push("MapaRutaPage", { start: this.origen, end: this.destino, delegate: this, generarPedido: true });
  }
}