import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user.uid));
      } else {
        // localStorage.setItem('user', null);
        this.user = null;
        localStorage.removeItem('user');
      }
  });
}

  user: User;

  logout() {
    this.afAuth.auth.signOut();
  }

  createNewUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('tasks');
    }).catch(() => {
      return false;
    });
  }

  loginEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('tasks');
    });
  }
}
