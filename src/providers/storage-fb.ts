import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { context_fotos_fb } from '../properties';

/*
  Generated class for the StorageFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageFbProvider {

  refFotos: firebase.storage.Reference;

  constructor() {
    console.log('Hello DatabaseProvider Provider');
    this.refFotos = firebase.storage().ref(context_fotos_fb);
  }

  guardarFoto() {

  }
  uploadPhoto(foto, user?): void {
    const mail = firebase.auth().currentUser.email;
    const usuario = mail.split('@')[0];
    // console.log(usuario);
    this.refFotos.child(user + '.jpeg')
      .putString(foto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        // this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  uploadPhotoAuto(foto, patente, index): void {
    // const mail = firebase.auth().currentUser.email;
    // const usuario = mail.split('@')[0];
    // console.log(usuario);
    this.refFotos = firebase.storage().ref('fotos/autos/' + patente);
    this.refFotos.child(index + '.jpeg')
      .putString(foto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        // this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  uploadPhotoEncuesta(foto, key): void {
    // const mail = firebase.auth().currentUser.email;
    // const usuario = mail.split('@')[0];
    // console.log(usuario);
    this.refFotos = firebase.storage().ref('fotos/encuesta/');
    this.refFotos.child(key + '.jpeg')
      .putString(foto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        // this.myPhotoURL = savedPicture.downloadURL;
      });
  }
}
