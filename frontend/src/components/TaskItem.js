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
    <li className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.objectId)}
        className="mr-2"
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-1 mr-2"
          />
          <button onClick={handleEdit} className="bg-green-500 text-white p-1">
            Salvar
          </button>
        </>
      ) : (
        <>
          <span className={task.completed ? 'line-through' : ''}>{task.task}</span>
          <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-500">
            Editar
          </button>
        </>
      )}
      <button onClick={() => onDelete(task.objectId)} className="ml-2 text-red-500">
        Excluir
      </button>
    </li>
  );
}

export default TaskItem;