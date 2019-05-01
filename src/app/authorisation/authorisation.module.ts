import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorisationRoutingModule } from './authorisation-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth/auth.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthorisationRoutingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthorisationModule { }
