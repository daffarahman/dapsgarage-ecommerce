import { apiClient } from "../lib/axios";
import type { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("categories");
    return response.data;
}
