import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { productService } from "../services/api";
import StarRating from "./star-rating";

export default function ProductList() {

    const { slug } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getByPlatform(slug);
                setProducts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [slug]); // refresh whenever the slug changes

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-lg font-semibold text-slate-600">
                    Loading products...
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-lg font-semibold text-slate-600">
                    No products found for this platform.
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto px-6 py-10">
            {/* Header */}
            <h1 className="text-3xl font-black uppercase mb-8 text-[#003c96]">
                {slug} Games ({products.length})
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square bg-slate-100">
                            <img
                                src={product.image_url || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Title - 2 lines max */}
                            <h3 className="font-semibold text-base mb-3 line-clamp-2 text-[#003c96] min-h-[3rem]">
                                {product.title || product.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-2">
                                {product.original_price ? (
                                    <p className="text-sm">
                                        From: <span className="line-through text-slate-500">${product.original_price}</span>{' '}
                                        <span className="font-bold text-lg text-green-600">${product.price}</span>
                                    </p>
                                ) : (
                                    <p className="font-bold text-xl text-[#003c96]">
                                        ${product.price}
                                    </p>
                                )}
                            </div>

                            {/* Star Rating */}
                            <StarRating rating={product.rating || 5} reviews={0} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}