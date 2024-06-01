import React, { useState } from 'react';
import { Task } from '../types/types';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '' || !dueDate || !priority) {
      setError('Please fill in all fields.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: new Date(dueDate).getTime() < Date.now(),
      dueDate: new Date(dueDate),
      priority,
    };

    addTask(newTask);

    // Reset all fields
    setText('');
    setDueDate(undefined);
    setPriority('medium');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 w-full mb-2"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
        className="border p-2 w-full mb-2"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
