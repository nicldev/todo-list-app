import React, { useState, useEffect } from 'react';
import Parse from './services/api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import AuthForm from './components/AuthForm';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    fetchTasks();
    setCurrentUser(Parse.User.current());
  }, []);

  // Buscar tarefas do Back4app
  const fetchTasks = async () => {
    const query = new Parse.Query('Tasks');
    if (currentUser) {
      query.equalTo('userId', currentUser.id);
    }
    const results = await query.find();
    setTasks(results.map(task => task.toJSON()));
  };

  // Adicionar tarefa
  const addTask = async (taskText) => {
    const Task = Parse.Object.extend('Tasks');
    const task = new Task();
    task.set('task', taskText);
    task.set('completed', false);
    task.set('userId', currentUser.id);
    await task.save();
    fetchTasks();
  };

  // Editar tarefa
  const editTask = async (id, newText) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    task.set('task', newText);
    await task.save();
    fetchTasks();
  };

  // Excluir tarefa
  const deleteTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    await task.destroy();
    fetchTasks();
  };

  // Marcar tarefa como concluída
  const toggleTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    task.set('completed', !task.get('completed'));
    await task.save();
    fetchTasks();
  };

  // Logout
  const handleLogout = async () => {
    await Parse.User.logOut();
    setCurrentUser(null);
    setTasks([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      {currentUser ? (
        <>
          <button onClick={handleLogout} className="mb-4 bg-red-500 text-white p-2">
            Logout
          </button>
          <TaskForm onAddTask={addTask} />
          <ul>
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
  );
}

export default App;