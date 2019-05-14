import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskoverviewComponent } from './taskoverview/taskoverview.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {AddTaskComponent} from './add-task/add-task.component';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [TaskoverviewComponent, TaskdetailComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatDialogModule,
    FormsModule,
    MatCardModule
  ],
  entryComponents: [ AddTaskComponent ]
})
export class TasksModule { }
