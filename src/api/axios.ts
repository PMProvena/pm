import axios from "axios";

const api = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://provena.onrender.com/api",
  // ❗ Don't fix content-type here; browser will set it automatically for FormData
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("pmUserToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
