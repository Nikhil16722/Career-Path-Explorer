"use client";

import { motion } from "framer-motion";
import type { RoadmapPhase } from "@/types/career";
import { PHASE_COLORS } from "@/lib/utils";

const PHASE_ICONS = ["🌱", "🛠", "🚀", "⚡", "🏆"];

interface Props { phases: RoadmapPhase[] }

export default function RoadmapTimeline({ phases }: Props) {
    return (
        <div className="space-y-3">
            {phases.map((phase, i) => {
                const color = PHASE_COLORS[i] || "#6366f1";
                const icon = PHASE_ICONS[i] || "📌";
                const last = i === phases.length - 1;

                return (
                    <div key={i} className="flex gap-4">

                        {/* Left spine */}
                        <div className="flex flex-col items-center flex-shrink-0 w-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-base shadow-sm border-2 bg-white z-10"
                                style={{ borderColor: color }}
                            >
                                {icon}
                            </motion.div>
                            {!last && (
                                <div
                                    className="w-0.5 flex-1 min-h-[16px] mt-1 rounded-full"
                                    style={{ background: color + "44" }}
                                />
                            )}
                        </div>

                        {/* Phase card */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 + 0.06 }}
                            className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm mb-3"
                            style={{ borderLeftColor: color, borderLeftWidth: 3 }}
                        >
                            {/* Title + duration */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <span className="text-sm font-semibold text-slate-800">
                                    {phase.name}
                                </span>
                                <span
                                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                                    style={{ background: color + "18", color }}
                                >
                                    {phase.duration}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-400 mb-3">{phase.desc}</p>

                            {/* Skill pills */}
                            <div className="flex flex-wrap gap-2">
                                {phase.skills.map((skill, j) => (
                                    <motion.span
                                        key={j}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.08 + j * 0.04 + 0.1 }}
                                        className="text-xs px-3 py-1 rounded-full border font-medium"
                                        style={{
                                            background: color + "15",
                                            color: color,
                                            borderColor: color + "44",
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
} 
