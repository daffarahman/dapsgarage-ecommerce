import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1a5fb4] py-16 px-6 md:px-20 border-t border-blue-400 text-white mt-12">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-yellow-400 underline-offset-8 decoration-4">DK Store</h4>
                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Sell Video Games</li>
                        <li>Repair Center</li>
                        <li>Deals and Coupons</li>
                        <li>Rewards</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-yellow-400 underline-offset-8 decoration-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Contact Us</li>
                        <li>Shipping & Returns</li>
                        <li>Refurbish & Inspection Process</li>
                        <li>FAQs</li>
                        <li>Reviews</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-yellow-400 underline-offset-8 decoration-4">Account</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Track My Order</li>
                        <li>My Account</li>
                        <li>Shopping Cart</li>
                        <li>Privacy</li>
                        <li>California Privacy</li>
                        <li>Terms and Conditions</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase mb-4 underline decoration-yellow-400 underline-offset-8 decoration-4">Get Social</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-600 p-2 rounded cursor-pointer"><Facebook size={20} /> Facebook</div>
                        <div className="bg-blue-400 p-2 rounded cursor-pointer"><Twitter size={20} /> Twitter</div>
                        <div className="bg-red-600 p-2 rounded cursor-pointer"><Youtube size={20} /> Youtube</div>
                        <div className="bg-pink-600 p-2 rounded cursor-pointer"><Instagram size={20} /> Instagram</div>
                    </div>
                    <div className="mt-6 text-xs text-blue-200">
                        <p>DKOldies.com</p>
                        <p>2846 Main St #5A</p>
                        <p>Morgantown, PA 19543 USA</p>
                    </div>
                </div>
            </div>
        </footer >
    )
}