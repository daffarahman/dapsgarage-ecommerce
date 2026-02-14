import { apiClient } from "../lib/axios";
import type { Product } from "../types/product";

export type GetProductsParams = {
    offset?: number;
    limit?: number;
    inStock?: boolean;
    category?: string;
    signal?: AbortSignal;
};

export const productsApi = {
    getAll: async (params?: GetProductsParams): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>("products", {
            signal: params?.signal,
            params: {
                offset: params?.offset,
                limit: params?.limit,
                in_stock: params?.inStock,
                category: params?.category,
            },
        });

        return response.data;
    },

    getBySlug: async (slug: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`products/${slug}`);
        return response.data;
    },
};
