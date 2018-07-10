import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { context_usuarios_fb } from '../properties';
import { UserFb } from '../models/user-fb';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  refUsers: firebase.database.Reference;
  dataUserFb: UserFb = {};

  constructor() {
    console.log('Hello DatabaseProvider Provider');

  }
  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  guardarUsuario(usuario: any) {
    // this.user = firebase.auth().currentUser
    // console.log
    this.refUsers = firebase.database().ref(context_usuarios_fb);
    this.refUsers.push(usuario,
      data => console.log('guardar-usuario', data)
    )
    // this.refUsers.on()
  }

  getUserInfo(email: string) {
    const user = email.split('@')[0];
    this.dataUserFb.user = user;
    return firebase.database().ref('usuarios/' + user).orderByChild('email').equalTo(email);
  }

  setUser(dataUser: any) {
    this.dataUserFb = {
      ...this.dataUserFb,
      ...dataUser
    };
  }
  getEmail() {
    return firebase.auth().currentUser.email;
  }
}
