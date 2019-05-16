import { TestBed } from '@angular/core/testing';

import { AuthorisationService } from './authorisation.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuthStub} from '../../Mock/FirebaseMocks';

describe('AuthorisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: AngularFireAuth, useClass: FirebaseAuthStub
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthorisationService = TestBed.get(AuthorisationService);
    expect(service).toBeTruthy();
  });
});
