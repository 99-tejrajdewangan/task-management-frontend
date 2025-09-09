import React, { useState } from 'react';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask) => api.post('/api/tasks', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description });
  };

  return (
    <form onSubmit={submit} className="p-3 border rounded">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
