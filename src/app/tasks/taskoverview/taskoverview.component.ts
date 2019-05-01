import { AuthorisationService } from '../../shared/services/authorisation.service';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-taskoverview',
  templateUrl: './taskoverview.component.html',
  styleUrls: ['./taskoverview.component.css']
})
export class TaskoverviewComponent implements OnInit {

tasks: Observable<Task[]>;
userId;

addTaskForm = new FormGroup({
  body: new FormControl(''),
  isDone: new FormControl('')
});
  croppedImage: any = '';
  pic: File;
  changeEvent: any = '';

  constructor(public service: TaskService, public router: Router, public auth: AuthorisationService) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'));
    this.tasks = this.service.getTasksByUId(this.userId);
  }

  saveTask() {
    const task = this.addTaskForm.value;
    if (task.isDone !== true) {
      task.isDone = false;
    }
    if (this.croppedImage !== '') {
      task.imgBase64 = this.croppedImage;
    }
    task.userId = this.userId;
    this.service.createTask(task);
  }

  deleteTask(id: string) {
    this.service.deleteTask(id);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  setFile(event) {
    this.changeEvent = event;
    this.pic = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
