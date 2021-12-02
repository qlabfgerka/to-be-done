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
import { SubtaskService } from './subtask.service';
import { Subtask } from 'src/models/subtask/subtask.model';

@Controller('subtask')
export class SubtaskController {
    constructor(private readonly subtaskService: SubtaskService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async createSubtask(@Body('subtask') subtask: Subtask, @Query('taskId') taskId: string, @Request() req: any): Promise<Subtask> { //tu morem vezat na task id namesto project
        return await this.subtaskService.createSubtask(taskId, req.user.id, subtask);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getSubtasks(@Query('taskId') taskId: string): Promise<Array<Subtask>> {
        return await this.subtaskService.getSubtasks(taskId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getSubtask(@Param('id') id: string): Promise<Subtask> {
        return await this.subtaskService.getSubtask(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async removeSubtask(@Param('id') id: string): Promise<void> {
        await this.subtaskService.removeSubtask(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    public async editSubtask(@Body('subtask') subtask: Subtask): Promise<Subtask> {
        return await this.subtaskService.editSubtask(subtask);
    }

}
