import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";

import { AuthService } from "../../providers/auth";
import { DatabaseProvider } from '../../providers/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageFbProvider } from '../../providers/storage-fb';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  email = 'pabloearg@gmail.com'
  password = "123456";
  direccion = "Gorriti 11 Lomas de zamora";
  foto = '';
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private database: DatabaseProvider,
    private camera: Camera,
    private storageFb: StorageFbProvider) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        this.authService.signin(form.value.email, form.value.password).then(data => {
          console.log("log-in", data)
          loading.dismiss();
          this.database.guardarUsuario({ email: this.email, direccion: this.direccion });
          this.storageFb.uploadPhoto(this.foto, this.email);
        }).catch(error => {
          loading.dismiss();
        })

      })
      .catch(error => {
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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.foto = imageData;
      // this.storageFb.uploadPhoto(this.foto);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  guardarFoto() {
    this.storageFb.uploadPhoto(this.foto, this.email);
  }
}
