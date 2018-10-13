import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController, IonicPage } from "ionic-angular";

import { AuthService } from "../../providers/auth";
import { DatabaseProvider } from '../../providers/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageFbProvider } from '../../providers/storage-fb';
import { HomePage } from '../home/home';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';

@IonicPage()
@Component({
  selector: 'page-alta-choferes',
  templateUrl: 'alta-choferes.html',
})
export class AltaChoferesPage {

  email = 'chofer1@gmail.com'
  password = "123456";
  nombre = "Cacho";
  apellido = "Gutierrez"
  foto = '';
  cameraOptions: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private stringsL:StringsL,private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private database: DatabaseProvider,
    private camera: Camera,
    private storageFb: StorageFbProvider,
    public navCtrl: NavController,
    public auth: AuthFbProvider
  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaChoferesPage');
  }

  vaciarForm() {
    this.email = ''
    this.password = "";
    this.nombre = "";
    this.apellido = ""
    this.foto = '';
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Creando Chofer...'
    });
    loading.present();
    this.auth.signup(form.value.email, form.value.password)
      .then(data => {
        console.log("log-in", data)
        loading.dismiss();
        const user = this.email.split('@')[0];
        const userFb = {
          email: this.email,
          nombre: this.nombre,
          apellido: this.apellido,
          user: user,
          rol: 'chofer'
        }
        this.database.guardarUsuario(userFb);
        this.database.guardarChofer(userFb);
        this.auth.setUser(userFb);
        this.storageFb.uploadPhoto(this.foto, this.email);
        loading.dismiss();
        alert('Chofer creado correctamente');
        this.vaciarForm();
        // this.navCtrl.pop();
        // this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.foto = imageData;
      // this.storageFb.uploadPhoto(this.foto);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
