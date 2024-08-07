import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/models/project/project.model';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { User, UserSchema } from 'src/models/user/user.model';
import { Task, TaskSchema } from 'src/models/task/task.model';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    DtoFunctionsModule,
  ],
})
export class ProjectModule {}
