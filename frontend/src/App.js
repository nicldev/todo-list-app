import React, { useState, useEffect } from 'react';
import Parse from 'parse';

Parse.initialize("VrbNgQ552mU7ujMioLAfrpjJlLctKYe4g7htLWQc", "SYbVoUNeftgIbS23QbnDjKdOqBd50MWdggA7Sv0J4");
Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const query = new Parse.Query('Tasks');
    const results = await query.find();
    setTasks(results.map(task => task.toJSON()));
  };

  const addTask = async () => {
    const Task = Parse.Object.extend('Tasks');
    const task = new Task();
    task.set('task', newTask);
    task.set('completed', false);
    await task.save();
    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    task.set('completed', !task.get('completed'));
    await task.save();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const query = new Parse.Query('Tasks');
    const task = await query.get(id);
    await task.destroy();
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Nova tarefa"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">
          Adicionar
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.objectId} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.objectId)}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through' : ''}>{task.task}</span>
            <button
              onClick={() => deleteTask(task.objectId)}
              className="ml-2 text-red-500"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;