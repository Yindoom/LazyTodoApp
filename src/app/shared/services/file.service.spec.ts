import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirestorageStub} from '../../Mock/FirebaseMocks';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFireStorage, useClass: FirestorageStub }
    ]
  }));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
