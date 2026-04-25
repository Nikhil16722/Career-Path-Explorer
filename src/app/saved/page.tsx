"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, ArrowRight, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { roleToSlug } from "@/lib/gemini";
import type { SavedRole } from "@/types/career";

export default function SavedPage() {
  const [roles,   setRoles]   = useState<SavedRole[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("saved_roles")
      .select("id, role, slug, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) setRoles(data as SavedRole[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const COLORS = [
    "#6366f1", "#0d9488", "#7c3aed", "#db2777", "#d97706",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Bookmark size={18} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Saved Roadmaps</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  All career roadmaps generated on this platform
                </p>
              </div>
            </div>
            <button
              onClick={load}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="skeleton w-8 h-8 rounded-lg mb-4" />
                <div className="skeleton w-36 h-5 rounded mb-2" />
                <div className="skeleton w-24 h-3 rounded mb-4" />
                <div className="skeleton w-20 h-8 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && roles.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">
              No saved roadmaps yet
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Search for a job role on the homepage to generate your first roadmap
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Go to homepage <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Role cards grid */}
        {!loading && roles.length > 0 && (
          <>
            <p className="text-sm text-slate-400 mb-5">
              {roles.length} roadmap{roles.length !== 1 ? "s" : ""} generated
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((r, i) => {
                const color = COLORS[i % COLORS.length];
                const date  = new Date(r.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                });

                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                      style={{ background: color + "18" }}
                    >
                      🧭
                    </div>

                    {/* Role name */}
                    <h3 className="text-base font-semibold text-slate-800 mb-1 capitalize">
                      {r.role}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Generated {date}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/explore/${r.slug}?role=${encodeURIComponent(r.role)}`}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors text-white"
                        style={{ background: color }}
                      >
                        View <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
