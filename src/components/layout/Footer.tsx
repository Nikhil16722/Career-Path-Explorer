import Link from "next/link";
import { Compass, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Compass size={14} className="text-white" />
              </div>
              <span className="font-semibold text-slate-800 text-sm">
                Career Path Explorer
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered career guidance for any job role. Free forever.
              Built with Next.js and Gemini AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Explore
            </p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/",        label: "Home"         },
                { href: "/compare", label: "Compare Roles"},
                { href: "/saved",   label: "Saved Roadmaps"},
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Built with
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Next.js 14",          href: "https://nextjs.org"              },
                { label: "Gemini 2.5 Flash",    href: "https://aistudio.google.com"     },
                { label: "Supabase",            href: "https://supabase.com"            },
                { label: "Vercel",              href: "https://vercel.com"              },
              ].map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  {t.label}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Career Path Explorer · Free &amp; Open Source
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Github size={13} /> View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
