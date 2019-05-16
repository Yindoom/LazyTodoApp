import { Task } from '../models/task.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public af: AngularFirestore) { }

  getTasksByUId(userId: string): Observable<Task[]> {
    return this.af.collection<Task>('tasks', ref => ref.where('userId', '==', userId)).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Task;
        return {
          id: action.payload.doc.id,
          subject: data.subject,
          body: data.body,
          isDone: data.isDone,
          userId: data.userId,
          imgId: data.imgId,
          alarmTimeStamp: data.alarmTimeStamp
        };
      });
    }));
  }

  deleteTask(id: string) {
    this.af.collection('tasks').doc(id).delete();
  }

  createTask(task: Task) {
    this.af.collection('tasks').add(task);
  }

  updateTask(updatedTask: Task) {
    this.af.collection('tasks').doc(updatedTask.id).set(updatedTask);
  }
}
