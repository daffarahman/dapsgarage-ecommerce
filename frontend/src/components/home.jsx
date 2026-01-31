import { Mail } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-[#1a5fb4] font-sans text-white">
            {/* Header Section */}
            <section className="bg-white py-12 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-[#1a5fb4] uppercase tracking-tighter" style={{ fontFamily: 'monospace' }}>
                        DKOLDIES' RETRO GAME STORE
                    </h1>
                    <p className="text-[#1a5fb4] text-lg max-w-2xl leading-relaxed">
                        Buy used video games, original game systems and old school gaming accessories at the largest family run retro video game online store. Shop all our vintage authentic products, with a <span className="underline font-bold">free 1 year warranty</span> and free domestic shipping on orders over $20!
                    </p>
                    <button className="text-[#d63031] font-bold text-xl underline uppercase">Shop our latest deals!</button>
                </div>
                <div className="flex-1 flex justify-center items-center bg-gray-100 h-64 w-full rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-400">[Main Banner Placeholder]</p>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-[#0e4a91] py-12 px-4 text-center">
                <h2 className="text-3xl font-bold uppercase mb-4" style={{ fontFamily: 'monospace' }}>Get Game Deals</h2>
                <div className="h-1 w-16 bg-yellow-400 mx-auto mb-6"></div>
                <p className="mb-6">Signup to get <span className="text-yellow-400 font-bold uppercase">Exclusive</span> deals and coupons on all your favorite old video games and classic game consoles!</p>
                <div className="flex max-w-md mx-auto">
                    <div className="bg-white flex items-center px-4 py-3 w-full">
                        <Mail className="text-gray-400 mr-2" size={20} />
                        <input type="email" placeholder="Your email address" className="text-black outline-none w-full" />
                    </div>
                    <button className="bg-yellow-500 p-4 hover:bg-yellow-600 transition">
                        <Mail size={24} className="text-[#0e4a91]" />
                    </button>
                </div>
            </section>
        </div>
    )
}