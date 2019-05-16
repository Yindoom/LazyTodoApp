import { AuthorisationService } from '../../shared/services/authorisation.service';
import { Task } from '../../shared/models/task.model';
import { Observable } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TaskState } from '../../state/task.state';
import {Select, Store} from '@ngxs/store';
import {GetTaskById, RemoveTask, SetTasks} from '../../actions/tasks.actions';
import {AddTaskComponent} from '../add-task/add-task.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-taskoverview',
  templateUrl: './taskoverview.component.html',
  styleUrls: ['./taskoverview.component.css']
})

export class TaskoverviewComponent implements OnInit {

userId;

  @Select(TaskState.getTasks) tasks$: Observable<Task[]>;

  constructor(public auth: AuthorisationService, public store: Store, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user');
    this.store.dispatch(new SetTasks(this.userId));
  }

  logout() {
    this.auth.logout();
  }

  deleteTask(id: string) {
    this.store.dispatch(new RemoveTask(id));
  }
  addTask() {
    const ref = this.dialog.open(AddTaskComponent, { data: { userId: this.userId }});
  }

  editTask(id: string) {
    this.store.dispatch(new GetTaskById(id)).subscribe(t => {
      const ref = this.dialog.open(AddTaskComponent, {
        data: { userId: this.userId, edit: true }});
    });
  }
}
