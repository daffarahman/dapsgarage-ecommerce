import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { productService, platformService } from "../services/api";
import Loading from "./loading";
import StarRating from "./star-rating";
import { Info, ChevronDown, ChevronUp, Heart, ShoppingCart, Tag } from "lucide-react";

export default function ProductPage() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [platform, setPlatform] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const product = await productService.getById(id);
                if (product.platform_id) {
                    const platform = await platformService.getById(product.platform_id);
                    setPlatform(platform);
                }
                setProduct(product);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])

    if (loading) {
        return <Loading />;
    }

    if (error || !product) {
        return <div className="p-10 text-center text-red-500">Error loading product.</div>;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const hasDiscount = product.discount > 0;
    const salePrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
    const savings = hasDiscount ? product.price - salePrice : 0;

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 md:px-8 font-sans">
            {/* Breadcrumb */}
            {platform && (
                <div className="flex items-center gap-2 text-sm mb-6 font-medium">
                    <Link to="/" className="text-gray-500 hover:text-[#00A3E0] transition-colors whitespace-nowrap">
                        Home
                    </Link>
                    <span className="text-gray-400 font-bold px-1">/</span>
                    <Link to={`/products/${platform.slug}`} className="text-gray-500 hover:text-[#00A3E0] transition-colors whitespace-nowrap">
                        {platform.name}
                    </Link>
                    <span className="text-gray-400 font-bold px-1">/</span>
                    <span className="text-gray-800 font-bold truncate">{product.title}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Left Column: Image Area */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-lg aspect-square md:aspect-auto md:h-[500px] bg-slate-50 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img
                            src={product.image_url}
                            alt={product.title}
                            className={`w-full h-full object-contain p-8 transition-all duration-500 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                <span className="bg-red-600 text-white text-xs md:text-sm font-black px-6 py-2.5 rounded-full uppercase tracking-widest shadow-xl border border-white/20 transform -rotate-12">
                                    Sold Out
                                </span>
                            </div>
                        )}

                        {!isOutOfStock && hasDiscount && (
                            <div className="absolute top-4 left-4">
                                <span className="bg-red-600 text-white text-sm md:text-base font-black px-4 py-2 rounded shadow-xl uppercase">
                                    {product.discount}% OFF
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="flex flex-col gap-4">
                    {platform && (
                        <span className="text-[#00A3E0] font-bold text-sm tracking-widest uppercase">
                            {platform.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#0050A1] tracking-tight uppercase leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex flex-col gap-2">
                        {isOutOfStock && (
                            <span className="text-red-600 font-bold uppercase tracking-wider text-sm flex items-center gap-1">
                                <Tag className="w-4 h-4 text-red-600 fill-current" />
                                Currently Out of Stock
                            </span>
                        )}
                        <div className="flex items-baseline gap-2 text-lg">
                            {hasDiscount ? (
                                <>
                                    <span className="text-gray-700 font-medium">From:</span>
                                    <span className="text-gray-400 line-through">{formatPrice(product.price)}</span>
                                    <span className="text-red-500 font-bold">{formatPrice(salePrice)}</span>
                                    <span className="text-orange-500 text-sm">(You save {formatPrice(savings)})</span>
                                </>
                            ) : (
                                <span className="text-gray-900 font-bold">{formatPrice(product.price)}</span>
                            )}
                        </div>
                    </div>

                    <StarRating rating={product.rating} reviews={Math.floor(Math.random() * 50) + 1} />


                    <div className="flex items-center gap-4 mt-6">
                        <span className="font-bold text-gray-800">Quantity:</span>
                        <div className={`flex items-center border border-gray-300 rounded overflow-hidden ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}>
                            <input
                                type="text"
                                value={isOutOfStock ? 0 : quantity}
                                readOnly
                                className="w-12 text-center py-1 font-medium text-gray-800 focus:outline-none"
                            />
                            <div className="flex flex-col border-l border-gray-300">
                                <button
                                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                    className={`p-0.5 hover:bg-gray-100 border-b border-gray-300 ${quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={quantity >= product.stock || isOutOfStock}
                                >
                                    <ChevronUp className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className={`p-0.5 hover:bg-gray-100 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={quantity <= 1 || isOutOfStock}
                                >
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-8">
                        <div className="flex gap-4">
                            <button
                                disabled={isOutOfStock}
                                className={`flex-1 font-bold py-3 px-6 rounded shadow-sm transition-colors uppercase ${isOutOfStock
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                    : "bg-[#FECD32] hover:bg-[#ebbb2e] text-[#0050A1]"
                                    }`}
                            >
                                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                            </button>
                            <button className="flex-1 border-2 border-[#00A3E0] text-[#00A3E0] hover:bg-blue-50 font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors">
                                Add to Wish List
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-16 border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-black uppercase text-slate-800 mb-6 flex items-center gap-2">
                    <Info className="w-6 h-6 text-[#00A3E0]" />
                    Product Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                    {product.description || "No description available for this product."}
                </div>
            </div>
        </div>
    )
}
