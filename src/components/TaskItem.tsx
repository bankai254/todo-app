import React from 'react';
import { Task } from '../types/types';

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className={`flex justify-between items-center p-2 border mb-2 ${task.completed ? 'line-through' : ''}`}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mr-2"
        />
        <span>{task.text}</span>
        {task.dueDate && <span className="ml-2 text-xs text-gray-500">{task.dueDate.toLocaleString()}</span>}
        <span className={`ml-2 text-xs ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {task.priority}
        </span>
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
    </div>
  );
};

export default TaskItem;
