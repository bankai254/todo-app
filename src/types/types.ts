export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  overdue?: boolean
}

export type TaskStatus = 'all' | 'completed' | 'uncompleted';
