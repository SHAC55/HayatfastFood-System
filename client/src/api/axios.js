import axios from "axios";

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://hayatfastfood-system.onrender.com/api", //http://localhost:5000
    withCredentials: true,
});

export default api;