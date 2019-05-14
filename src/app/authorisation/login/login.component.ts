import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'src/app/shared/services/authorisation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser = false;

  constructor(public authService: AuthorisationService, public router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  switchUserState() {
    this.newUser = !this.newUser;
  }

  onSubmit() {
    const user = this.loginForm.value;
    if (this.newUser) {
      this.authService.createNewUser(user.email, user.password);
    } else {
      this.authService.loginEmail(user.email, user.password);
    }
  }
}
