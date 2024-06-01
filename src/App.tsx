import React from 'react';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List App</h1>
      <TaskList />
    </div>
  );
};

export default App;
