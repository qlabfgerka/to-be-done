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
} from '@nestjs/common';
import { Project } from 'src/models/project/project.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createProject(
    @Body('project') project: Project,
    @Request() req: any,
  ): Promise<Project> {
    return await this.projectService.createProject(project, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getProjects(@Request() req: any): Promise<Array<Project>> {
    return await this.projectService.getProjects(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getProject(@Param('id') id: string): Promise<Project> {
    return await this.projectService.getProject(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async removeProject(@Param('id') id: string): Promise<void> {
    await this.projectService.removeProject(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  public async editProject(
    @Body('project') project: Project,
  ): Promise<Project> {
    return await this.projectService.editProject(project);
  }
}
