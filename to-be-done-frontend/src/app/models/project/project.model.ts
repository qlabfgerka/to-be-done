import { UserDTO } from '../user/user.model';
import { TaskDTO } from '../task/task.model';
export class ProjectDTO {
  id?: string | undefined | null = null;
  title: string | undefined | null = null;
  description: string | undefined | null = null;
  owner?: UserDTO | undefined | null = null;
  tasks?: TaskDTO[] | undefined | null = null;
  /*lists: Array<ListDTO>*/
}
