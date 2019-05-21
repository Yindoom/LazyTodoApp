import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {Task} from '../models/task.model';
import {of} from 'rxjs';

describe('TaskService', () => {
  const input: Task[] = [
    { subject: 'test', isDone: false, userId: 'test', body: [], id: 'test'},
    { subject: 'test', isDone: false, userId: 'test', body: []},
    { subject: 'test', isDone: false, userId: 'test', body: []}
  ];

  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let docMock: any;
  let service: TaskService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'doc', 'add']);
    docMock = jasmine.createSpyObj('doc', ['delete', 'set']);

    fsCollectionMock.doc.and.returnValue(docMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of(input));
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock}
      ]
    });
    service = TestBed.get(TaskService);
  });

  it('should be created', () => {
    service = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should call firestore for create', () => {
    service.createTask(input[0]);

    expect(fsCollectionMock.add).toHaveBeenCalledTimes(1);
  });

  it('should call firestore for update', () => {
    service.updateTask(input[0]);

    expect(docMock.set).toHaveBeenCalledTimes(1);
  });

  it('should call firestore for delete', () => {
    service.deleteTask('test');

    expect(docMock.delete).toHaveBeenCalledTimes(1);
  });
});
