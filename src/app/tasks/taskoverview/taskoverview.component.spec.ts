import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskoverviewComponent } from './taskoverview.component';
import {MatCardModule, MatDialogModule} from '@angular/material';
import {AuthorisationService} from '../../shared/services/authorisation.service';
import {NgxsModule} from '@ngxs/store';
import {TaskState} from '../../state/task.state';
import {TaskService} from '../../shared/services/task.service';
import {Observable, of} from 'rxjs';
import {Task} from '../../shared/models/task.model';
import {By} from '@angular/platform-browser';

describe('TaskoverviewComponent', () => {
  let component: TaskoverviewComponent;
  let fixture: ComponentFixture<TaskoverviewComponent>;
  let help: Helper;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
  const mockTaskService = jasmine.createSpyObj('TaskService', ['getTasksByUId', 'deleteTask']);
  beforeEach(async(() => {
    help = new Helper();

    mockTaskService.getTasksByUId.and.returnValue(help.getTasks(5));


    TestBed.configureTestingModule({
      declarations: [ TaskoverviewComponent ],
      imports: [
        MatDialogModule,
        MatCardModule,
        NgxsModule.forRoot([TaskState])
      ],
      providers: [
        {provide: AuthorisationService, useValue: mockAuthService},
        {provide: TaskService, useValue: mockTaskService}
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

  it('should get tasks and show them', () => {

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const li = fixture.debugElement.queryAll(By.css('li'));
      expect(li.length)
        .toBe(5);
    });
  });

  it('should show the subject of a task', () => {
    const htmlSub = fixture.debugElement.queryAll(By.css('mat-card-title'));
    const content = htmlSub[0].nativeElement.textContent;

    expect(content).toBe('test');
  });

  it('should show each task', () => {
    mockTaskService.getTasksByUId.and.returnValue(help.getTasks(9));

    component.ngOnInit();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const li = fixture.debugElement.queryAll(By.css('li'));
      expect(li.length)
        .toBe(9);
    });
  });

  it('should call auth service to log out', () => {
    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalledTimes(1);
  });
});


class Helper {
  tasks = [];
  getTasks(num: Number): Observable<Task[]> {
    this.tasks = [];
    for (let i = 0; i < num; i++) {
      const task: Task = {
        userId: 'test',
        isDone: false,
        subject: 'test',
        body: []
      };
      this.tasks.push(task);
    }
    return of(this.tasks);
  }
}
