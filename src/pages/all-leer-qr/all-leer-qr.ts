import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { ROL_CLIENTE, ROL_CHOFER, ROL_SU, ROL_SUPERVISOR } from '../../properties';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { User, FactoryUser } from '../../utils/FactoryUser';
import firebase from 'firebase';

/**
 * Generated class for the AllLeerQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-leer-qr',
  templateUrl: 'all-leer-qr.html',
})
export class AllLeerQrPage {
  type = '';
  user: User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private barcode: BarcodeScanner) {
    this.user = FactoryUser.crearUsuario(this.database.dataUserFb)
    this.user.textos.encuestaButton1
  }

  ionViewWillEnter() {
    this.type = this.navParams.get('type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllLeerQrPage');
  }

  leerQr() {
    this.barcode.scan().then(value => {
      const code = value.text;
      switch (this.database.dataUserFb.rol) {
        case ROL_CLIENTE:

          break;
        case ROL_CHOFER:

          break;
        case ROL_SUPERVISOR:

          break;
        case ROL_SU:

          break;
        default:
          break;
      }
    })
  }

  button1() {
    this.barcode.scan().then(value => {
      const code = value.text;
      const barcodeArray = code.split('/');
      if (barcodeArray.length != 2) {
        alert('No es un codigo válido');
      }
      const patente = barcodeArray[0];
      const key = barcodeArray[1];
      const auto = {
        patente: patente,
        key: key
      };
      switch (this.database.dataUserFb.rol) {
        case ROL_CLIENTE:
          this.navCtrl.push('EncuestaClienteQrPage', auto);
          break;
        case ROL_CHOFER:
          firebase.database().ref('autos/' + patente).child(key).update({ chofer: this.database.dataUserFb.user });
          this.navCtrl.push('EncuestaClienteQrPage', auto);
          break;
        case ROL_SUPERVISOR:
          this.navCtrl.push('EncuestaClienteQrPage', auto);
          break;
        case ROL_SU:

          break;
        default:
          break;
      }
    })
  }

  button2() {
    this.barcode.scan().then(value => {
      const code = value.text;
      const barcodeArray = code.split('/');
      if (barcodeArray.length != 2) {
        alert('No es un codigo válido');
      }
      const patente = barcodeArray[0];
      const key = barcodeArray[1];
      const auto = {
        patente: patente,
        key: key
      };
      switch (this.database.dataUserFb.rol) {
        case ROL_CLIENTE:
          this.navCtrl.push('AccountPage', { type: 'type', auto: { patente: patente, key: key } });
          break;
        case ROL_CHOFER:

          break;
        case ROL_SUPERVISOR:

          break;
        case ROL_SU:

          break;
        default:
          break;
      }
    })
  }

}
