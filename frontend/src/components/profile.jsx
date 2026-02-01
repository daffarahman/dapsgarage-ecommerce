import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-amber-100 pb-20">
            {/* Minimal Navigation Spacer */}
            <div className="h-12 border-b border-slate-100 mb-12"></div>

            <div className="max-w-5xl mx-auto px-6">
                {/* Header Section */}
                <header className="mb-16 border-b-2 border-slate-900 pb-8">
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                        DAPS <span className="text-red-600">garage</span><br />
                        <span className="text-slate-900 not-italic">Member Terminal</span>
                    </h1>
                </header>

                {/* Identity Block */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">User Identity</p>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Identity</label>
                                    <p className="text-xl font-black text-slate-900">{user.full_name}</p>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Contact Email</label>
                                    <p className="text-lg font-bold text-slate-900">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-xs font-black uppercase text-slate-900 tracking-widest">Session Active / Verified</span>
                            </div>

                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-3 p-5 bg-slate-900 text-[#f59e0b] hover:bg-red-600 hover:text-white transition-all group"
                            >
                                <LogOut size={20} strokeWidth={2.5} />
                                <span className="text-sm font-black uppercase tracking-[0.2em]">Log Out</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <footer className="mt-20 text-center">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                        DapsGarage Internal Terminal v4.1
                    </p>
                </footer>
            </div>
        </div>
    );
}