"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass, Menu, X, Github } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/compare", label: "Compare" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
                        <Compass size={16} className="text-white" />
                    </div>
                    <span className="font-semibold text-slate-800 text-sm hidden sm:block">
                        Career Path Explorer
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-1">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`text-sm px-4 py-2 rounded-lg transition-colors ${pathname === l.href
                                    ? "bg-indigo-50 text-indigo-600 font-medium"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ml-2"
                    >
                        <Github size={15} />
                        GitHub
                    </a>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="sm:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="sm:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-2">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className={`text-sm px-4 py-2.5 rounded-lg transition-colors ${pathname === l.href
                                    ? "bg-indigo-50 text-indigo-600 font-medium"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
} 
