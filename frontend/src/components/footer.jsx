import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#f59e0b] py-16 px-6 md:px-20 border-t border-amber-600 text-slate-900 mt-12">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-slate-900 underline-offset-8 decoration-4">Company</h4>
                    <ul className="space-y-2 text-sm font-medium">
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                        <li><Link to="/location" className="hover:underline">Location</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-slate-900 underline-offset-8 decoration-4">Support</h4>
                    <ul className="space-y-2 text-sm font-medium">
                        <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
                        <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-slate-900 underline-offset-8 decoration-4">Policies</h4>
                    <ul className="space-y-2 text-sm font-medium">
                        <li><Link to="/shipping-and-returns" className="hover:underline">Shipping and Returns</Link></li>
                        <li><Link to="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-slate-900 underline-offset-8 decoration-4">Get Social</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 text-slate-50 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-all duration-300 flex items-center gap-3 shadow-sm active:scale-95"><Facebook size={18} /> <span className="text-xs font-medium uppercase tracking-wider">Facebook</span></div>
                        <div className="bg-slate-900 text-slate-50 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-all duration-300 flex items-center gap-3 shadow-sm active:scale-95"><Twitter size={18} /> <span className="text-xs font-medium uppercase tracking-wider">Twitter</span></div>
                        <div className="bg-slate-900 text-slate-50 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-all duration-300 flex items-center gap-3 shadow-sm active:scale-95"><Youtube size={18} /> <span className="text-xs font-medium uppercase tracking-wider">Youtube</span></div>
                        <div className="bg-slate-900 text-slate-50 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-all duration-300 flex items-center gap-3 shadow-sm active:scale-95"><Instagram size={18} /> <span className="text-xs font-medium uppercase tracking-wider">Instagram</span></div>
                    </div>
                    <div className="mt-6 text-xs text-amber-950/70">
                        <p>dapsgarage.com</p>
                        <p>2846 Main St #5A</p>
                        <p>Morgantown, PA 19543 USA</p>
                    </div>
                </div>
            </div>
        </footer >
    )
}