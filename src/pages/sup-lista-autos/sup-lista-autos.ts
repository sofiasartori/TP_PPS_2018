import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import firebase from 'firebase';
import { NgForm } from '../../../node_modules/@angular/forms';
/**
 * Generated class for the SupListaAutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sup-lista-autos',
  templateUrl: 'sup-lista-autos.html',
})
export class SupListaAutosPage {

  autos: Array<{ activo: boolean, user: string, rol: string }> = [];
  mostrarForm = false;
  selectedAuto: any = {}
  slading;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaChoferPage');
  }
  ionViewWillEnter() {

    const ref = firebase.database().ref('autos');
    ref.on('value', snapshot => {
      this.autos.length = 0;
      snapshot.forEach(subSnapshot => {
        subSnapshot.forEach(data => {
          // if (data.val().rol == "chofer")
          this.autos.push({ ...data.val(), key: data.key });
        });
      });
    });
  }
  editar(auto: any, slading) {
    this.mostrarForm = true;
    this.selectedAuto = auto;
    // this.database.changeUserStatus(user, key, true);
    slading = slading;
    slading.close();
  }
  eliminar(auto: any, slading) {
    this.mostrarForm = false;
    // this.database.changeUserStatus(user, key, false);
    firebase.database().ref('autos/' + auto.patente).child(auto.key).remove();
    slading.close()

  }

  editarAuto(form: NgForm) {
    firebase.database().ref('autos/' + this.selectedAuto.patente).child(this.selectedAuto.key).update(
      {
        marca: form.value.marca,
        modelo: form.value.modelo
      });
    this.mostrarForm = false;
    // form.value.selectedName
    // form.value.selectedSurname
  }
}
