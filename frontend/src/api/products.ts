import { apiClient } from "../lib/axios";
import type { Product } from "../types/product";

type GetProductsParams = {
    offset?: number;
    limit?: number;
    inStock?: boolean;
    slug?: string;
    signal?: AbortSignal;
};

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
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
}

export async function getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`products/${id}`);
    return response.data;
}
