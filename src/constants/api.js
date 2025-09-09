import api from "../api/axios";

export const fetchTasks = async ({ page, search, status }) => {
  const res = await api.get("/api/tasks", {
    params: { page, limit: 8, search, status },
  });
  return res.data;
};
