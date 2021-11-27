import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/models/project/project.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { Task, TaskDocument } from 'src/models/task/task.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>,
        private readonly dtoFunctions: DtoFunctionsService,
      ) {}
    
      public async createTask(projectId: string, userId: string, task: Task): Promise<Task> {
        const user = await this.userModel.findById(userId);
        const project = await this.projectModel.findById(projectId);

        task.owner = user;
        const newTask = new this.taskModel(task);
        await newTask.save();

        project.tasks.push(newTask.id);
        await project.save();
    
        return await this.dtoFunctions.taskToDTO(newTask);
      }
    
      public async getTasks(projectId: string): Promise<Array<Task>> {
        const project = await this.dtoFunctions.projectToDTO(await this.projectModel.findById(projectId));
        return project.tasks;
      }

      public async getTask(taskId: string): Promise<Task> {
        const task = await this.dtoFunctions.taskToDTO(await this.taskModel.findById(taskId));
        return task;
      }
    
      public async removeTask(taskId: string): Promise<void> { 
        const task = await this.taskModel.findById(taskId);
        const project = await this.projectModel.findOne({ tasks: { $in: [task] } }).populate('tasks');

        project.tasks = project.tasks.filter(task => task.id != taskId);
        await project.save();

        await this.taskModel.findByIdAndDelete(taskId);
      }
    
      public async editTask(task: Task): Promise<Task> {
        const edit = await this.taskModel.findById(task.id).populate('owner');
        for(const editKey of Object.keys(await this.dtoFunctions.taskToDTO(edit)).filter(v => v.indexOf('id') == -1 && v != '__v' && v != 'owner')) {
            if([undefined, null].indexOf(edit[editKey]) != -1) {
              continue;
            }
            edit[editKey] = task[editKey];
        }

        await edit.save();
    
        return await this.dtoFunctions.taskToDTO(edit);
      }
}
