import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FileService} from '../../shared/services/file.service';
import {FileserviceStub} from '../../Mock/ServiceMocks';
import {NgxsModule} from '@ngxs/store';
import {TaskState} from '../../state/task.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../Mock/FirebaseMocks';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {By} from '@angular/platform-browser';

describe('AddTaskComponent', () => {

  const model = {
    userId: '',
    edit: false
  };
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      imports: [
        ReactiveFormsModule,
        ImageCropperModule,
        NgxsModule.forRoot([TaskState]),
        MatDialogModule
      ],
      providers: [
        {provide: FileService, useClass: FileserviceStub},
        {provide: AngularFirestore, useClass: FirestoreStub},
        {provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } } },
        {provide: MAT_DIALOG_DATA, useValue: model}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be add a subtask when add button is clicked', () => {
    expect(component.subtasks.length).toBe(0);
    component.addSub('Test Sub');
    expect(component.subtasks.length).toBe(1);
  });

  it('should display subtasks',  () => {
    component.addSub('Test');
    const h3El = fixture.debugElement.query(By.css('h3'));
    const h3Html: HTMLHeadElement = h3El.nativeElement;
    expect(h3Html.textContent).toBe('Test');
  });

  it('should have a button to go back as the first button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBeGreaterThan(1);
    const backButton: HTMLButtonElement = buttons[0].nativeElement;
    expect(backButton.textContent).toBe('<--');
  });

  it('should close component when closed', () => {
    const closeButton: HTMLButtonElement = fixture.debugElement.queryAll(
      By.css('button'))[0].nativeElement;

    closeButton.click();
    expect(component).toBeFalsy();
  });
});
