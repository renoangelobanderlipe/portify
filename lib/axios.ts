import axios from "axios";
import { useAuth } from "./store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

// Helper to attach the Bearer token if available
export const attachToken = () => {
  const token = useAuth.getState().token;
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Call once on load
attachToken();

export default api;
