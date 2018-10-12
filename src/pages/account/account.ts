import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';
import { StorageFbProvider } from '../../providers/storage-fb';
import { User } from '../../utils/FactoryUser';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database';
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
  user: User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthFbProvider,
    public storageFb: StorageFbProvider,
    private database: DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    // this.getFoto();
  }
  ionViewWillEnter() {
    if (this.navParams.get('type') == 'mostrarChofer') {
      const auto: { patente: string, key: string } = this.navParams.get('auto');
      firebase.database().ref('autos/' + auto.patente).child(auto.key).once('value').then(data => {
        const chofer = data.val().email;
        let ref = this.database.getUserInfo(chofer);
        ref.on('value', snapshot => {
          snapshot.forEach(dataUser => {
            this.user = dataUser.val();
            this.getFoto(chofer);
          });
        });
      });
    } else {
      this.user = this.auth.user;
      this.getFoto();
    }
  }
  editar() {
    this.newPass = (this.editable) ? '' : 'asdfasdfasdf'
    this.editable = !this.editable;
  }
  guardar() {
    this.auth.changePassword(this.newPass);
  }

  async logout(){
    await this.auth.logout();
    this.navCtrl.setRoot('SigninPage');
  }

  async getFoto(mail?) {
    this.url = await this.storageFb.getClientPhotoUrl(mail);
  }
}
