import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajePendiente } from '../../models/in-viaje-pendiente';
import firebase from 'firebase';
import { NgForm } from '../../../node_modules/@angular/forms';
import { DatabaseProvider } from '../../providers/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User, FactoryUser } from '../../utils/FactoryUser';
import { ROL_CLIENTE, ROL_CHOFER, ROL_SUPERVISOR, ROL_SU } from '../../properties';

/**
 * Generated class for the ChoferListaViajesPendientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chofer-lista-viajes-pendientes',
  templateUrl: 'chofer-lista-viajes-pendientes.html',
})
export class ChoferListaViajesPendientesPage {
  pendientes: Array<ViajePendiente> = []
  mostrarForm = false;
  selectedViaje = null;
  choferes = [];
  selectValue = '';
  type = '';
  user: User;
  button_2 = '';
  autos = [];
  auto = null;
  constructor(private stringsL: StringsL,
    private database: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcode: BarcodeScanner) {
    this.user = FactoryUser.crearUsuario(this.database.dataUserFb, this.stringsL);
    this.user.textos.encuestaButton1
    this.button_2 = this.stringsL.Ver_datos_del_chofer[this.stringsL.lenguaje]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaViajesPage');
  }

  ionViewWillEnter() {

    this.database.checkSiChoferTieneAuto((auto) => {
      this.responseCheck(auto);
    })
  }

  responseCheck(auto) {
    if (auto) {
      this.auto = auto;
      this.traerPendientes();
    } else {

    }
  }

  traerPendientes() {
    const ref = firebase.database().ref('viajes');
    ref.on('value', snapshot => {
      this.pendientes.length = 0;
      snapshot.forEach(data => {

        firebase.storage().refFromURL('gs://remiseriacachito.appspot.com').child('fotos/clientes/' + data.val().email + '.jpeg').getDownloadURL().then(foto => {
          console.log(foto);
          this.pendientes.push({ ...data.val(), key: data.key, foto: foto });
          console.log(JSON.stringify({ ...data.val(), key: data.key, foto: foto }));
        })
      });
    });
  }

  finalizar(chofer: any, slading) {
    this.mostrarForm = false;
    // this.database.changeUserStatus(user, key, false);
    // firebase.database().ref('viajes/' + chofer.user).child(chofer.key).remove();
    firebase.database().ref('viajes/').child(chofer.key).update(
      {
        finalizado: true
        // apellido: form.value.selectedSurname
      });
    slading.close()
  }

  asignarpendiente(viaje: any, slading) {
    firebase.database().ref('viajes/').child(viaje.key).update(
      {
        chofer: firebase.auth().currentUser.email.split("@")[0]
        // apellido: form.value.selectedSurname
      });
    this.selectedViaje = viaje;
    // this.database.changeUserStatus(user, key, true);
    slading.close();
  }
  cancelarpendiente(chofer: any, slading) {
    this.mostrarForm = false;
    // this.database.changeUserStatus(user, key, false);
    // firebase.database().ref('viajes/' + chofer.user).child(chofer.key).remove();
    firebase.database().ref('viajes/').child(chofer.key).update(
      {
        chofer: ''
        // apellido: form.value.selectedSurname
      });
    slading.close()

  }
  eliminar(chofer: any, slading) {
    this.mostrarForm = false;
    // this.database.changeUserStatus(user, key, false);
    // firebase.database().ref('viajes/' + chofer.user).child(chofer.key).remove();
    firebase.database().ref('viajes/').child(chofer.key).remove();
    slading.close()

  }

  editarpendiente(form: NgForm) {
    firebase.database().ref('viajes/').child(this.selectedViaje.key).update(
      {
        chofer: this.selectValue
        // apellido: form.value.selectedSurname
      });
    // form.value.selectedName
    // form.value.selectedSurname
  }
  verElMapa(chofer: any, slading) {
    this.navCtrl.push("MapaRutaPage", { start: chofer.origen, end: chofer.destino });
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
  }

}
