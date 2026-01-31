import axios from "axios";

const API_URL = "http://localhost:9999/api/";

const api = axios.create({
    baseURL: API_URL,
})

export const platformService = {
    getAll: async () => {
        const res = await api.get("/platforms");
        return res.data;
    },
}

export const productService = {
    getByPlatform: async (slug) => {
        const res = await api.get(`/products?platform=${slug}`);
        return res.data;
    },
}