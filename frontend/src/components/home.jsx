import { Mail } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header Section */}
            <section className="bg-white py-12 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-[#f59e0b] uppercase tracking-tighter" style={{ fontFamily: 'monospace' }}>
                        DAP'S GARAGE RETRO GAME STORE
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                        Buy used video games, original game systems and old school gaming accessories at the largest family run retro video game online store. Shop all our vintage authentic products, with a <span className="underline font-bold">free 1 year warranty</span> and free domestic shipping on orders over $20!
                    </p>
                    <button className="text-[#d63031] font-bold text-xl underline uppercase">Shop our latest deals!</button>
                </div>
                <div className="flex-1 flex justify-center items-center bg-gray-100 h-64 w-full rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-400">[Main Banner Placeholder]</p>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-[#f59e0b] py-12 px-4 text-center text-slate-900">
                <h2 className="text-3xl font-bold uppercase mb-4" style={{ fontFamily: 'monospace' }}>Get Game Deals</h2>
                <div className="h-1 w-16 bg-slate-900 mx-auto mb-6"></div>
                <p className="mb-6">Signup to get <span className="text-white font-bold uppercase underline">Exclusive</span> deals and coupons on all your favorite old video games and classic game consoles!</p>
                <div className="flex max-w-md mx-auto">
                    <div className="bg-white flex items-center px-4 py-3 w-full">
                        <Mail className="text-gray-400 mr-2" size={20} />
                        <input type="email" placeholder="Your email address" className="text-black outline-none w-full" />
                    </div>
                    <button className="bg-slate-900 p-4 hover:bg-slate-800 transition">
                        <Mail size={24} className="text-[#f59e0b]" />
                    </button>
                </div>
            </section>
        </div>
    )
}