import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FileService} from '../../shared/services/file.service';
import {NgxsModule} from '@ngxs/store';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {By} from '@angular/platform-browser';
import { Task } from '../../shared/models/task.model';
import {of} from 'rxjs';
import {TaskState} from '../../state/task.state';
import {TaskService} from '../../shared/services/task.service';
import {GetTaskById, SetTasks} from '../../actions/tasks.actions';

describe ('AddTaskComponent', () => {

  const model = {
    userId: '',
    edit: false
  };
  const input: Task[] = [
    { subject: 'test', isDone: false, userId: 'test', body: [], id: 'test'},
    { subject: 'test', isDone: false, userId: 'test', body: [], id: 'test2'},
    { subject: 'test', isDone: false, userId: 'test', body: [], id: 'test3'}
  ];

  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let fileServiceMock;
  let taskServiceMock;

  beforeEach(async(() => {
    fileServiceMock = jasmine.createSpyObj('FileService', ['getUrlByid']);
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasksByUId', 'createTask', 'updateTask']);

    taskServiceMock.getTasksByUId.and.returnValue(of(input));

    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      imports: [
        ReactiveFormsModule,
        ImageCropperModule,
        NgxsModule.forRoot([TaskState]),
        MatDialogModule
      ],
      providers: [
        {provide: FileService, useValue: fileServiceMock},
        {provide: MatDialogRef, useValue: { close: () => { } } },
        {provide: MAT_DIALOG_DATA, useValue: model},
        {provide: TaskService, useValue: taskServiceMock}
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
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });

  it('should be add a subtask when add button is clicked', () => {
    expect(component.subtasks.length).toBe(0);
    component.addSub('Test Sub');
    expect(component.subtasks.length).toBe(1);
  });

  it('should have a button to go back as the first button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBeGreaterThan(1);
    const backButton: HTMLButtonElement = buttons[0].nativeElement;
    expect(backButton.textContent).toBe('<--');
  });

  it('should parse task subject, when editing', () => {
    fixture.detectChanges();

    component.store.dispatch(new SetTasks('test'));
    component.store.dispatch(new GetTaskById('test'));

    component.parseTask();

    fixture.whenStable().then(() => {
      const sub: HTMLInputElement = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
      expect(sub.value).toBe('test');
    });
  });

  it('should display subtasks', () => {
    component.addSub('test');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const list = fixture.debugElement.queryAll(By.css('li'));
      expect(list.length).toBe(1);
    });
  });

  it('should have an input for all subs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input')).length;

    component.addSub('test');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('input')).length).toBeGreaterThan(inputs);
    });
  });



  it('should have a button to add subtasks', () => {
    const butts = fixture.debugElement.queryAll(By.css('button'));
    const butt = butts.find(o => {
      return o.nativeElement.textContent === '+';
    });

    expect(butt).toBeTruthy();
  });


  it('should call save method when save is clicked', async () => {
    const butt: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button')).find(o => {
      return o.nativeElement.textContent === 'Save';
    }).nativeElement;

    spyOn(component, 'saveTask');
    butt.click();

    expect(component.saveTask).toHaveBeenCalledTimes(1);
  });


  it('should close modal after save', () => {
    const butt: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button')).find(o => {
      return o.nativeElement.textContent === 'Save';
    }).nativeElement;

    spyOn(component, 'closeModal');

    butt.click();

    expect(component.closeModal).toHaveBeenCalledTimes(1);
  });


  it('should add subs when addsub is clicked', () => {
    const butt: HTMLButtonElement = fixture.debugElement.queryAll(By.css('button')).find(o => {
      return o.nativeElement.textContent === '+';
    }).nativeElement;

    butt.click();
    butt.click();
    butt.click();

    expect(component.subtasks.length).toBe(3);
  });


  it('should have a datetimepicker', () => {
    const butt: HTMLInputElement = fixture.debugElement.queryAll(By.css('input')).find(o => {
      return o.nativeElement.id === 'timeStamp';
    }).nativeElement;

    expect(butt).toBeTruthy();
  });
});
