import { Task } from '../models/task.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
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

  getTaskById(id: string): Observable<Task> {
    return this.af.doc<Task>('tasks/' + id).valueChanges();
  }
  deleteTask(id: string) {
    this.af.collection('tasks').doc(id).delete();
  }

  constructor(public af: AngularFirestore) { }

  createTask(task: Task) {
    this.af.collection('tasks').add(task);
  }

  getTasks(): Observable<Task[]> {
    return this.af.collection<Task>('tasks').snapshotChanges().pipe(map(actions => {
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

  updateTask(updatedTask: Task) {
    this.af.collection('tasks').doc(updatedTask.id).set(updatedTask);
  }
}
