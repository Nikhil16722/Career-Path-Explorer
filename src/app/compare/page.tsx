"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, ArrowRight, X } from "lucide-react";
import { roleToSlug } from "@/lib/gemini";
import type { CareerData } from "@/types/career";
import CompareView from "@/components/career/CompareView";

const POPULAR = [
  "Data Analyst", "Data Scientist", "Full Stack Developer",
  "DevOps Engineer", "Product Manager", "UI/UX Designer",
  "ML Engineer", "Cybersecurity Analyst", "Cloud Architect",
];

export default function ComparePage() {
  const [roleA, setRoleA] = useState("");
  const [roleB, setRoleB] = useState("");
  const [dataA, setDataA] = useState<CareerData | null>(null);
  const [dataB, setDataB] = useState<CareerData | null>(null);
  const [loadA, setLoadA] = useState(false);
  const [loadB, setLoadB] = useState(false);
  const [errA,  setErrA]  = useState("");
  const [errB,  setErrB]  = useState("");

  async function fetchRole(
    role: string,
    setData: (d: CareerData) => void,
    setLoad: (v: boolean) => void,
    setErr: (e: string) => void
  ) {
    if (!role.trim()) return;
    setLoad(true);
    setErr("");
    try {
      const res  = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoad(false);
    }
  }

  function handleCompare() {
    if (roleA) fetchRole(roleA, setDataA, setLoadA, setErrA);
    if (roleB) fetchRole(roleB, setDataB, setLoadB, setErrB);
  }

  function reset() {
    setRoleA(""); setRoleB("");
    setDataA(null); setDataB(null);
    setErrA(""); setErrB("");
  }

  const bothLoaded = dataA && dataB;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <GitCompare size={18} className="text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Compare Roles</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Compare two job roles side by side — skills, salary, roadmap and future scope
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Input row */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

            {/* Role A */}
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Role A</label>
              <input
                type="text"
                value={roleA}
                onChange={(e) => setRoleA(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCompare()}
                placeholder="e.g. Data Analyst"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-slate-800 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* VS badge */}
            <div className="flex items-end pb-1 justify-center">
              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-600">
                VS
              </div>
            </div>

            {/* Role B */}
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Role B</label>
              <input
                type="text"
                value={roleB}
                onChange={(e) => setRoleB(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCompare()}
                placeholder="e.g. Data Scientist"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-slate-800 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleCompare}
                disabled={!roleA || !roleB || loadA || loadB}
                className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                {loadA || loadB ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Compare <ArrowRight size={15} /></>
                )}
              </button>
              {bothLoaded && (
                <button
                  onClick={reset}
                  className="h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick picks */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2">Popular roles</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((r) => (
                <button
                  key={r}
                  onClick={() => !roleA ? setRoleA(r) : setRoleB(r)}
                  className="text-xs text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-full transition-all"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error messages */}
        {(errA || errB) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {errA && <p>Role A: {errA}</p>}
            {errB && <p>Role B: {errB}</p>}
          </div>
        )}

        {/* Empty state */}
        {!dataA && !dataB && !loadA && !loadB && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">
              Enter two roles to compare
            </h2>
            <p className="text-slate-400 text-sm">
              Pick from the popular roles above or type any job role
            </p>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {(loadA || loadB) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[loadA, loadB].map((l, i) =>
              l ? (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse space-y-4">
                  <div className="skeleton w-40 h-6 rounded" />
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="skeleton w-full h-16 rounded-xl" />
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Compare view */}
        {bothLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CompareView dataA={dataA} dataB={dataB} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
