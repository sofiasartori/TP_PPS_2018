import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { context_usuarios_fb } from '../properties';
import { UserFb, Recorrido } from '../models/user-fb';
import { ViajePendiente } from '../models/in-viaje-pendiente';
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
    this.refUsers = firebase.database().ref('choferes/' + usuario.user);
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
  guardarNuevaRuta(data: any, callback: Function) {
    const recorrido: ViajePendiente = {
      ...data,
      email: this.dataUserFb.email,
      cliente: this.dataUserFb.user,
      finalizado: false
    }
    const refRutas = firebase.database().ref('viajes');
    // const refUsuario = firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase);
    // refUsuario.update({ recorrido: recorrido });
    return refRutas.push(recorrido, () => { callback() });
  }

  checkSiChoferTieneAuto(callback: Function) {
    let autoR = null;
    firebase.database().ref('autos/').on('value', autos => {
      autos.forEach(keys => {
        keys.forEach(auto => {
          const pepe = auto.val();
          if (auto.val().chofer == this.dataUserFb.user) {
            autoR = auto;
          }
        })
      })
      callback(autoR);
    })

    // firebase.database().ref('autos/' + auto.patente).child(auto.key).once('value').then(data => {
    //   const chofer = data.val().chofer;
    //   let ref = this.database.getUserInfo(chofer);
    //   ref.on('value', snapshot => {
    //     snapshot.forEach(dataUser => {
    //       this.user = dataUser.val();
    //       this.getFoto(dataUser.val().email);
    //     });
    //   });
    // });
    // callback();
  }

  guardarReserva(data: Recorrido) {
    const recorrido = { ...data, email: firebase.auth().currentUser.email, cliente: this.dataUserFb.user }
    const refReservas = firebase.database().ref('reservas');
    // const refUsuario = firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase);
    // refUsuario.update({ recorrido: recorrido });
    return refReservas.push(recorrido);
  }
  getReservas() {
    return firebase.database().ref('reservas');
    //.child(this.dataUserFb.id_firebase).child('reservas');

    // return firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase).child('reservas');
  }

  getViaje(callback: Function) {
    let viaje;
    return firebase.database().ref('viajes').on('value', snapshot => {
      snapshot.forEach(data => {
        if (data.val().email = this.dataUserFb.email)
          viaje = data;
      })
      callback(viaje);

    })
    //.child(this.dataUserFb.id_firebase).child('reservas');

    // return firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase).child('reservas');
  }

  getChofer(user: string, callback: Function) {
    let chofer;
    return firebase.database().ref('choferes').on('value', snapshot => {
      snapshot.forEach(data => {
        if (data.val().user = user)
          chofer = data;
      })
      callback(chofer);

    })
    //.child(this.dataUserFb.id_firebase).child('reservas');

    // return firebase.database().ref('usuarios/' + this.dataUserFb.user).child(this.dataUserFb.id_firebase).child('reservas');
  }

  getChoferes(callback: Function) {
    let choferes = [];
    return firebase.database().ref('choferes').on('value', snapshot => {
      snapshot.forEach(data2 => {
        data2.forEach(data => {
          choferes.push({ ...data.val(), key: data.key });
        });
      })
      callback(choferes);
    });

  }

  removeViaje(key, callback: Function) {
    firebase.database().ref('viajes/').child(key).remove(() => callback());
  }
  guardarSinKey() {
    var user = firebase.auth().currentUser;
    var usersRef = firebase.database().ref("users");
    if (user) {
      usersRef.child(user.uid).set({
      });
    }
  }

  getAuto(key: string) {
    const refAuto = firebase.database().ref('autos/' + key);
    // refAuto.on()

  }
  getUsuarios() {
    return firebase.database().ref('usuarios');
  }
  changeUserStatus(user: string, key: string, value) {
    firebase.database().ref("usuarios/" + user).child(key).update({ activo: value });
  }




}
