import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';



import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<{ title: string, component: any }>;

  showSplash=true;
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public fcm: FcmProvider,
    public toastCtrl: ToastController) {
    // console.log("es android", this.platform._platforms)
    firebase.initializeApp({
      apiKey: "AIzaSyAUpIAlovUT_t0CEgThZcbEd3jHNA4OQ9s",
      authDomain: "remiseriacachito.firebaseapp.com",
      databaseURL: "https://remiseriacachito.firebaseio.com",
      storageBucket: "remiseriacachito.appspot.com",
      projectId: "remiseriacachito"

    })
    if (!this.platform.is('mobileweb')) {
      this.initializeApp();
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: SigninPage },
      { title: 'SignUp', component: SignupPage },
      { title: 'Inicio', component: HomePage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
      // this.fcm.getToken().then(data => {
      //   console.log("data: ", data)
      // });

      this.fcm.getToken()

      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap((msg: any) => {
          // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
        .subscribe()

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
