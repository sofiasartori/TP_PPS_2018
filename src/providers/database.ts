import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { context_usuarios_fb } from '../properties';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  refUsers: firebase.database.Reference;

  constructor() {
    console.log('Hello DatabaseProvider Provider');
    this.refUsers = firebase.database().ref(context_usuarios_fb);
  }

  guardarUsuario(usuario: any) {
    this.refUsers.push(usuario,
      data => console.log('guardar-usuario', data)
    ).then(data => {
      console.log('guardar-usuario2', data)
    });
  }
}
