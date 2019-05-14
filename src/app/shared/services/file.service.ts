import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(public storage: AngularFireStorage) { }

  getUrlByid(id: string): Observable<any> {
    return this.storage.ref('task-pictures/' + id).getDownloadURL();
  }
}
