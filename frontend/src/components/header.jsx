import { useEffect, useState } from "react"
import { platformService } from "../services/api"
import {
    Truck,
    ShieldCheck,
    ShoppingCart,
    User,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    CircleDollarSign,
    Gamepad2,
    Info,
    Mail,
    LogIn
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Header() {
    const [platforms, setPlatforms] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeManufacturer, setActiveManufacturer] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [expandedManufacturer, setExpandedManufacturer] = useState(null)

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                setLoading(true)
                const data = await platformService.getAll()
                setPlatforms(data)
            } catch (err) {
                console.error("Fetch error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPlatforms()
    }, [])

    const grouped = platforms.reduce((acc, p) => {
        const m = p.manufacturer || "Other";
        if (!acc[m]) acc[m] = [];
        acc[m].push(p);
        return acc;
    }, {});

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    if (loading) return <div className="bg-[#003c96] h-1 w-full animate-pulse"></div>

    return (
        <header className="w-full shadow-lg font-sans">
            {/* 1. Top Announcement Bar */}
            <div className="bg-[#1e6edb] text-white text-[10px] md:text-[11px] font-bold py-1.5 px-4 border-b border-white/10 uppercase tracking-wider">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-center sm:text-left">
                    <div className="flex items-center gap-2">
                        <Truck size={14} className="text-yellow-400" />
                        <span>FREE US SHIPPING <span className="hidden sm:inline">with orders over $20*</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-yellow-400" />
                        <span>1 YEAR WARRANTY <span className="hidden sm:inline">that nobody can beat!</span></span>
                    </div>
                </div>
            </div>

            {/* 2. Main Brand Header */}
            <div className="bg-[#003c96] text-white py-3 md:py-4 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

                    {/* Hamburger Menu (Mobile Only) */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-md transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>

                    {/* Logo Area */}
                    <Link to="/" className="flex flex-col items-center flex-1 lg:flex-none">
                        <div className="text-2xl md:text-3xl font-black italic flex items-center gap-1.5 leading-none">
                            <div className="bg-white text-[#003c96] px-1 rounded-sm">
                                <Gamepad2 size={24} strokeWidth={3} />
                            </div>
                            <span>DAPS</span>
                            <span className="text-red-500">garage</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold mt-1 opacity-70">Retro Game Store</span>
                    </Link>

                    {/* Desktop Navigation (Center/Utilities) */}
                    <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-200">
                        <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                            <Mail size={14} /> Contact
                        </Link>
                        <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                            <Info size={14} /> About Us
                        </Link>
                        <Link to="/trade" className="hover:text-white transition-colors flex items-center gap-1.5">
                            <CircleDollarSign size={14} /> Sell Video Games
                        </Link>
                    </div>

                    {/* Desktop Right Utils */}
                    <div className="flex items-center gap-3 md:gap-5 text-[13px] font-medium text-slate-200">
                        <Link to="/account" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                            <User size={16} /> Account
                        </Link>
                        <Link to="/checkout" className="flex items-center gap-2 bg-yellow-400 text-[#003c96] px-3 md:px-5 py-1.5 rounded font-black hover:bg-yellow-300 transition-colors shadow-sm">
                            <span className="hidden sm:inline">Checkout</span>
                            <ShoppingCart size={18} strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. Desktop Manufacturer Navigation */}
            <nav className="hidden lg:block bg-[#003c96] text-white border-y border-white/10 shadow-inner">
                <div className="flex max-w-7xl mx-auto h-12 justify-center">
                    {Object.keys(grouped).map((m) => (
                        <div
                            key={m}
                            className="relative h-full"
                            onMouseEnter={() => setActiveManufacturer(m)}
                            onMouseLeave={() => setActiveManufacturer(null)}
                        >
                            <button className={`px-8 h-full font-black text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 ${activeManufacturer === m ? 'bg-yellow-400 text-[#003c96]' : 'hover:bg-white/10'}`}>
                                {m}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${activeManufacturer === m ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {activeManufacturer === m && (
                                <div className="absolute top-full left-0 w-64 bg-white text-slate-900 z-50 shadow-2xl border-x border-b border-slate-200 overflow-hidden rounded-b-xl">
                                    <div className="bg-[#003c96] h-1 w-full"></div>
                                    <ul className="py-2">
                                        {grouped[m].map(p => (
                                            <li key={p.id}>
                                                <Link
                                                    to={`/products/${p.slug}`}
                                                    className="px-6 py-2.5 hover:bg-slate-50 hover:text-[#003c96] flex items-center justify-between group transition-colors"
                                                >
                                                    <span className="text-[14px] font-bold">{p.name}</span>
                                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* 4. Mobile Sidebar (Drawer) */}
            <div
                className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleSidebar}></div>

                {/* Content */}
                <div className={`absolute top-0 left-0 h-full w-[85%] sm:w-[350px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full uppercase">
                        {/* Sidebar Header */}
                        <div className="bg-[#003c96] text-white p-6 flex justify-between items-center">
                            <Link to="/" onClick={toggleSidebar} className="font-black italic text-xl flex items-center gap-2">
                                <Gamepad2 />
                                <span>DAPS</span><span className="text-red-500">garage</span>
                            </Link>
                            <button onClick={toggleSidebar} className="p-1 hover:bg-white/10 rounded">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Sidebar Menu */}
                        <div className="flex-1 overflow-y-auto bg-slate-50">
                            {Object.keys(grouped).map((m) => (
                                <div key={m} className="border-b border-slate-200 bg-white">
                                    <button
                                        onClick={() => setExpandedManufacturer(expandedManufacturer === m ? null : m)}
                                        className="w-full flex justify-between items-center p-5 font-black text-slate-800 hover:bg-slate-50 transition-colors"
                                    >
                                        <span>{m}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-200 ${expandedManufacturer === m ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Accordion Content */}
                                    <div className={`overflow-hidden transition-all duration-300 ${expandedManufacturer === m ? 'max-h-[500px]' : 'max-h-0'}`}>
                                        <ul className="bg-slate-50 pb-2">
                                            {grouped[m].map(p => (
                                                <li key={p.id}>
                                                    <Link
                                                        to={`/products/${p.slug}`}
                                                        onClick={toggleSidebar}
                                                        className="flex items-center justify-between px-8 py-3 text-sm font-bold text-slate-600 hover:text-[#003c96] hover:bg-white transition-all"
                                                    >
                                                        {p.name}
                                                        <ChevronRight size={14} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            {/* Mobile Extra Links */}
                            <div className="p-5 space-y-4 font-black">
                                <Link to="/trade" onClick={toggleSidebar} className="flex items-center gap-3 text-slate-800 hover:text-[#003c96]">
                                    <CircleDollarSign size={18} /> Trade / Sell
                                </Link>
                                <Link to="/account" onClick={toggleSidebar} className="flex items-center gap-3 text-slate-800 hover:text-[#003c96]">
                                    <User size={18} /> My Account
                                </Link>
                                <Link to="/signin" onClick={toggleSidebar} className="flex items-center gap-3 text-slate-800 hover:text-[#003c96]">
                                    <LogIn size={18} /> Sign In
                                </Link>
                                <div className="h-px bg-slate-200 my-2"></div>
                                <Link to="/about" onClick={toggleSidebar} className="flex items-center gap-3 text-[12px] text-slate-500 hover:text-[#003c96]">
                                    <Info size={16} /> About Us
                                </Link>
                                <Link to="/contact" onClick={toggleSidebar} className="flex items-center gap-3 text-[12px] text-slate-500 hover:text-[#003c96]">
                                    <Mail size={16} /> Contact Support
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="p-6 bg-white border-t border-slate-200">
                            <Link to="/checkout" onClick={toggleSidebar} className="w-full flex justify-center items-center gap-3 bg-yellow-400 text-[#003c96] py-4 rounded-xl font-black text-xl shadow-lg hover:bg-yellow-300 transition-colors">
                                CHECKOUT <ShoppingCart size={24} strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
