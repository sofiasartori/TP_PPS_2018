import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';
import { StorageFbProvider } from '../../providers/storage-fb';

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
  newPass = 'asdfasdfasdf';
  url = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthFbProvider,
    public storageFb: StorageFbProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.getFoto();
  }
  editar() {
    this.newPass = (this.editable) ? '' : 'asdfasdfasdf'
    this.editable = !this.editable;
  }
  guardar() {
    this.auth.changePassword(this.newPass);
  }

  async getFoto() {
    this.url = await this.storageFb.getClientPhotoUrl();
  }
}
