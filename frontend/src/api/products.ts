import { apiClient } from "../lib/axios";
import type { Product } from "../types/product";

export type GetProductsParams = {
    offset?: number;
    limit?: number;
    inStock?: boolean;
    slug?: string;
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
                slug: params?.slug,
            },
        });

        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`products/${id}`);
        return response.data;
    },

    getByCategorySlug: async (
        slug: string,
        params?: Omit<GetProductsParams, "slug">
    ): Promise<Product[]> => {
        return productsApi.getAll({ ...params, slug });
    },
};

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
    return productsApi.getAll(params);
}

export async function getProductById(id: string): Promise<Product> {
    return productsApi.getById(id);
}
