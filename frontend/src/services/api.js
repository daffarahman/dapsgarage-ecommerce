import axios from "axios";

const API_URL = "http://localhost:9999/api/";

const api = axios.create({
    baseURL: API_URL,
})

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const platformService = {
    getAll: async () => {
        const res = await api.get("/platforms");
        return res.data;
    },
    getById: async (id) => {
        const res = await api.get(`/platforms/${id}`);
        return res.data;
    },
}

export const productService = {
    getByPlatform: async (slug) => {
        const res = await api.get(`/products?platform=${slug}`);
        return res.data;
    },
    getById: async (id) => {
        const res = await api.get(`/products/${id}`);
        return res.data;
    },
}

export const authService = {
    register: async (userData) => {
        const res = await api.post("/auth/register", userData);
        return res.data;
    },
    login: async (credentials) => {
        const res = await api.post("/auth/login", credentials);
        return res.data;
    },
    getMe: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },
}