import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {AddTask, UpdateTask} from '../../actions/tasks.actions';
import {Select, Store} from '@ngxs/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../shared/models/task.model';
import {SubTask} from '../../shared/models/subTask.model';
import {TaskState} from '../../state/task.state';
import {Observable} from 'rxjs';
import {FileService} from '../../shared/services/file.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  imgId: string;

  constructor(public store: Store, public file: FileService, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddTaskComponent>) { }

  userId: string;
  id: string;
  edit: boolean;

  @Select(TaskState.getIdTask) editTask$: Observable<Task>;

  subtasks: SubTask[];

  addTaskForm = new FormGroup({
    subject: new FormControl(''),
    isDone: new FormControl(''),
    alarmTimeStamp: new FormControl('')
  });
  croppedImage: any = '';
  pic: File;
  changeEvent: any = '';
  text: any;

  imgUrl: string;

  ngOnInit() {
    this.userId = this.data.userId;
    this.edit = this.data.edit;

    if (this.edit) {
      this.parseTask();
    } else {
      this.subtasks = [];
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveTask() {
    const task = this.addTaskForm.value;

    if (task.isDone !== true) {
      task.isDone = this.checkTasks();
    } else {
      this.setTasksDone();
    }

    if (this.croppedImage !== '') {
      task.imgBase64 = this.croppedImage;
    }

    task.body = this.subtasks;
    task.userId = this.userId;

    if (this.edit) {
      task.id = this.id;
      task.imgId = this.imgId;
      this.store.dispatch(new UpdateTask(task));
    } else {
      this.store.dispatch(new AddTask(task));
    }

    this.closeModal();
  }

  setFile(event) {
    this.changeEvent = event;
    this.pic = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  parseTask() {
    this.editTask$.subscribe(task => {
      this.id = task.id;
      this.subtasks = task.body;

      if (task.imgId) {
        this.imgId = task.imgId;
        this.file.getUrlByid(task.imgId).subscribe(url => {
          this.imgUrl = url;
        });
      }
      this.addTaskForm.patchValue({
        subject: task.subject,
        isDone: task.isDone,
        alarmTimeStamp: task.alarmTimeStamp
      });
    });
  }

  addSub(input: string) {
    const sub: SubTask = {
      body: input,
      isDone: false
    };
    this.subtasks.push(sub);
  }

  private checkTasks() {
    for (const sub of this.subtasks) {
      if (!sub.isDone) {
        return false;
      }
    }
    return true;
  }

  private setTasksDone() {
    for (const sub of this.subtasks) {
      sub.isDone = true;
    }
  }
}
