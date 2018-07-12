import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgForm } from "@angular/forms";
import { User, FactoryUser } from '../../utils/FactoryUser';
import { DatabaseProvider } from '../../providers/database';

/**
 * Generated class for the EncuestaClienteQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-cliente-qr',
  templateUrl: 'encuesta-cliente-qr.html',
})
export class EncuestaClienteQrPage {
  dataQr: string;

  user :User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaClienteQrPage');
  }
  ionViewDidEnter() {
    // this.leerQR();
    this.user = FactoryUser.crearUsuario(this.database.dataUserFb)
    console.log(this.user);
  }
  guardarEncuesta(form: NgForm) {

  }

  leerQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.text) {
        this.dataQr = barcodeData.text;
      }
    }, (err) => {
      alert(err);
      // An error occurred
    });
  }



}
