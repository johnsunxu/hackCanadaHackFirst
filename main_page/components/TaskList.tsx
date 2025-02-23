import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void; // Added onDelete prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-gray-500">Due: {task.due_date}</p>
          </div>
          <button
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
