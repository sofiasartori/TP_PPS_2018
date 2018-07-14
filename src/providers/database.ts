import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { context_usuarios_fb } from '../properties';
import { UserFb, Recorrido } from '../models/user-fb';
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
    this.refUsers = firebase.database().ref(context_usuarios_fb + usuario.user);
    this.refUsers.push(usuario,
      data => console.log('guardar-usuario', data)
    )
    // this.refUsers.on()
  }
  guardarChofer(usuario: any) {
    this.refUsers = firebase.database().ref('choferes' + usuario.user);
    this.refUsers.push(usuario,
      data => console.log('guardar-usuario', data)
    )
  }
  guardarAuto(auto: { marca: string, modelo: string, anio: string, patente: string }) {
    this.refUsers = firebase.database().ref('autos/' + auto.patente);
    this.refUsers.push(auto,
      data => console.log('guardar-usuario', data)
    )
  }
  getUserInfo(email: string) {
    const user = email.split('@')[0];
    this.dataUserFb.user = user;
    return firebase.database().ref('usuarios/' + user)//.orderByChild('email').equalTo(email);
  }

  setUser(dataUser: firebase.database.DataSnapshot) {
    const dataFb = dataUser.val();

    this.dataUserFb = {
      ...this.dataUserFb,
      ...dataFb,
      id_firebase: dataUser.key,
    };
  }
  getEmail() {
    return firebase.auth().currentUser.email;
  }
  guardarNuevaRuta(data: Recorrido) {
    const recorrido = { ...data, email: this.dataUserFb.user, direccion: this.dataUserFb.direccion }
    const refRutas = firebase.database().ref('viajes');
    const refUsuario = firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase);
    refUsuario.update({ recorrido: recorrido });
    refRutas.push(recorrido);
  }

  guardarReserva(data: Recorrido) {
    const recorrido = { ...data, email: this.dataUserFb.user, direccion: this.dataUserFb.direccion }
    const refReservas = firebase.database().ref('reserva');
    const refUsuario = firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase);
    refUsuario.update({ recorrido: recorrido });
    refReservas.push(recorrido);
  }
}
