import React, { useState } from 'react';

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.task);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(task.objectId, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.objectId)}
          className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
            {task.task}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-green-500 hover:text-green-600 transition duration-300"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Editar
          </button>
        )}
        <button
          onClick={() => onDelete(task.objectId)}
          className="text-red-500 hover:text-red-600 transition duration-300"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}

export default TaskItem;