import { useEffect, useState } from "react"
import { platformService } from "../services/api"
import {
    Truck,
    ShoppingCart,
    User,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Gamepad2,
    Info,
    Mail,
    LogIn
} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Header() {
    const { user } = useAuth()
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

    if (loading) return <div className="bg-slate-900 h-1 w-full animate-pulse"></div>

    return (
        <header className="w-full font-sans border-b-4 border-slate-900">
            <div className="bg-[#fbbf24] text-slate-900 text-[10px] md:text-[11px] font-black py-2 px-4 border-b-2 border-slate-900/10 uppercase tracking-widest">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <div className="flex items-center gap-3">
                        <Truck size={14} strokeWidth={3} />
                        <span>FREE SURAKARTA KOTA SHIPPING ON ORDERS OVER Rp 200.000!!</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#f59e0b] text-slate-900 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-[#f59e0b] transition-all"
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link to="/" className="flex flex-col items-center group">
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-900 text-[#f59e0b] p-1.5 border-2 border-slate-900 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                                <Gamepad2 size={24} strokeWidth={3} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <div className="text-3xl font-black italic tracking-tighter flex items-center gap-1 uppercase">
                                    <span>DAPS</span>
                                    <span className="text-red-600 group-hover:text-slate-900 transition-colors">garage</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-80 mt-1">Garage Sales</span>
                            </div>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-[12px] font-black uppercase tracking-widest">
                        <Link to="/contact" className="hover:text-red-600 transition-colors flex items-center gap-2">
                            <Mail size={16} strokeWidth={3} /> Contact
                        </Link>
                        <Link to="/about" className="hover:text-red-600 transition-colors flex items-center gap-2">
                            <Info size={16} strokeWidth={3} /> About
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-widest text-slate-900">
                        <Link to="/profile" className="hidden sm:flex items-center gap-2 hover:text-red-600 transition-colors">
                            <User size={18} strokeWidth={3} /> {user ? user.full_name : "Account"}
                        </Link>
                        <Link to="/cart" className="flex items-center gap-3 bg-slate-900 text-[#f59e0b] px-6 py-2.5 border-2 border-slate-900 hover:bg-transparent hover:text-slate-900 transition-all font-black italic">
                            <span className="hidden sm:inline">My Cart</span>
                            <ShoppingCart size={20} strokeWidth={3} />
                        </Link>
                    </div>
                </div>
            </div>

            <nav className="hidden lg:block bg-slate-900 text-[#f59e0b] border-t-2 border-slate-900">
                <div className="flex max-w-7xl mx-auto h-14 justify-start">
                    {Object.keys(grouped).map((m) => (
                        <div
                            key={m}
                            className="relative h-full"
                            onMouseEnter={() => setActiveManufacturer(m)}
                            onMouseLeave={() => setActiveManufacturer(null)}
                        >
                            <button className={`px-10 h-full font-black text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2 border-r-2 border-white/5 ${activeManufacturer === m ? 'bg-red-600 text-slate-900' : 'hover:bg-white/10'}`}>
                                {m}
                                <ChevronDown size={14} strokeWidth={3} className={`transition-transform duration-200 ${activeManufacturer === m ? 'rotate-180' : ''}`} />
                            </button>

                            {activeManufacturer === m && (
                                <div className="absolute top-full left-0 w-72 bg-slate-900 border-2 border-slate-900 z-50">
                                    <div className="bg-red-600 h-1 w-full"></div>
                                    <ul className="py-2">
                                        {grouped[m].map(p => (
                                            <li key={p.id}>
                                                <Link
                                                    to={`/products/${p.slug}`}
                                                    className="px-8 py-3.5 hover:bg-white/10 flex items-center justify-between group transition-colors"
                                                >
                                                    <span className="text-[13px] font-black uppercase tracking-wider">{p.name}</span>
                                                    <ChevronRight size={14} strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
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

            <div
                className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={toggleSidebar}></div>

                <div className={`absolute top-0 left-0 h-full w-[85%] sm:w-[400px] bg-[#f59e0b] border-r-4 border-slate-900 transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full uppercase font-black">
                        <div className="bg-slate-900 text-[#f59e0b] p-8 flex justify-between items-center">
                            <Link to="/" onClick={toggleSidebar} className="italic text-2xl flex items-center gap-3">
                                <Gamepad2 strokeWidth={3} />
                                <span>DAPS</span><span className="text-red-600">garage</span>
                            </Link>
                            <button onClick={toggleSidebar} className="p-2 border-2 border-[#f59e0b] hover:bg-[#f59e0b] hover:text-slate-900 transition-colors">
                                <X size={26} strokeWidth={3} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {Object.keys(grouped).map((m) => (
                                <div key={m} className="border-b-2 border-slate-900">
                                    <button
                                        onClick={() => setExpandedManufacturer(expandedManufacturer === m ? null : m)}
                                        className="w-full flex justify-between items-center p-6 text-slate-900 hover:bg-white/10 transition-colors tracking-widest"
                                    >
                                        <span>{m}</span>
                                        <ChevronDown
                                            size={20}
                                            strokeWidth={3}
                                            className={`transition-transform duration-200 ${expandedManufacturer === m ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ${expandedManufacturer === m ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                        <ul className="bg-slate-900/5 pb-4">
                                            {grouped[m].map(p => (
                                                <li key={p.id}>
                                                    <Link
                                                        to={`/products/${p.slug}`}
                                                        onClick={toggleSidebar}
                                                        className="flex items-center justify-between px-10 py-4 text-sm font-black text-slate-700 hover:text-red-600 hover:bg-white/10 transition-all border-l-4 border-transparent hover:border-red-600"
                                                    >
                                                        {p.name}
                                                        <ChevronRight size={14} strokeWidth={3} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            <div className="p-8 space-y-6 font-black tracking-widest text-slate-900">
                                <Link to="/profile" onClick={toggleSidebar} className="flex items-center gap-4 hover:text-red-600 transition-colors">
                                    <User size={20} strokeWidth={3} /> My Account
                                </Link>
                                <Link to="/login" onClick={toggleSidebar} className="flex items-center gap-4 hover:text-red-600 transition-colors">
                                    <LogIn size={20} strokeWidth={3} /> Sign In
                                </Link>
                                <div className="h-0.5 bg-slate-900/20"></div>
                                <Link to="/about" onClick={toggleSidebar} className="flex items-center gap-4 text-xs font-bold hover:text-red-600 transition-colors">
                                    <Info size={18} strokeWidth={3} /> About
                                </Link>
                                <Link to="/contact" onClick={toggleSidebar} className="flex items-center gap-4 text-xs font-bold hover:text-red-600 transition-colors">
                                    <Mail size={18} strokeWidth={3} /> Contact Support
                                </Link>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900 border-t-4 border-slate-900">
                            <Link to="/cart" onClick={toggleSidebar} className="w-full flex justify-center items-center gap-4 bg-red-600 text-slate-900 py-5 font-black text-xl italic hover:bg-[#f59e0b] transition-all border-2 border-red-600">
                                My Cart <ShoppingCart size={24} strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
