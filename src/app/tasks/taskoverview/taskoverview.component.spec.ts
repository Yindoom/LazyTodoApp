import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskoverviewComponent } from './taskoverview.component';

describe('TaskoverviewComponent', () => {
  let component: TaskoverviewComponent;
  let fixture: ComponentFixture<TaskoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskoverviewComponent ]
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
