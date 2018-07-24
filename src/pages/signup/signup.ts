import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController, IonicPage } from "ionic-angular";

import { AuthService } from "../../providers/auth";
import { DatabaseProvider } from '../../providers/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageFbProvider } from '../../providers/storage-fb';
import { HomePage } from '../home/home';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';
import { FactoryUser } from '../../utils/FactoryUser';
import { ConfigProvider } from '../../providers/config';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email = 'pabloearg@gmail.com'
  password = "123456";
  direccion = "Gorriti 11 Lomas de zamora";
  foto = '';
  fotoPantalla = '';
  cameraOptions: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private database: DatabaseProvider,
    private camera: Camera,
    private storageFb: StorageFbProvider,
    public navCtrl: NavController,
    public auth: AuthFbProvider,
    public config: ConfigProvider
  ) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.auth.signup(form.value.email, form.value.password)
      .then(data => {
        this.auth.signin(form.value.email, form.value.password)
          .then(data => {
            console.log("log-in", data)
            loading.dismiss();
            const user = form.value.email.split('@')[0];
            const userFb = { email: form.value.email, direccion: form.value.direccion, user: user, rol: 'cliente' }
            this.database.guardarUsuario(userFb);
            this.auth.setUser(userFb);
            this.storageFb.uploadPhoto(this.foto, form.value.email);
            this.config.sideMenu = this.auth.user.sideMenu;
            // this.navCtrl.setRoot(HomePage);
            switch (this.auth.user.rol) {
              case 'cliente':
                this.navCtrl.setRoot("EncuestaClienteQrPage");
                break;
              case 'chofer':
                break;
              case 'supervisor':
                this.navCtrl.setRoot("HomeSupervisorPage");
                break;
              default:
                break;
            }
          }).catch(error => {
            loading.dismiss();
          })
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

  sacarFoto() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
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
      this.fotoPantalla = 'data:image/jpeg;base64,' + imageData;
      // this.storageFb.uploadPhoto(this.foto);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  guardarFoto() {
    this.storageFb.uploadPhoto(this.foto, this.email);
  }
}

