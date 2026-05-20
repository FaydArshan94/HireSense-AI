import { useAuthStore } from "../../store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
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
    const status = error.response?.status;
    const url = error.config?.url;

    if (
      status === 401 &&
      !url?.includes("/auth/login") &&
      !url?.includes("/auth/me")
    ) {
      const { clearUser } = useAuthStore.getState();
      clearUser();
    }

    return Promise.reject(error);
  }
);


export default api;
