import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Career Path Explorer — AI-Powered Career Guidance",
        template: "%s | Career Path Explorer",
    },
    description:
        "Discover your complete career roadmap with AI. Get positions, skills, salary ranges, and future scope for any job role — powered by Gemini AI.",
    keywords: [
        "career guidance", "career roadmap", "job skills", "salary",
        "career path", "AI career", "data analyst", "developer career"
    ],
    openGraph: {
        type: "website",
        title: "Career Path Explorer",
        description: "AI-powered career roadmap for any job role",
        siteName: "Career Path Explorer",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen bg-slate-50 font-sans antialiased">
                <Navbar />
                <main>{children}</main>

                {/* Footer */}
                <footer className="border-t border-slate-200 bg-white mt-20">
                    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">C</span>
                            </div>
                            <span className="text-sm text-slate-500">Career Path Explorer</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Powered by Gemini AI · Built with Next.js · Free forever
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
