import { UserDTO } from '../user/user.model';
import { TaskDTO } from '../task/task.model';
export class SubtaskDTO {
    id?: string | undefined | null = null;
    title: string | undefined | null = null;
    description: string | undefined | null = null;
    dueDate: Date | undefined | null = null;
    owner?: UserDTO | undefined | null = null;
    completed: boolean | undefined | null = null;
}
