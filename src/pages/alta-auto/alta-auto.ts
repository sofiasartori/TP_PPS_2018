import { Component } from '@angular/core';
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
  selector: 'page-alta-auto',
  templateUrl: 'alta-auto.html',
})
export class AltaAutoPage {

  fotos = [];
  tresFotos = false;
  marca = '';
  modelo = '';
  anio = '';
  patente = '';

  ionViewWillLeave() {
    this.fotos = [];
  }
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
    public auth: AuthFbProvider
  ) {
  }
  ViewDidLoad() {
    console.log('ionViewDidLoad AltaChoferesPage');
  }
  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    const auto = {
      marca: form.value.marca,
      modelo: form.value.modelo,
      anio: form.value.anio,
      patente: form.value.patente,
    }
    this.database.guardarAuto(auto);
    this.fotos.forEach((foto, index) => {
      this.storageFb.uploadPhotoAuto(foto, form.value.patente, index);
      this.vaciarForm();
    });
    // this.navCtrl.setRoot(HomePage);
    loading.dismiss();
    alert('Auto creado correctamente');
    // this.navCtrl.pop();
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.fotos.push(imageData);
      // this.storageFb.uploadPhoto(this.foto);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  vaciarForm() {
    this.fotos.length = 0;
    this.marca = '';
    this.modelo = '';
    this.anio = '';
    this.patente = '';
  }
}
