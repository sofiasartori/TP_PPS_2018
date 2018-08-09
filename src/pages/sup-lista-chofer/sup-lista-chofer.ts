import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { NgForm } from '../../../node_modules/@angular/forms';
import firebase from 'firebase';
/**
 * Generated class for the SupListaChoferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sup-lista-chofer',
  templateUrl: 'sup-lista-chofer.html',
})
export class SupListaChoferPage {
  choferes: Array<{ activo: boolean, user: string, rol: string }> = [];
  mostrarForm = false;
  selectedChofer: any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SupListaChoferPage');
  }
  ionViewWillEnter() {

    const ref = this.database.getUsuarios();
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
  editar(chofer: any, slading) {
    this.mostrarForm = true;
    this.selectedChofer = chofer;
    // this.database.changeUserStatus(user, key, true);
    slading.close();
  }
  eliminar(chofer: any, slading) {
    this.mostrarForm = false;
    // this.database.changeUserStatus(user, key, false);
    firebase.database().ref('usuarios/' + chofer.user).child(chofer.key).remove();
    slading.close()

  }

  editarChofer(form: NgForm) {
    firebase.database().ref('usuarios/' + this.selectedChofer.user).child(this.selectedChofer.key).update(
      {
        nombre: form.value.selectedName,
        apellido: form.value.selectedSurname
      });
    // form.value.selectedName
    // form.value.selectedSurname
  }
}
