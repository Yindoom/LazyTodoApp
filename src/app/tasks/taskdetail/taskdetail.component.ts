import { Observable } from 'rxjs';
import { TaskService } from './../../shared/services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  constructor(public service: TaskService, public route: ActivatedRoute) { }

  task: Observable<Task>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.task = this.service.getTaskById(id);
  }

}
