import {SubTask} from './subTask.model';

export class Task {
  id?: string;
  subject: string;
  body: SubTask[];
  isDone: boolean;
  userId: string;
  imgBase64?: string;
  imgId?: string;
  alarmTimeStamp?: Date;
}
