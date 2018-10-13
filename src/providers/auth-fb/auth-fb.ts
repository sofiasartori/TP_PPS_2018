import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, FactoryUser } from '../../utils/FactoryUser';
import { UserFb } from '../../models/user-fb';
import { StringsL } from '../Strings';


@Injectable()
export class AuthFbProvider {

  user: User

  constructor(private stringsL:StringsL) {
    console.log('Hello AuthFbProvider Provider');
  }


  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
      firebase.auth().currentUser.sendEmailVerification();
      return user;
    });
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  changePassword(newPass: string) {
    return firebase.auth().currentUser.updatePassword(newPass);
  }

  logout() {
    return firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  setUser(user: UserFb) {
    this.user = FactoryUser.crearUsuario(user,this.stringsL);
  }
}
