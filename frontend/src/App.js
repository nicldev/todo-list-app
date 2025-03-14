import React, { useState, useEffect } from 'react';
import Parse from './services/api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import AuthForm from './components/AuthForm';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchTasks();
    setCurrentUser(Parse.User.current());
  }, []);

  const fetchTasks = async () => {
    const query = new Parse.Query('Tasks');
    if (currentUser) {
      query.equalTo('userId', currentUser.id);
    }
    const results = await query.find();
    setTasks(results.map(task => task.toJSON()));
  };

  const addTask = async (taskText) => {
    const Task = Parse.Object.extend('Tasks');
    const task = new Task();
    task.set('task', taskText);
    task.set('completed', false);
    task.set('userId', currentUser.id);
    await task.save();
    fetchTasks();
  };

  const editTask = async (id, newText) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    task.set('task', newText);
    await task.save();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    await task.destroy();
    fetchTasks();
  };

  const toggleTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    task.set('completed', !task.get('completed'));
    await task.save();
    fetchTasks();
  };

  const handleLogout = async () => {
    await Parse.User.logOut();
    setCurrentUser(null);
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>
        {currentUser ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Bem-vindo, {currentUser.getUsername()}!</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
            <TaskForm onAddTask={addTask} />
            <ul className="mt-6 space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.objectId}
                  task={task}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                />
              ))}
            </ul>
          </>
        ) : (
          <AuthForm onLogin={(user) => setCurrentUser(user)} />
        )}
      </div>
    </div>
  );
}

export default App;