import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const teamAPI = 'https://task-list-api-c17.herokuapp.com/tasks';

  const fetchAllTasks = () => {
    axios
      .get(teamAPI)
      .then((response) => {
        // console.log(response.data);
        const tasksCopy = response.data.map((task) => {
          return {
            ...task,
            isComplete: task.is_complete,
          };
        });
        setTaskData(tasksCopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchAllTasks, []);

  const toggleComplete = (taskId, newStatus) => {
    const newTaskList = [];

    let taskStatus = '';
    if (newStatus === true) {
      taskStatus = 'mark_complete';
    } else if (newStatus === false) {
      taskStatus = 'mark_incomplete';
    }

    axios
      .patch(`${teamAPI}/${taskId}/${taskStatus}`)
      .then(() => {
        for (const task of taskData) {
          if (task.id !== taskId) {
            newTaskList.push(task);
          } else {
            const newTask = {
              ...task,
              isComplete: newStatus,
            };
            newTaskList.push(newTask);
          }
        }
        setTaskData(newTaskList);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('toggleComplete');
  };

  const deleteTask = (taskId) => {
    const newTaskList = [];

    axios
      .delete(`${teamAPI}/${taskId}`)
      .then(() => {
        for (const task of taskData) {
          if (task.id !== taskId) {
            newTaskList.push(task);
          }
        }
        setTaskData(newTaskList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = (formData) => {
    axios
      .post(teamAPI, formData)
      .then(() => {
        fetchAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
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
        <NewTaskForm addTask={addTask} />
      </main>
    </div>
  );
};

export default App;
