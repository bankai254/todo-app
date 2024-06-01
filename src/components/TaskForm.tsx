import React, { useState } from "react";
import { Task } from "../types/types";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "" || !dueDate || !priority) {
      setError("Please fill in all fields.");
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
    setText("");
    setDueDate(undefined);
    setPriority("medium");
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
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2 p-2"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2 p-2"

      />
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "high" | "medium" | "low")
        }
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 w-full mb-2"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
