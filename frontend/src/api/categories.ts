import { apiClient } from "../lib/axios";
import type { Category } from "../types/category";

export const categoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await apiClient.get<Category[]>("categories");
        return response.data;
    },

    getBySlug: async (slug: string): Promise<Category> => {
        const response = await apiClient.get<Category>(`categories/${slug}`);
        return response.data;
    },
};

export async function getCategories(): Promise<Category[]> {
    return categoriesApi.getAll();
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    return categoriesApi.getBySlug(slug);
}
