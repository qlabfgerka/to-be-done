import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/models/project/project.model';
import { User, UserDocument } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public userToDTO(user: User): User {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
    };

    return userDTO;
  }

  public usersToDTO(users: Array<User>): Array<User> {
    const usersDTO = new Array<User>();

    for (const user of users) {
      usersDTO.push(this.userToDTO(user));
    }

    return usersDTO;
  }

  public async projectToDTO(project: Project): Promise<Project> {
    const projectDTO: Project = {
      id: project.id,
      title: project.title,
      description: project.description,
      owner: this.userToDTO(await this.getUser(project.owner)),
    };

    return projectDTO;
  }

  public async projectsToDTO(
    projects: Array<Project>,
  ): Promise<Array<Project>> {
    const projectsDTO = new Array<Project>();

    for (const project of projects) {
      projectsDTO.push(await this.projectToDTO(project));
    }

    return projectsDTO;
  }

  public async getUser(user: User): Promise<User> {
    if (!user) return undefined;
    if (user.nickname) return await this.userModel.findById(user.id);
    return await this.userModel.findById(user.toString());
  }
}
