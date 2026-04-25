"use client";

import { motion } from "framer-motion";
import type { CareerData } from "@/types/career";
import { SKILL_COLORS } from "@/lib/utils";

interface Props {
  dataA: CareerData;
  dataB: CareerData;
}

function StatCompare({
  label, valA, valB,
}: { label: string; valA: string; valB: string }) {
  return (
    <div className="grid grid-cols-3 items-center gap-4 py-3 border-b border-slate-100 last:border-0">
      <div className="text-center">
        <span className="text-sm font-semibold text-slate-800">{valA}</span>
      </div>
      <div className="text-center">
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="text-center">
        <span className="text-sm font-semibold text-slate-800">{valB}</span>
      </div>
    </div>
  );
}

export default function CompareView({ dataA, dataB }: Props) {
  // Collect all unique skills across both roles
  const allSkillsA = dataA.positions.flatMap((p) => p.skills.map((s) => s.name));
  const allSkillsB = dataB.positions.flatMap((p) => p.skills.map((s) => s.name));
  const onlyInA   = [...new Set(allSkillsA.filter((s) => !allSkillsB.includes(s)))].slice(0, 6);
  const onlyInB   = [...new Set(allSkillsB.filter((s) => !allSkillsA.includes(s)))].slice(0, 6);
  const inBoth    = [...new Set(allSkillsA.filter((s) =>  allSkillsB.includes(s)))].slice(0, 8);

  const COLORS = { A: "#6366f1", B: "#0d9488" };

  return (
    <div className="space-y-8">

      {/* Role headers */}
      <div className="grid grid-cols-2 gap-4">
        {[dataA, dataB].map((d, i) => {
          const color = i === 0 ? COLORS.A : COLORS.B;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center"
              style={{ borderTopColor: color, borderTopWidth: 3 }}
            >
              <h2 className="text-lg font-bold text-slate-800 mb-1">{d.role}</h2>
              <p className="text-xs text-slate-400">
                Avg {d.stats.avgSalary} · {d.stats.demand} demand · {d.stats.growth} growth
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Stats comparison */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">
          Head-to-head stats
        </h3>
        <div className="grid grid-cols-3 mb-2">
          <div
            className="text-center text-xs font-semibold py-1 rounded-lg"
            style={{ color: COLORS.A, background: COLORS.A + "10" }}
          >
            {dataA.role}
          </div>
          <div />
          <div
            className="text-center text-xs font-semibold py-1 rounded-lg"
            style={{ color: COLORS.B, background: COLORS.B + "10" }}
          >
            {dataB.role}
          </div>
        </div>
        <StatCompare label="Avg Salary"    valA={dataA.stats.avgSalary} valB={dataB.stats.avgSalary} />
        <StatCompare label="Job Growth"    valA={dataA.stats.growth}    valB={dataB.stats.growth} />
        <StatCompare label="Market Demand" valA={dataA.stats.demand}    valB={dataB.stats.demand} />
        <StatCompare label="Career Levels" valA={String(dataA.stats.levels)} valB={String(dataB.stats.levels)} />
      </div>

      {/* Skill overlap */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-5 text-center">
          Skill comparison
        </h3>
        <div className="grid grid-cols-3 gap-4">

          {/* Only in A */}
          <div>
            <div
              className="text-xs font-semibold text-center mb-3 py-1 rounded-lg"
              style={{ color: COLORS.A, background: COLORS.A + "12" }}
            >
              Only in {dataA.role}
            </div>
            <div className="space-y-2">
              {onlyInA.map((s) => (
                <div
                  key={s}
                  className="text-xs text-center px-2 py-1.5 rounded-lg border"
                  style={{ borderColor: COLORS.A + "33", color: COLORS.A, background: COLORS.A + "08" }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* In both */}
          <div>
            <div className="text-xs font-semibold text-center mb-3 py-1 rounded-lg bg-slate-100 text-slate-600">
              Shared skills
            </div>
            <div className="space-y-2">
              {inBoth.map((s) => (
                <div
                  key={s}
                  className="text-xs text-center px-2 py-1.5 rounded-lg border border-slate-200 text-slate-600 bg-slate-50"
                >
                  ✓ {s}
                </div>
              ))}
            </div>
          </div>

          {/* Only in B */}
          <div>
            <div
              className="text-xs font-semibold text-center mb-3 py-1 rounded-lg"
              style={{ color: COLORS.B, background: COLORS.B + "12" }}
            >
              Only in {dataB.role}
            </div>
            <div className="space-y-2">
              {onlyInB.map((s) => (
                <div
                  key={s}
                  className="text-xs text-center px-2 py-1.5 rounded-lg border"
                  style={{ borderColor: COLORS.B + "33", color: COLORS.B, background: COLORS.B + "08" }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Salary progression side by side */}
      <div className="grid grid-cols-2 gap-4">
        {[dataA, dataB].map((d, i) => {
          const color = i === 0 ? COLORS.A : COLORS.B;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color }}
              >
                {d.role} — Career levels
              </h3>
              <div className="space-y-2">
                {d.positions.map((pos, j) => (
                  <div key={j} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 truncate max-w-[120px]">{pos.title}</span>
                    <span className="font-semibold" style={{ color }}>{pos.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
