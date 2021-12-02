import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/user.model';
import { Task, TaskSchema } from 'src/models/task/task.model';
import { DtoFunctionsService } from './dto-functions.service';
import { Subtask, SubtaskSchema } from 'src/models/subtask/subtask.model';

@Module({
  providers: [DtoFunctionsService],
  exports: [DtoFunctionsService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: Subtask.name, schema: SubtaskSchema }]),
  ],
})
export class DtoFunctionsModule {}
