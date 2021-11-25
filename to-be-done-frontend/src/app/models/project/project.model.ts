import { UserDTO } from '../user/user.model';

export class ProjectDTO {
  id?: string | undefined | null = null;
  title: string | undefined | null = null;
  description: string | undefined | null = null;
  owner?: UserDTO | undefined | null = null;
  /*lists: Array<ListDTO>*/
}
