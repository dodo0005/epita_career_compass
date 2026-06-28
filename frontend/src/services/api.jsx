import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const register = (email, password) =>
  API.post("/auth/register", { email, password });

// Chat
export const sendMessage = (message, sessionId) =>
  API.post("/chat", { message, sessionId });

export const getChatHistory = (sessionId) =>
  API.get(`/chat/history/${sessionId}`);

export const getSessions = () => API.get("/chat/sessions");
