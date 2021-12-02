import { Module } from '@nestjs/common';
import { ProjectModule } from '../project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/models/project/project.model';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { User, UserSchema } from 'src/models/user/user.model';
import { Task, TaskSchema } from 'src/models/task/task.model';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { Subtask, SubtaskSchema } from 'src/models/subtask/subtask.model';

@Module({
  providers: [SubtaskService],
  controllers: [SubtaskController],
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
export class SubtaskModule {}

//tu nisem ziher zato ker more bit subtask znotraj taska
