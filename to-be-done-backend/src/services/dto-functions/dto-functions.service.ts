import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/models/project/project.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { Task, TaskDocument } from 'src/models/task/task.model';
import { Subtask, SubtaskDocument } from 'src/models/subtask/subtask.model';

@Injectable()
export class DtoFunctionsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Subtask.name)
    private readonly subtaskModel: Model<SubtaskDocument>,
  ) {}

  public userToDTO(user: User): User {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
    };

    return userDTO;
  }

  public usersToDTO(users: Array<User>): Array<User> {
    const usersDTO = new Array<User>();

    for (const user of users) {
      usersDTO.push(this.userToDTO(user));
    }

    return usersDTO;
  }

  public async taskToDTO(task: Task): Promise<Task> {

    console.log(task);

    if (!task) return undefined;

    const subtasks = [];
    for(const subtask of task.subtasks) {
      subtasks.push(await this.subtaskToDTO(await this.subtaskModel.findById(subtask)));
    }

    const taskDTO: Task = {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed,
      owner: this.userToDTO(await this.getUser(task.owner)),
      subtasks: subtasks
    };

    return taskDTO;
  }

  public async tasksToDTO(tasks: Array<Task>): Promise<Array<Task>> {
    const tasksDTO = new Array<Task>();

    for (const task of tasks) {
      tasksDTO.push(await this.taskToDTO(task));
    }

    return tasksDTO;
  }

  public async projectToDTO(project: Project): Promise<Project> {
    const tasks = [];
    for(const task of project.tasks) {
      tasks.push(await this.taskToDTO(await this.taskModel.findById(task)));
    }

    const projectDTO: Project = {
      id: project.id,
      title: project.title,
      description: project.description,
      owner: this.userToDTO(await this.getUser(project.owner)),
      tasks: tasks
    };

    return projectDTO;
  }

  public async projectsToDTO(
    projects: Array<Project>,
  ): Promise<Array<Project>> {
    const projectsDTO = new Array<Project>();

    for (const project of projects) {
      projectsDTO.push(await this.projectToDTO(project));
    }

    return projectsDTO;
  }

  public async getUser(user: User): Promise<User> {
    if (!user) return undefined;
    if (user.nickname) return await this.userModel.findById(user.id);
    return await this.userModel.findById(user.toString());
  }

  /*
  public async getTask(task: Task): Promise<Task> {
    if (!task) return undefined;
    if (task.id) return await this.taskModel.findById(task.id);
    return await this.taskModel.findById(task.toString());
  }

  */

  public async subtaskToDTO(subtask: Subtask): Promise<Subtask> {
    if (!subtask) return undefined;
    const subtaskDTO: Subtask = {
      id: subtask.id,
      title: subtask.title,
      description: subtask.description,
      dueDate: subtask.dueDate,
      completed: subtask.completed,
      owner: this.userToDTO(await this.getUser(subtask.owner)) // task more bit owner subtaska task
      
    };

    return subtaskDTO;
  }

  public async subtasksToDTO(subtasks: Array<Subtask>): Promise<Array<Subtask>> {
    const subtasksDTO = new Array<Subtask>();

    for (const subtask of subtasks) {
      subtasksDTO.push(await this.subtaskToDTO(subtask));
    }

    return subtasksDTO;
  }

  
}
