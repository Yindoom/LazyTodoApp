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
  errorMessage;

  constructor(public authService: AuthorisationService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  switchUserState() {
    this.newUser = !this.newUser;
    this.errorMessage = null;
  }

  onSubmit() {
    const user = this.loginForm.value;
    if (this.newUser) {
      this.authService.createNewUser(user.email, user.password).catch(err => {
        this.errorMessage = err;
      });
    } else {
      this.authService.loginEmail(user.email, user.password).catch(err => {
        this.errorMessage = err;
      });
    }
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }
}
