import { Task } from '../task/task';

export interface FullProject {
  id: number;
  name: string;
  tasks: Map<number , Task>;
  headerColor: string;
}
