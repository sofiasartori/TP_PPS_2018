import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgForm } from "@angular/forms";
import { User, FactoryUser } from '../../utils/FactoryUser';
import { DatabaseProvider } from '../../providers/database';


@IonicPage()
@Component({
  selector: 'page-encuesta-cliente-qr',
  templateUrl: 'encuesta-cliente-qr.html',
})
export class EncuestaClienteQrPage {
  dataQr: string = 'asdjhajkdhjkahdjkahs';
  typeQr: string = 'P';
  rangeValue: string;
  radioValue: string;
  selectValue: string;
  checkValue: string;
  comentario: string;
  showForm = true;
  user: User;

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
    console.log('user', this.user);
  }
  guardarEncuesta(form: NgForm) {
    const key = this.user.guardarEncuesta(
      this.rangeValue,
      this.radioValue,
      this.selectValue,
      this.checkValue,
      this.comentario,
      {
        objetoAMedir: this.dataQr,
        tipo: this.typeQr,
      }).key

    if (!key) {
      alert('Error al enviar la encuesta');
    } else {
      alert('Encuesta enviada correctamente');
      this.showForm = false;
      this.limpiarPagina();
    }
  }

  limpiarPagina() {
    this.checkValue = '';
    this.radioValue = '';
    this.rangeValue = '';
    this.selectValue = '';
    this.comentario = '';
  }

  verGraficos() {
    this.navCtrl.push('EncuestaGraficosPage', { user: this.user });
  }
  leerQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.text) {
        const data = barcodeData.text.split(':');
        this.dataQr = data[0];
        this.typeQr = data[1];
        if ((this.dataQr && this.typeQr)) {
          this.showForm = true;
        } else {
          alert('El QR leido no es valido');
          this.showForm = false;
        }
      }
    }, (err) => {
      alert(err);
      this.showForm = false;
      // An error occurred
    });
  }



}
