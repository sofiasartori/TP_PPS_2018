import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';
import { StorageFbProvider } from '../../providers/storage-fb';
import { User } from '../../utils/FactoryUser';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database';
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  editable = true;
  newPass = 'asdfasdfasdf';
  url = '';
  user: any = {};
  mostrarChofer = false;
  foto;

  cameraOptions: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private stringsL: StringsL,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthFbProvider,
    public storageFb: StorageFbProvider,
    private database: DatabaseProvider,
    public alertCtrl: ActionSheetController,
    public platform: Platform,
    private camera: Camera,
  ) {
  }

  ionViewDidLoad() {

    // this.getFoto();
  }
  ionViewWillEnter() {
    this.mostrarChofer = false
    if (this.navParams.get('type') == 'mostrarChofer') {
      this.mostrarChofer = true
      const auto: { patente: string, key: string } = this.navParams.get('auto');
      firebase.database().ref('autos/' + auto.patente).child(auto.key).once('value').then(data => {
        const chofer = data.val().chofer;
        let ref = this.database.getUserInfo(chofer);
        ref.on('value', snapshot => {
          snapshot.forEach(dataUser => {
            this.user = dataUser.val();
            this.getFoto(dataUser.val().email);
          });
        });
      });
    } else {
      this.user = this.auth.user;
      this.getFoto();
    }
  }
  editar() {
    this.newPass = (this.editable) ? '' : 'asdfasdfasdf'
    this.editable = !this.editable;
  }
  guardar() {
    this.auth.changePassword(this.newPass);
    this.guardarFoto();
    this.editar();

  }


  async logout() {
    await this.auth.logout();
    this.navCtrl.setRoot('SigninPage');
  }

  async getFoto(mail?) {
    this.url = await this.storageFb.getClientPhotoUrl(mail);
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
      this.url = 'data:image/jpeg;base64,' + imageData;
      // this.storageFb.uploadPhoto(this.foto);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  guardarFoto() {
    this.storageFb.uploadPhoto(this.foto, this.user.email);
  }
  presentL() {
    const lenguajes = [
      'espanol',
      'Ingles',
      'Aleman',
      'Frances',
      'Portugues',
      'Ruso',
    ];

    let actionSheet = this.alertCtrl.create({
      title: 'Albums',
      buttons: [
        {
          text: 'Español',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[0];
          }
        },
        {
          text: 'Ingles',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[1];
          }
        },
        {
          text: 'Aleman',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[2];
          }
        },
        {
          text: 'Frances',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[3];
          }
        },
        {
          text: 'Portugues',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[4];
          }
        },
        {
          text: 'Ruso',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.stringsL.lenguaje = this.stringsL.lenguajes[5];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }
}
