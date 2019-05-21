import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthorisationService} from '../../shared/services/authorisation.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginMock;
  let newUserMock;
  let authServiceMock;
  beforeEach(async(() => {
    authServiceMock = jasmine.createSpyObj('AuthorisationService', ['loginEmail', 'createNewUser', 'loginGoogle']);
    loginMock = jasmine.createSpyObj('loginEmail', ['catch']);
    newUserMock = jasmine.createSpyObj('createNewUser', ['catch']);

    authServiceMock.createNewUser.and.returnValue(newUserMock);
    authServiceMock.loginEmail.and.returnValue(loginMock);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthorisationService, useValue: authServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth service for logging in', () => {
    component.onSubmit();

    expect(authServiceMock.loginEmail).toHaveBeenCalledTimes(1);
  });
  it('should call auth service for creating new user', () => {
    component.switchUserState();
    component.onSubmit();

    expect(authServiceMock.createNewUser).toHaveBeenCalledTimes(1);
  });

  it('should call auth service for google', () => {
    component.loginGoogle();

    expect(authServiceMock.loginGoogle).toHaveBeenCalledTimes(1);
  });

  it('should switch newUser state when button is clicked', () => {
    expect(component.newUser).toBe(false);

    component.switchUserState();
    expect(component.newUser).toBe(true);
  });
});
