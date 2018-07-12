import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController,IonicPage } from "ionic-angular";

import firebase from 'firebase';

import { AuthService } from "../../providers/auth";
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database';
// import { SignupPage } from '../signup/signup';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  mail = "pabloearg@gmail.com";
  password = "123456";

  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private database: DatabaseProvider) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    loading.present();
    this.database.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        // firebase.auth().currentUser.
        let ref = this.database.getUserInfo(this.mail);
        ref.on('value', snapshot => {
          snapshot.forEach(dataUser => {
            this.database.setUser(dataUser);
            switch (dataUser.val().rol) {
              case 'cliente':
                this.navCtrl.setRoot("EncuestaClienteQrPage");
                break;
              case 'chofer':
                break;
              case 'administrador':
                break;
              default:
                break;
            }
          })
        })
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  guardarUsuario() {
    this.database.guardarUsuario({ email: this.mail, direccion: "somellera 409" });

  }
  goToSignUp() {
    this.navCtrl.push("SignupPage");
  }
}

