import axios from "axios";

/**
 * Single configured axios instance used across the app.
 * Feature-specific services (e.g. userService.js) should import this
 * rather than creating their own axios instances.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach auth token (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize error responses so callers can rely on a consistent shape.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "Unexpected error";
    return Promise.reject({ ...error, message });
  }
);

export default api;
