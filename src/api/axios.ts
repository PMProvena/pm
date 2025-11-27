import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://shula-pm-php.onrender.com/api",
});

// ✅ Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetails");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const token = parsedUser?.data?.token;
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

// ✅ Response interceptor — handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.response?.data?.error;

    // If unauthorized (token invalid or expired)
    if (status === 401 || message?.toLowerCase().includes("token")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userDetails");
        // Optional: clear other app states
        window.location.href = "/login"; // redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
