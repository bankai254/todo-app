import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Task, TaskStatus } from "../types/types";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localStoage";
import { isOverdue, isDueSoon } from "../utils/taskUtilts";
import TaskItemStyled from "./TaskItemStyled";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus>("all");
  const [sortByDate, setSortByDate] = useState<boolean>(false);

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    console.log("local storage", loadedTasks);
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      // Prevent the local storage from being overwritten on reload
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  const sortedTasks = sortByDate
    ? [...filteredTasks].sort((a, b) =>
        a.dueDate && b.dueDate ? a.dueDate.getTime() - b.dueDate.getTime() : 0
      )
    : filteredTasks;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval", tasks);
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.dueDate && isOverdue(task))
            return { ...task, overdue: true };
          if (task.dueDate && isDueSoon(task))
            return { ...task, completed: false, priority: "high" };
          return task;
        })
      );
    }, 1000 * 60); // Check every minute

    // Mark past tasks as completed on initial load
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.dueDate && task.dueDate < new Date())
          return { ...task, completed: true };
        return task;
      })
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <TaskForm addTask={addTask} />
      <div className="flex justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as TaskStatus)}
          className="mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
        <button
          onClick={() => setSortByDate(!sortByDate)}
          className="mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          Sort by Due Date {sortByDate ? "(asc)" : "(desc)"}
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {sortedTasks.map((task) => (
          <TaskItemStyled
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
