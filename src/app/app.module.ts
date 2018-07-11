import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../providers/auth';
import { SignupPage } from '../pages/signup/signup';
import { DatePicker } from '@ionic-native/date-picker';
import { DatabaseProvider } from '../providers/database';
import { StorageFbProvider } from '../providers/storage-fb';
import { ReservaViajePage } from '../pages/reserva-viaje/reserva-viaje';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    ReservaViajePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    ReservaViajePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FcmProvider,
    Firebase,
    QRScanner,
    Camera,
    AuthService,
    DatePicker,
    DatabaseProvider,
    StorageFbProvider
  ]
})
export class AppModule { }
