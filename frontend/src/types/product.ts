import type { Category } from "./category";

export type Product = {
    id: string;
    title: string;
    description: string;
    year: number;
    imageUrl: string;
    price: number;
    stock: number;
    discount: number;
    category: Category | null;
};
