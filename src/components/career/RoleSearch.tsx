"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { roleToSlug } from "@/lib/gemini";

const SUGGESTIONS = [
    "Data Analyst", "Data Scientist", "Data Engineer",
    "Full Stack Developer", "Frontend Developer", "Backend Developer",
    "DevOps Engineer", "Cloud Architect", "Site Reliability Engineer",
    "Product Manager", "UI/UX Designer", "UX Researcher",
    "Machine Learning Engineer", "AI Engineer", "MLOps Engineer",
    "Cybersecurity Analyst", "Penetration Tester", "Security Engineer",
    "Mobile Developer", "Android Developer", "iOS Developer",
    "Blockchain Developer", "Game Developer", "Embedded Systems Engineer",
];

interface Props {
    placeholder?: string;
    size?: "sm" | "md" | "lg";
}

export default function RoleSearch({
    placeholder = "Search any job role...",
    size = "md",
}: Props) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = query.length > 1
        ? SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
        : [];

    function go(role: string) {
        if (!role.trim()) return;
        setLoading(true);
        setFocused(false);
        router.push(`/explore/${roleToSlug(role)}?role=${encodeURIComponent(role)}`);
    }

    function handleKey(e: React.KeyboardEvent) {
        if (e.key === "Enter") go(query);
        if (e.key === "Escape") { setFocused(false); inputRef.current?.blur(); }
    }

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (!(e.target as Element).closest("#role-search-wrap")) {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const heights: Record<string, string> = {
        sm: "h-10 text-sm",
        md: "h-12 text-base",
        lg: "h-14 text-lg",
    };

    return (
        <div id="role-search-wrap" className="relative w-full">
            {/* Input */}
            <div
                className={`flex items-center gap-3 bg-white border rounded-xl px-4 shadow-sm transition-all duration-200 ${focused
                        ? "border-indigo-400 ring-2 ring-indigo-100"
                        : "border-slate-200 hover:border-slate-300"
                    } ${heights[size]}`}
            >
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onKeyDown={handleKey}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none"
                />
                {query && (
                    <button onClick={() => { setQuery(""); inputRef.current?.focus(); }}>
                        <X size={16} className="text-slate-400 hover:text-slate-600" />
                    </button>
                )}
                <button
                    onClick={() => go(query)}
                    disabled={loading || !query.trim()}
                    className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        "Go"
                    )}
                </button>
            </div>

            {/* Dropdown suggestions */}
            {focused && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    {filtered.map((s) => (
                        <button
                            key={s}
                            onMouseDown={() => go(s)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                        >
                            <Search size={13} className="text-slate-300" />
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
