import { useState, useEffect } from "react";
import { cartService } from "../services/api";
import Loading from "./loading";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom"

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await cartService.getCart();
                setCart(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const calculateItemTotal = (item) => {
        const { price, discount } = item.product;
        const discountedPrice = price * (1 - discount / 100);
        return Math.round(discountedPrice * item.quantity);
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const totalDiscount = Math.round(cart.reduce((acc, item) => {
        const itemDiscount = (item.product.price * (item.product.discount / 100)) * item.quantity;
        return acc + itemDiscount;
    }, 0));
    const finalTotal = subtotal - totalDiscount;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (loading) return <Loading />;
    if (error) return <div className="p-8 text-center text-red-500">Error loading cart. Please try again.</div>;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 text-neutral-500">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <button className="mt-4 text-sm font-semibold text-neutral-900 border-b border-neutral-900 pb-1">Continue Shopping</button>
            </div>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-bold mb-10 tracking-tight text-neutral-900">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {cart.map((item, index) => (
                        <div key={index} className="flex gap-6 pb-8 border-b border-neutral-100 last:border-0 group">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-50 flex-shrink-0 overflow-hidden rounded-sm">
                                <img
                                    src={item.product.image_url}
                                    alt={item.product.title}
                                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex-grow flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <Link to={`/product/${item.product_id}`}>
                                            <h2 className="text-base font-semibold text-neutral-900 leading-tight pr-4 hover:underline">
                                                {item.product.title}
                                            </h2>
                                        </Link>

                                        <button className="text-neutral-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider font-medium">
                                        {item.product.platform?.name}
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold px-1.5 py-0.5 bg-neutral-900 text-white rounded-sm">
                                            -{item.product.discount}%
                                        </span>
                                        <span className="text-xs text-neutral-400 line-through">
                                            {formatCurrency(item.product.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-neutral-200 rounded-sm overflow-hidden">
                                        <button className="p-1 px-2 hover:bg-neutral-50 border-r border-neutral-200 transition-colors">
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                        <button className="p-1 px-2 hover:bg-neutral-50 border-l border-neutral-200 transition-colors">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="font-bold text-neutral-900">
                                        {formatCurrency(calculateItemTotal(item))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-neutral-50 p-6 md:p-8 rounded-sm sticky top-24">
                        <h3 className="text-lg font-bold mb-6 text-neutral-900">Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm text-neutral-600">
                                <span>Subtotal</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-neutral-500 font-medium italic">
                                <span>Savings</span>
                                <span>-{formatCurrency(totalDiscount)}</span>
                            </div>
                            <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                                <span className="text-base font-bold text-neutral-900">Total</span>
                                <span className="text-2xl font-black text-neutral-900 tracking-tight">
                                    {formatCurrency(finalTotal)}
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-neutral-900 text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-all active:scale-[0.98]">
                            Checkout Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}