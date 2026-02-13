import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
    throw new Error("Missing VITE_API_URL environment variable");
}

const normalizedBaseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;

export const apiClient = axios.create({
    baseURL: normalizedBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
