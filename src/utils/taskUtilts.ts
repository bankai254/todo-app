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

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const priorities = {
  high: 'text-red-700 bg-red-50 ring-red-600/20',
  medium: 'text-blue-600 bg-gray-50 ring-gray-500/10',
  low: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}