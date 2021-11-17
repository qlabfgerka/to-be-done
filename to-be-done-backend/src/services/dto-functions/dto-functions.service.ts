import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
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

    users.forEach((user: User) => {
      usersDTO.push(this.userToDTO(user));
    });

    return usersDTO;
  }
}
