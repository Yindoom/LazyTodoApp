import { TaskoverviewComponent } from './taskoverview/taskoverview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';

const routes: Routes = [
  { path: '', component: TaskoverviewComponent },
  { path: 'taskDetail/:id', component: TaskdetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
