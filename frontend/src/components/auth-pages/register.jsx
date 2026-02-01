import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/api";
import { Gamepad2, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.register(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate("/signin"); // Assuming /signin will exist, otherwise redirect to home
            }, 2000);
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 overflow-hidden">
                {/* Header/Logo */}
                <div className="bg-[#f59e0b] p-8 text-center">
                    <h1 className="text-3xl font-black text-slate-900 italic tracking-tight flex items-center justify-center gap-1.5 leading-none">
                        Become a member!
                    </h1>
                </div>

                {/* Form Section */}
                <div className="p-8 md:p-10">
                    {success ? (
                        <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase">Success!</h2>
                            <p className="text-slate-600 font-medium">Your account has been created. Redirecting to sign in...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-3">
                                    <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">!</div>
                                    {error}
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-wider ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:border-[#f59e0b] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:border-[#f59e0b] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:border-[#f59e0b] focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 text-[#f59e0b] py-4 rounded-xl font-black text-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8 uppercase tracking-widest disabled:bg-slate-300 disabled:text-slate-500"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight size={22} strokeWidth={2.5} />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm font-bold text-slate-500 mt-6 tracking-tight">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-[#f59e0b] hover:text-orange-600 transition-colors underline underline-offset-4"
                                >
                                    Sign In here
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}