import { TestBed } from '@angular/core/testing';

import { AuthorisationService } from './authorisation.service';
import {AngularFireAuth} from '@angular/fire/auth';

describe('AuthorisationService', () => {
  let fireAuthMock;
  let authMock;
  let service: AuthorisationService;
  beforeEach(() => {
    authMock = jasmine.createSpyObj('auth', ['logout', 'createUserWithEmailAndPassword',
      'signInWithEmailAndPassword', 'signInWithPopup']);
    fireAuthMock = jasmine.createSpyObj('AngularFireAuth', ['auth']);

    fireAuthMock.auth.and.returnValues([authMock]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth, useValue: fireAuthMock
        }
      ]
    });
    service = TestBed.get(AuthorisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
