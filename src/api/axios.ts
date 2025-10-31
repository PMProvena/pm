import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://shula-pm-php.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetails");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const token = parsedUser?.data?.token; // ✅ matches structure
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error("Failed to parse userDetails:", err);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
