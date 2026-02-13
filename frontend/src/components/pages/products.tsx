import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { formatCurrency } from "../../lib/format-currency";
import type { Product } from "../../types/product";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadProducts() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const data = await getProducts({ limit: 20, signal: controller.signal });
                setProducts(data);
            } catch {
                if (!controller.signal.aborted) {
                    setErrorMessage("Failed to load products. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void loadProducts();

        return () => {
            controller.abort();
        };
    }, []);

    const hasProducts = products.length > 0;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Products</h1>

            {isLoading && <p>Loading products...</p>}

            {!isLoading && errorMessage && <p>{errorMessage}</p>}

            {!isLoading && !errorMessage && !hasProducts && (
                <p>No products found.</p>
            )}

            {!isLoading && !errorMessage && hasProducts && (
                <ul className="space-y-4">
                    {products.map((product) => (
                        <li key={product.id} className="rounded-lg border p-4">
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <p className="text-sm">{product.description}</p>
                            <p className="mt-2">Price: {formatCurrency(product.price)}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Category: {product.category?.name ?? "Uncategorized"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}