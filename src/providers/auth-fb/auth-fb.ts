import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, FactoryUser } from '../../utils/FactoryUser';
import { UserFb } from '../../models/user-fb';


@Injectable()
export class AuthFbProvider {

  user: User

  constructor() {
    console.log('Hello AuthFbProvider Provider');
  }


  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  setUser(user: UserFb) {
    this.user = FactoryUser.crearUsuario(user);
  }
}