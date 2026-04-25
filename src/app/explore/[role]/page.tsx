"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Share2, CheckCircle } from "lucide-react";
import type { CareerData } from "@/types/career";
import CareerLadder    from "@/components/career/CareerLadder";
import RoadmapTimeline from "@/components/career/RoadmapTimeline";
import SalaryChart     from "@/components/career/SalaryChart";
import FutureScope     from "@/components/career/FutureScope";
import ExploreSkeleton from "./loading";

// Stat card
function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-xl font-semibold text-slate-800">{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function ExplorePage() {
  const params       = useParams();
  const searchParams = useSearchParams();
  const router       = useRouter();

  const slug = params.role as string;
  const role = searchParams.get("role") || slug.replace(/-/g, " ");

  const [data,    setData]    = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);

  async function fetchData(force = false) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
        cache: force ? "no-store" : "default",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, [role]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <ExploreSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Something went wrong</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => fetchData()}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Page header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-800 leading-none">
                {data.role}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">Complete career roadmap</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchData(true)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? <CheckCircle size={14} /> : <Share2 size={14} />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 space-y-10">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <StatCard label="Career levels"  value={String(data.stats.levels)}     />
          <StatCard label="Average salary" value={data.stats.avgSalary}           />
          <StatCard label="Job growth"     value={data.stats.growth}              />
          <StatCard
            label="Market demand"
            value={data.stats.demand}
            sub={data.stats.demand === "High" ? "Strong hiring" : "Moderate hiring"}
          />
        </motion.div>

        {/* Career Ladder */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionHeader
            title="Career Progression Map"
            subtitle="Positions, required skills and salary at each level"
          />
          <CareerLadder positions={data.positions} />
        </motion.section>

        {/* Salary Chart */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionHeader
            title="Salary Progression"
            subtitle="Expected salary range as you grow in your career"
          />
          <SalaryChart positions={data.positions} />
        </motion.section>

        {/* Roadmap Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader
            title="Learning Roadmap"
            subtitle="Step-by-step guide to land your first role and grow"
          />
          <RoadmapTimeline phases={data.phases} />
        </motion.section>

        {/* Future Scope */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionHeader
            title="Future Scope"
            subtitle="Industry trends and where this career is headed"
          />
          <FutureScope trends={data.future} />
        </motion.section>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}
