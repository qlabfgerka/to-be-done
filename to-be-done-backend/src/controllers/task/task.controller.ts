import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Param,
    Delete,
    Put,
    Query
} from '@nestjs/common';
import { Project } from 'src/models/project/project.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { TaskService } from './task.service';
import { Task } from 'src/models/task/task.model';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async createProject(@Body('task') task: Task, @Query('projectId') projectId: string, @Request() req: any): Promise<Task> {
        return await this.taskService.createTask(projectId, req.user.id, task);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getTasks(@Query('projectId') projectId: string): Promise<Array<Task>> {
        return await this.taskService.getTasks(projectId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getTask(@Param('id') id: string): Promise<Task> {
        return await this.taskService.getTask(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async remoteTask(@Param('id') id: string): Promise<void> {
        await this.taskService.removeTask(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    public async editTask(@Body('task') task: Task): Promise<Task> {
        return await this.taskService.editTask(task);
    }

}
