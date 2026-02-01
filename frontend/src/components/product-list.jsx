import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { productService } from "../services/api";
import StarRating from "./star-rating";
import Loading from "./loading";

export default function ProductList() {

    const { slug } = useParams();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price).replace('Rp', 'Rp ');
    };

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
        return <Loading />;
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
        <div className="mx-auto max-w-7xl px-6 py-10">
            {/* Header */}
            <h1 className="text-3xl font-black uppercase mb-8 text-[#f59e0b]">
                {slug} Catalogue
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => {
                    const isOutOfStock = product.stock <= 0;
                    const hasDiscount = product.discount > 0;
                    const salePrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

                    return (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 bg-white hover:shadow-lg ${isOutOfStock
                                ? "border-slate-200"
                                : "border-yellow-500"
                                }`}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square bg-slate-50 flex items-center justify-center mt-4 overflow-hidden">
                                <img
                                    src={product.image_url || 'https://via.placeholder.com/300'}
                                    alt={product.title}
                                    className={`w-full h-full object-contain p-4 transition-all duration-500 ${isOutOfStock ? "grayscale opacity-60" : "hover:scale-110"
                                        }`}
                                />

                                {isOutOfStock && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                        <span className="bg-red-600 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/20 transform -rotate-12">
                                            Sold Out
                                        </span>
                                    </div>
                                )}

                                {!isOutOfStock && hasDiscount && (
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-red-600 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-lg uppercase">
                                            {product.discount}% OFF
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className={`font-semibold text-base mb-3 line-clamp-2 min-h-[3rem] transition-colors ${isOutOfStock ? "text-slate-400" : "text-[#b45309]"
                                    }`}>
                                    {product.title || product.name}
                                </h3>

                                {/* Price */}
                                <div className="mb-2">
                                    {isOutOfStock ? (
                                        <p className="font-bold text-lg text-slate-400 italic">
                                            Out of stock
                                        </p>
                                    ) : hasDiscount ? (
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="font-bold text-xl text-red-600">
                                                {formatPrice(salePrice)}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="font-bold text-xl text-[#f59e0b]">
                                            {formatPrice(product.price)}
                                        </p>
                                    )}
                                </div>

                                {/* Star Rating */}
                                <div className={isOutOfStock ? "opacity-40" : ""}>
                                    <StarRating rating={product.rating || 5} reviews={0} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}