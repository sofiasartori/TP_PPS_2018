import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajePendiente } from '../../models/in-viaje-pendiente';
import firebase from 'firebase';
import { NgForm } from '../../../node_modules/@angular/forms';
/**
 * Generated class for the SuListaViajesPendientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-su-lista-viajes-pendientes',
  templateUrl: 'su-lista-viajes-pendientes.html',
})
export class SuListaViajesPendientesPage {
  pendientes: Array<ViajePendiente> = []
  mostrarForm = false;
  selectedViaje = null;
  choferes=[];
  selectValue = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaViajesPage');
  }

  ionViewWillEnter() {
  this.traerPendientes();
  this.traerChoferes();
  }

  traerPendientes() {
    const ref = firebase.database().ref('viajes');
    ref.on('value', snapshot => {
      this.pendientes.length = 0;
        snapshot.forEach(data => {
          this.pendientes.push({ ...data.val(), key: data.key });
        });
      });
  }

  traerChoferes(){
    const ref = firebase.database().ref('usuarios');
    ref.on('value', snapshot => {
      this.choferes.length = 0;
      snapshot.forEach(subSnapshot => {
        subSnapshot.forEach(data => {
          if (data.val().rol == "chofer")
            this.choferes.push({ ...data.val(), key: data.key });
        });
      });
    });
  }

  asignarpendiente(viaje: any, slading) {
    this.mostrarForm = true;
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

}
