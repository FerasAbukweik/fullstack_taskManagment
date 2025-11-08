export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  mark: boolean;
  createdAt: Date;
  GoalDate: Date | null;
  updatedAt: Date | null;
}
