import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tasks', loadChildren: './tasks/tasks.module#TasksModule'},
  { path: 'login', loadChildren: './authorisation/authorisation.module#AuthorisationModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
