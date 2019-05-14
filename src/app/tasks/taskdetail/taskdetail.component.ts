import { Observable } from 'rxjs';
import { TaskService } from '../../shared/services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { ActivatedRoute } from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {TaskState} from '../../state/task.state';
import {GetTaskById} from '../../actions/tasks.actions';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  constructor(public service: TaskService, public route: ActivatedRoute, public store: Store) { }

  task: Observable<Task>;

  @Select(TaskState.getIdTask) task$: Observable<Task>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetTaskById(id));
  }

}
