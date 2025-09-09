import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useDebounce } from "../hooks/useDebounce.js";
import { fetchTasks } from "../constants/api";
import { TASK_STATUS_OPTIONS } from "../constants/options";
import { MESSAGES } from "../constants/messages";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // ✅ Debounced search (500ms delay)
  const debouncedSearch = useDebounce(search, 500);

  // ✅ React Query v5 syntax
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", { page, search: debouncedSearch, status }],
    queryFn: () => fetchTasks({ page, search: debouncedSearch, status }),
    placeholderData: (prev) => prev,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">{MESSAGES.loading}</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500">{MESSAGES.error}</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-8 bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            📋 Task Dashboard
          </h1>
          <button
            onClick={logout}
            className="px-5 py-2 text-sm bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search tasks..."
            className="flex-1 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            {TASK_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Task Form */}
        <div className="mb-8 bg-gray-50 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            ➕ Add New Task
          </h2>
          <TaskForm />
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {data?.tasks?.length === 0 && (
            <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl shadow-sm">
              {MESSAGES.noTasks}
            </div>
          )}
          {data?.tasks?.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <TaskItem task={task} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center text-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl shadow-sm disabled:opacity-50 hover:bg-gray-100 transition"
          >
            ⬅ Prev
          </button>
          <div className="font-medium">
            Page {data?.currentPage} / {data?.totalPages}
          </div>
          <button
            disabled={page >= data?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl shadow-sm disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
