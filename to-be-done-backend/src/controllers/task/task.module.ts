import { Module } from '@nestjs/common';
import { ProjectModule } from '../project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/models/project/project.model';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { User, UserSchema } from 'src/models/user/user.model';
import { Task, TaskSchema } from 'src/models/task/task.model';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Subtask, SubtaskSchema } from 'src/models/subtask/subtask.model';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Subtask.name, schema: SubtaskSchema },
    ]),
    DtoFunctionsModule,
  ],
})
export class TaskModule {}
