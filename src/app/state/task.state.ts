import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../shared/models/task.model';
import {AddTask, GetTaskById, RemoveTask, SetTasks, UpdateTask} from '../actions/tasks.actions';
import {TaskService} from '../shared/services/task.service';

export class TaskStateModel {
  tasks: Task[];
  taskById: Task;
}

@State<TaskStateModel>({
  name: 'taskState',
  defaults: {
    tasks: [],
    taskById: null
  }
})

export class TaskState {

  constructor(public service: TaskService) {}
  @Selector()
  static getTasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Selector()
  static getIdTask(state: TaskStateModel) {
    return state.taskById;
  }

  @Action(AddTask)
  add({getState, patchState }: StateContext<TaskStateModel>, { payload }: AddTask) {
    this.service.createTask(payload);
  }

  @Action(RemoveTask)
  remove({getState, patchState }: StateContext<TaskStateModel>, { payload }: RemoveTask) {
    this.service.deleteTask(payload);
  }

  @Action(SetTasks)
  set({getState, patchState }: StateContext<TaskStateModel>, { payload }: SetTasks) {
   this.service.getTasksByUId(payload).subscribe(data => {
     patchState({
       tasks: data
     });
   });
  }

  @Action(GetTaskById)
  get({getState, patchState}: StateContext<TaskStateModel>, { payload }: GetTaskById) {
    const state = getState();
    patchState({
      taskById: state.tasks.find(o => o.id === payload)
    });
  }

  @Action(UpdateTask)
  update({getState, patchState}: StateContext<TaskStateModel>, { payload }: UpdateTask) {
    this.service.updateTask(payload);
  }
}
