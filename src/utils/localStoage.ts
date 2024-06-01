import { Task } from "../types/types";


export const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks).map((task: any) => ({ ...task, dueDate: task.dueDate ? new Date(task.dueDate) : undefined })) : [];
};
