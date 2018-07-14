import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { AuthService } from '../providers/auth';
import { DatePicker } from '@ionic-native/date-picker';
import { DatabaseProvider } from '../providers/database';
import { StorageFbProvider } from '../providers/storage-fb';
import { BarcodeScanner } from '../../node_modules/@ionic-native/barcode-scanner';
import { AuthFbProvider } from '../providers/auth-fb/auth-fb';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
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
    StorageFbProvider,
    BarcodeScanner,
    AuthFbProvider,
    LaunchNavigator,
    Geolocation
  ]
})
export class AppModule { }
