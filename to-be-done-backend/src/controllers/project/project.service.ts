import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/models/project/project.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async createProject(
    project: Project,
    userId: string,
  ): Promise<Project> {
    const user = await this.userModel.findById(userId);

    project.owner = user;
    const newProject = new this.projectModel(project);
    await newProject.save();

    return await this.dtoFunctions.projectToDTO(newProject);
  }

  public async getProjects(userId: string): Promise<Array<Project>> {
    const user = await this.userModel.findById(userId);

    const projects = await this.projectModel.find({ owner: user });

    return await this.dtoFunctions.projectsToDTO(projects);
  }

  public async getProject(projectId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId);

    return await this.dtoFunctions.projectToDTO(project);
  }

  public async removeProject(projectId: string): Promise<void> {
    await this.projectModel.findByIdAndDelete(projectId);
  }

  public async editProject(project: Project): Promise<Project> {
    const edit = await this.projectModel.findById(project.id);

    edit.title = project.title;
    edit.description = project.description;

    await edit.save();

    return await this.dtoFunctions.projectToDTO(edit);
  }
}
