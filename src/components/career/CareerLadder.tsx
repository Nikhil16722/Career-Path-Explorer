"use client";

import { motion } from "framer-motion";
import type { Position } from "@/types/career";
import { LEVEL_COLORS, SKILL_COLORS } from "@/lib/utils";

interface Props { positions: Position[] }

export default function CareerLadder({ positions }: Props) {
    return (
        <div className="space-y-0">
            {positions.map((pos, i) => {
                const c = LEVEL_COLORS[i];
                const last = i === positions.length - 1;

                return (
                    <div key={i} className="flex gap-0">

                        {/* Spine */}
                        <div className="flex flex-col items-center w-14 flex-shrink-0 pt-2">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-semibold z-10 bg-white shadow-sm"
                                style={{ borderColor: c.circle, color: c.circle }}
                            >
                                {i + 1}
                            </motion.div>
                            {!last && (
                                <div
                                    className="w-0.5 flex-1 min-h-[32px] mt-1"
                                    style={{ background: c.line }}
                                />
                            )}
                        </div>

                        {/* Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.05 }}
                            className="flex-1 bg-white border border-slate-100 rounded-xl p-5 shadow-sm mb-3 ml-3"
                            style={{ borderLeftColor: c.circle, borderLeftWidth: 3 }}
                        >
                            {/* Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <h3 className="text-base font-semibold text-slate-800">
                                    {pos.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{ background: c.circleBg, color: c.expText }}
                                    >
                                        {pos.experience}
                                    </span>
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: c.circle }}
                                    >
                                        {pos.salary}
                                    </span>
                                </div>
                            </div>

                            {/* Skills grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {pos.skills.map((skill, j) => {
                                    const sc = SKILL_COLORS[skill.type];
                                    return (
                                        <motion.div
                                            key={j}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 + j * 0.04 }}
                                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 border"
                                            style={{ background: sc.bg + "55", borderColor: sc.dot + "44" }}
                                        >
                                            {/* Colored dot */}
                                            <div
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ background: sc.dot }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div
                                                    className="text-xs font-medium truncate"
                                                    style={{ color: sc.text }}
                                                >
                                                    {skill.name}
                                                </div>
                                                {/* Skill level bar */}
                                                <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ delay: i * 0.1 + j * 0.04 + 0.2, duration: 0.7, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{ background: sc.bar }}
                                                    />
                                                </div>
                                            </div>
                                            <span
                                                className="text-xs font-medium flex-shrink-0"
                                                style={{ color: sc.text }}
                                            >
                                                {skill.level}%
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Skill type legend */}
                            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-slate-100">
                                {(["technical", "tools", "soft", "domain"] as const).map((t) => {
                                    const sc = SKILL_COLORS[t];
                                    const count = pos.skills.filter((s) => s.type === t).length;
                                    if (!count) return null;
                                    return (
                                        <div key={t} className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full" style={{ background: sc.dot }} />
                                            <span className="text-xs text-slate-400 capitalize">{t} ({count})</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
