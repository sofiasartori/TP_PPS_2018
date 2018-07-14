import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController, IonicPage } from "ionic-angular";

import firebase from 'firebase';

import { AuthService } from "../../providers/auth";
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database';
import { AuthFbProvider } from '../../providers/auth-fb/auth-fb';
import { FactoryUser } from '../../utils/FactoryUser';
import { UserFb } from '../../models/user-fb';
// import { SignupPage } from '../signup/signup';



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  mail = "supervisor@gmail.com";
  password = "123456";

  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private database: DatabaseProvider,
    public auth: AuthFbProvider) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    loading.present();
    this.auth.signin(form.value.mail, form.value.password)
      .then(data => {
        loading.dismiss();
        // firebase.auth().currentUser.
        let ref = this.database.getUserInfo(form.value.mail);
        ref.on('value', snapshot => {
          snapshot.forEach(dataUser => {
            this.database.setUser(dataUser);
            this.auth.setUser(dataUser.val());
            switch (dataUser.val().rol) {
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

