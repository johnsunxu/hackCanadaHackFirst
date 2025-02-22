// TaskList.tsx
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
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-gray-500">Due: {task.due_date}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
