import React from "react";
import { Task } from "../types/types";
import { classNames, priorities } from "../utils/taskUtilts";

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItemStyled: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  deleteTask,
}) => {
  return (
    <li
      key={task.id}
      className="flex items-center justify-between gap-x-6 py-5"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="mr-2"
            disabled={task.dueDate.getTime() < new Date().getTime()}
          />
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {task.text}
          </p>
          <p
            className={classNames(
              priorities[task.priority],
              "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            )}
          >
            {task.priority}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            Due on{" "}
            <time dateTime={task.dueDate.toLocaleString()}>
              {task.dueDate.toLocaleDateString()}
            </time>
          </p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <button
          onClick={() => deleteTask(task.id)}
          className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItemStyled;
