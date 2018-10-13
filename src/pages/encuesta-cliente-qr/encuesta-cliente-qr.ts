import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  key: string = 'asdjhajkdhjkahdjkahs';
  patente: string = 'P';
  rangeValue: string;
  radioValue: string;
  selectValue: string;
  checkValue: string;
  comentario: string;
  showForm = false;
  user: User;
  auto: { patente: string, key: string };
  constructor(private stringsL:StringsL,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private database: DatabaseProvider,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaClienteQrPage');
  }
  ionViewDidEnter() {
    // this.leerQR();
    this.user = FactoryUser.crearUsuario(this.database.dataUserFb,this.stringsL);
    this.auto = this.navParams.get('auto');
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
        objetoAMedir: this.key,
        tipo: this.patente,
      }).key

    if (!key) {
      alert('Error al enviar la encuesta');
    } else {
      alert(this.stringsL.Encuesta[this.stringsL.lenguaje] +' enviada correctamente');
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
    this.navCtrl.push('EncuestaGraficosPage', { user: this.user, qr: { patente: this.patente, key: this.key } });
  }
  leerQR() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then((barcodeData) => {
        if (barcodeData.text) {
          const data = barcodeData.text.split('/');
          this.key = data[1];
          this.patente = data[0];
          if ((this.key && this.patente)) {
            this.showForm = true;
          } else {
            alert('El QR leido no es valido');
            this.showForm = false;
          }
        } else {
          this.key = 'POP111';
          this.patente = '-LJMIoAG3zWwy6o3sSF3';
          if ((this.key && this.patente)) {
            this.showForm = true;
          }
          alert(this.key)
        }
      }, (err) => {
        alert(err);
        this.showForm = false;
        // An error occurred
      });
    } else {
      this.patente = 'POP112';
      this.key = '-LJMIoAG3zWwy6o3sSF3';
      if ((this.key && this.patente)) {
        this.showForm = true;
      }
      // alert(this.key)
    }
  }



}
