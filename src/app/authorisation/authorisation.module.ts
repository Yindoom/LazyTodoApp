import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorisationRoutingModule } from './authorisation-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthorisationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthorisationModule { }
