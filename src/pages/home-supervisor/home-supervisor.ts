import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeSupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-supervisor',
  templateUrl: 'home-supervisor.html',
})
export class HomeSupervisorPage {

  constructor(private stringsL:StringsL,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeSupervisorPage');
  }

  irAEncuesta() {
    this.navCtrl.push('EncuestaClienteQrPage');
  }

  irAltaChoferes() {
    this.navCtrl.push('AltaChoferesPage');
  }

  irAltaAuto() {
    this.navCtrl.push('AltaAutoPage');
  }
}
