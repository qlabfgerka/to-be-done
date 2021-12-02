import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/models/project/project.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { Task, TaskDocument, TaskSchema } from 'src/models/task/task.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';
import { Subtask, SubtaskDocument } from 'src/models/subtask/subtask.model';

@Injectable()
export class SubtaskService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>,
        @InjectModel(Subtask.name)
        private readonly subtaskModel: Model<SubtaskDocument>,
        private readonly dtoFunctions: DtoFunctionsService,
      ) {}
    
      public async createSubtask(taskId: string, userId: string, subtask: Subtask): Promise<Subtask> { // tu morem tudi nastavit da je project owner subtaska in ne user, ker je user owner projecta
        const user = await this.userModel.findById(userId);
        //const project = await this.projectModel.findById(projectId);
        const task = await this.taskModel.findById(taskId);

        subtask.owner = user; //nerazumem zakaj je owner od subtaska user in ne task oz nerazumem zakaj je owner taska user namesto project?

        const newSubtask = new this.subtaskModel(subtask);
        await newSubtask.save();

        //project.tasks.push(newTask.id);

        task.subtasks.push(newSubtask.id);

        await task.save();
    
        return await this.dtoFunctions.subtaskToDTO(newSubtask);
      }
    
      public async getSubtasks(taskId: string): Promise<Array<Subtask>> {
          /*
        const project = await this.dtoFunctions.projectToDTO(await this.projectModel.findById(projectId));
        return project.tasks;
            */

        const task = await this.dtoFunctions.taskToDTO(await this.taskModel.findById(taskId));
        return task.subtasks;
      }

      public async getSubtask(subtaskId: string): Promise<Subtask> {
        const subtask = await this.dtoFunctions.subtaskToDTO(await this.subtaskModel.findById(subtaskId));
        return subtask;
      }
    
      public async removeSubtask(subtaskId: string): Promise<void> { 
        const subtask = await this.subtaskModel.findById(subtaskId);
        const task = await this.taskModel.findOne({ subtasks: { $in: [subtask] } }).populate('subtasks');

        task.subtasks = task.subtasks.filter(subtask => subtask.id != subtaskId);
        await task.save();

        await this.subtaskModel.findByIdAndDelete(subtaskId);
      }
    
      public async editSubtask(subtask: Subtask): Promise<Subtask> {
        const edit = await this.subtaskModel.findById(subtask.id).populate('owner');
        for(const editKey of Object.keys(await this.dtoFunctions.subtaskToDTO(edit)).filter(v => v.indexOf('id') == -1 && v != '__v' && v != 'owner')) {
            if([undefined, null].indexOf(edit[editKey]) != -1) {
              continue;
            }
            edit[editKey] = subtask[editKey];
        }

        await edit.save();
    
        return await this.dtoFunctions.subtaskToDTO(edit);
      }
}
