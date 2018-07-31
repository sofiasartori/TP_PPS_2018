import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { Recorrido } from '../../models/user-fb';

/**
 * Generated class for the MisReservasClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-reservas-cliente',
  templateUrl: 'mis-reservas-cliente.html',
})
export class MisReservasClientePage {
  reservas: Array<Recorrido> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReservasClientePage');
  }
  ionViewWillEnter() {
    this.reservas.length = 0;;
    this.getReservas();
  }
  getReservas(){
    this.database.getReservas().on('value', snapshot => {
      snapshot.forEach((data) => {
        this.reservas.push({ ...data.val(), key: data.key });
      });
    });
  }
}
