import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true // Enable sending cookies with requests (for session-based auth)
});

// Session-based authentication - no need for token interceptor
// Cookies are automatically sent with withCredentials: true

export default instance;