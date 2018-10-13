import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';

/**
 * Generated class for the SuListUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-su-list-users',
  templateUrl: 'su-list-users.html',
})
export class SuListUsersPage {
  users: Array<{ activo: boolean, user: string, rol: string }> = []
  constructor(private stringsL:StringsL,public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuListUsersPage');
  }

  ionViewWillEnter() {

    const ref = this.database.getUsuarios();
    ref.on('value', snapshot => {
      this.users.length = 0;
      snapshot.forEach(subSnapshot => {
        subSnapshot.forEach(data => {
          if (data.val().rol == "cliente" || data.val().rol == "chofer")
            this.users.push({ ...data.val(), key: data.key });
        });
      });
    });
  }
  habilitar(user: string, key: string, slading) {

    this.database.changeUserStatus(user, key, true);
    slading.close();
  }
  block(user: string, key: string, slading) {
    this.database.changeUserStatus(user, key, false);
    slading.close()
  }

}
