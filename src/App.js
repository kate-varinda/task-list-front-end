import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const toggleComplete = (taskId) => {
    const newTaskList = [];
    console.log('toggleComplete');
    for (const task of taskData) {
      if (task.id !== taskId) {
        newTaskList.push(task);
      } else {
        const newTask = {
          ...task,
          isComplete: !task.isComplete,
        };
        newTaskList.push(newTask);
      }
    }
    setTaskData(newTaskList);
  };

  const deleteTask = (taskId) => {
    const newTaskList = [];

    for (const task of taskData) {
      if (task.id !== taskId) {
        newTaskList.push(task);
      }
    }
    setTaskData(newTaskList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={taskData}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;
