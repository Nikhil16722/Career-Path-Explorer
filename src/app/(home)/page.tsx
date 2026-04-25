"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, TrendingUp, ArrowRight, Zap } from "lucide-react";
import { roleToSlug } from "@/lib/gemini";
import type { TrendingRole } from "@/types/career";

const PLACEHOLDER_ROLES = [
    "Data Analyst",
    "Full Stack Developer",
    "DevOps Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "Cloud Architect",
];

const QUICK_ROLES = [
    "Data Analyst",
    "Full Stack Developer",
    "DevOps Engineer",
    "Product Manager",
    "UI/UX Designer",
    "ML Engineer",
    "Cybersecurity",
    "Cloud Architect",
];

export default function HomePage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [placeholderIdx, setPlaceholderIdx] = useState(0);
    const [trending, setTrending] = useState<TrendingRole[]>([]);

    // Rotating placeholder text
    useEffect(() => {
        const id = setInterval(() => {
            setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_ROLES.length);
        }, 2500);
        return () => clearInterval(id);
    }, []);

    // Fetch trending roles
    useEffect(() => {
        fetch("/api/trending")
            .then((r) => r.json())
            .then((d) => setTrending(d.data ?? []))
            .catch(() => { });
    }, []);

    function handleExplore(role: string) {
        const r = role.trim() || query.trim();
        if (!r) return;
        setLoading(true);
        router.push(`/explore/${roleToSlug(r)}?role=${encodeURIComponent(r)}`);
    }

    function handleKey(e: React.KeyboardEvent) {
        if (e.key === "Enter") handleExplore(query);
    }

    return (
        <div className="min-h-screen bg-grid bg-slate-50 relative">

            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-32">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium px-4 py-2 rounded-full">
                        <Sparkles size={13} />
                        Powered by Gemini 2.5 Flash AI — 100% Free
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-4"
                >
                    <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                        Your complete
                        <br />
                        <span className="gradient-text">career roadmap</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-slate-500 text-lg mb-12 max-w-xl mx-auto"
                >
                    Type any job role and get positions, required skills, salary ranges,
                    learning path and future scope — instantly.
                </motion.p>

                {/* Search box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative mb-6"
                >
                    <div className="flex gap-3 bg-white border border-slate-200 rounded-2xl p-2 shadow-lg shadow-slate-200/60">
                        <div className="flex items-center pl-3 text-slate-400">
                            <Search size={20} />
                        </div>
                        <AnimatePresence mode="wait">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder={`Try "${PLACEHOLDER_ROLES[placeholderIdx]}"`}
                                className="flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 text-base outline-none py-3 pr-2"
                            />
                        </AnimatePresence>
                        <button
                            onClick={() => handleExplore(query)}
                            disabled={loading}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Explore <ArrowRight size={15} />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Quick role chips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-2 mb-16"
                >
                    {QUICK_ROLES.map((role) => (
                        <button
                            key={role}
                            onClick={() => handleExplore(role)}
                            className="text-sm text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all duration-150 active:scale-95"
                        >
                            {role}
                        </button>
                    ))}
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-4 mb-16"
                >
                    {[
                        { icon: <Zap size={18} className="text-indigo-500" />, label: "Instant results", sub: "Under 5 seconds" },
                        { icon: <Sparkles size={18} className="text-purple-500" />, label: "AI-powered", sub: "Gemini 2.5 Flash" },
                        { icon: <TrendingUp size={18} className="text-teal-500" />, label: "Any job role", sub: "500+ careers" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm">
                            <div className="flex justify-center mb-2">{s.icon}</div>
                            <div className="text-sm font-medium text-slate-700">{s.label}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Trending searches */}
                {trending.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp size={15} className="text-slate-400" />
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Trending searches
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {trending.map((t) => (
                                <button
                                    key={t.slug}
                                    onClick={() => handleExplore(t.role)}
                                    className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 px-4 py-2 rounded-full transition-all"
                                >
                                    <span>{t.role}</span>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                                        {t.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
} 
