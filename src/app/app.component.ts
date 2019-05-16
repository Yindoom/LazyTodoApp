import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lazy2Do';

  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', user.uid);
        this.router.navigateByUrl('tasks');
      } else {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      }
    }, error1 => console.log(error1));
  }
}
