import React, { useState } from 'react';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TaskItem({ task }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  // Delete task
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`/api/tasks/${task._id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Toggle status
  const toggleMut = useMutation({
    mutationFn: () =>
      api.put(`/api/tasks/${task._id}`, {
        status: task.status === 'pending' ? 'done' : 'pending',
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Update task (title/description)
  const updateMut = useMutation({
    mutationFn: () =>
      api.put(`/api/tasks/${task._id}`, {
        title: editTitle,
        description: editDesc,
        status: task.status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsEditing(false);
    },
  });

  return (
    <div className="p-3 border rounded flex justify-between items-start">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              rows="2"
            />
          </>
        ) : (
          <>
            <h3 className="font-semibold">
              {task.title}{' '}
              <span className="text-sm text-gray-500">({task.status})</span>
            </h3>
            <p className="text-sm text-gray-700">{task.description}</p>
            <p className="text-xs text-gray-400">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-3">
        {isEditing ? (
          <>
            <button
              onClick={() => updateMut.mutate()}
              disabled={updateMut.isPending}
              className="px-2 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditDesc(task.description);
              }}
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
            >
              Edit
            </button>
            <button
              onClick={() => toggleMut.mutate()}
              disabled={toggleMut.isPending}
              className="px-2 py-1 border rounded text-green-600 hover:bg-green-100"
            >
              {task.status === 'pending' ? 'Mark done' : 'Mark pending'}
            </button>
            <button
              onClick={() => deleteMut.mutate()}
              disabled={deleteMut.isPending}
              className="px-2 py-1 border rounded text-red-600 hover:bg-red-100"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
