import { Task } from "../types/types";


export const isOverdue = (task: Task): boolean => {
  if (!task.dueDate) return false;
  const now = new Date();
  return task.dueDate < now;
};

export const isDueSoon = (task: Task): boolean => {
  if (!task.dueDate) return false;
  const now = new Date();
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  return task.dueDate <= twoHoursLater && task.dueDate > now;
};
