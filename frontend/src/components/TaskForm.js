import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Nova tarefa"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;