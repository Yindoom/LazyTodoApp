import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {of} from 'rxjs';

describe('FileService', () => {
  let fsMock;
  let refMock;
  beforeEach(() => {
    fsMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL']);

    refMock.getDownloadURL.and.returnValue(of('test'));
   // storageMock.ref.and.returnValue(refMock);
    fsMock.ref.and.returnValue(refMock);
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireStorage, useValue: fsMock }
      ]
    });
  });

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });

  it('should return observable string of test', () => {
    const service: FileService = TestBed.get(FileService);
    const t = service.getUrlByid('string');

    t.subscribe(o => {
      expect(o).toBe('test');
    });
  });
});
