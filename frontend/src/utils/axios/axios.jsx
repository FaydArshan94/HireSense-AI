import { useAuthStore } from "../../store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "https://hiresense-ai-bcxp.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const { clearUser } = useAuthStore.getState();
      if (
        error.response?.status === 401 &&
        !window.location.pathname.includes("/login")
      ) {
        clearUser();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
