import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  editable = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthFbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  editar() {
    this.editable = !this.editable;
  }
  guardar() {

  }

}
