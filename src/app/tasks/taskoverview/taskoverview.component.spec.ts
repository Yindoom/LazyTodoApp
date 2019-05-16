import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskoverviewComponent } from './taskoverview.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatDialogModule} from '@angular/material';
import {AuthorisationService} from '../../shared/services/authorisation.service';
import {AuthorisationserviceStub} from '../../Mock/ServiceMocks';
import {NgxsModule} from '@ngxs/store';
import {TaskState} from '../../state/task.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../Mock/FirebaseMocks';

describe('TaskoverviewComponent', () => {
  let component: TaskoverviewComponent;
  let fixture: ComponentFixture<TaskoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskoverviewComponent ],
      imports: [
        MatDialogModule,
        MatCardModule,
        NgxsModule.forRoot([TaskState])
      ],
      providers: [
        {provide: AuthorisationService, useClass: AuthorisationserviceStub},
        {provide: AngularFirestore, useClass: FirestoreStub}


      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
