import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../Mock/FirebaseMocks';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore, useClass: FirestoreStub}
    ]
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });
});
