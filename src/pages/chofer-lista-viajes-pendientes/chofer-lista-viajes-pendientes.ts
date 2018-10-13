import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajePendiente } from '../../models/in-viaje-pendiente';
import firebase from 'firebase';
import { NgForm } from '../../../node_modules/@angular/forms';

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
  constructor(private stringsL: StringsL, public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaViajesPage');
  }

  ionViewWillEnter() {
    this.traerPendientes();
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

}
