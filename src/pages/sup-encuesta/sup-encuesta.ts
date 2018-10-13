import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SupEncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sup-encuesta',
  templateUrl: 'sup-encuesta.html',
})
export class SupEncuestaPage {

  constructor(private stringsL:StringsL,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupEncuestaPage');
  }

}
