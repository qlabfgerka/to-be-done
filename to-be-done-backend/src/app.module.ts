import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './controllers/user/auth/auth.module';
import { ProjectModule } from './controllers/project/project.module';
import { TaskModule } from './controllers/task/task.module';
import { Subtask } from './models/subtask/subtask.model';
import { SubtaskModule } from './controllers/subtask/subtask.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProjectModule,
    TaskModule,
    SubtaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
