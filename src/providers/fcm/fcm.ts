import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';

import { Platform } from 'ionic-angular';
// import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    // public afs: AngularFirestore,
    private platform: Platform
  ) { }

  // Get permission from the user
  initialize() {
    firebase.initializeApp({
      apiKey: "AIzaSyAUpIAlovUT_t0CEgThZcbEd3jHNA4OQ9s",
      authDomain: "remiseriacachito.firebaseapp.com"
    })
  }
  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
      console.log("token: ", token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token)
  }
  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    // const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: 'testUser',
    }

    // return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}