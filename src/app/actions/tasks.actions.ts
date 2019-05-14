import { Task } from '../shared/models/task.model';

export class AddTask {
  static readonly type = '[TASK] Add';

  constructor(public payload: Task) {}
}

export class RemoveTask {
  static readonly type = '[TASK] Remove';

  constructor(public payload: string) {}
}

export class SetTasks {
  static readonly type = '[TASK] Set';

  constructor(public payload: string) {}
}

export class GetTaskById {
  static readonly  type = '[TASK] Get';

  constructor(public payload: string) {}
}

export class UpdateTask {
  static readonly type = '[TASK] Update';

  constructor(public payload: Task) {}
}
