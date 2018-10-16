import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  button_2 = '';
  autos = [];
  constructor(private stringsL: StringsL, public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private barcode: BarcodeScanner,
    private platform: Platform) {
    this.user = FactoryUser.crearUsuario(this.database.dataUserFb, this.stringsL);
    this.user.textos.encuestaButton1
    this.button_2 = this.stringsL.Ver_datos_del_chofer[this.stringsL.lenguaje]
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


  verDatosChofer(auto: { patente: string, key: string }) {
    this.navCtrl.push('AccountPage', auto);
    return;

    // this.database.getViaje((viaje) => {
    //   if (viaje) {
    //     // this.viaje = viaje.val();
    //     // this.key = viaje.key;
    //     const ref = firebase.database().ref('autos');
    //     ref.on('value', snapshot => {
    //       this.autos.length = 0;
    //       snapshot.forEach(subSnapshot => {
    //         subSnapshot.forEach(data => {
    //           if (data.val().chofer == viaje.val().chofer) {
    //             this.database.getChofer(data.val().chofer, (chofer) => {

    //             })
    //           }
    //           // this.autos.push({ ...data.val(), key: data.key });
    //         });
    //       });
    //     });
    //   }
    // })


    // const ref = firebase.database().ref('autos');
    // ref.on('value', snapshot => {
    //   this.autos.length = 0;
    //   snapshot.forEach(subSnapshot => {
    //     subSnapshot.forEach(data => {
    //       if (data.val().chofer == "chofer")
    //         this.autos.push({ ...data.val(), key: data.key });
    //     });
    //   });
    // });
  }

  button1() {

    if (this.platform.is('cordova')) {
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
            this.verDatosChofer(auto);
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
    } else {
      const patente = 'POP112';
      const key = '-LJMIoAG3zWwy6o3sSF3';
      const auto = {
        patente: patente,
        key: key
      };
      switch (this.database.dataUserFb.rol) {
        case ROL_CLIENTE:
          this.verDatosChofer(auto);
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
    }
  }

  button2() {
    if (this.platform.is('cordova')) {
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
            this.navCtrl.push('AccountPage', { type: 'mostrarChofer', auto: { patente: patente, key: key } });
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
    } else {
      const patente = 'POP112';
      const key = '-LJMIoAG3zWwy6o3sSF3';
      const auto = {
        patente: patente,
        key: key
      };
      switch (this.database.dataUserFb.rol) {
        case ROL_CLIENTE:
          this.navCtrl.push('AccountPage', { type: 'mostrarChofer', auto: { patente: patente, key: key } });
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
    }
  }

}
