import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  user: User;

  constructor(public afAuth: AngularFireAuth) {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createNewUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
