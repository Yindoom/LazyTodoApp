import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskoverviewComponent } from './taskoverview/taskoverview.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [TaskoverviewComponent, TaskdetailComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    ImageCropperModule

  ]
})
export class TasksModule { }
