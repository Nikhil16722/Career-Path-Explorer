"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types/career";
import { SKILL_COLORS } from "@/lib/utils";

interface Props {
    skill: Skill;
    delay?: number;
    showType?: boolean;
}

export default function SkillCard({ skill, delay = 0, showType = false }: Props) {
    const sc = SKILL_COLORS[skill.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 border"
            style={{
                background: sc.bg + "60",
                borderColor: sc.dot + "55",
            }}
        >
            {/* Type dot */}
            <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: sc.dot }}
            />

            <div className="flex-1 min-w-0">
                {/* Name + type */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                        className="text-xs font-medium truncate"
                        style={{ color: sc.text }}
                    >
                        {skill.name}
                    </span>
                    {showType && (
                        <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full capitalize flex-shrink-0"
                            style={{ background: sc.dot + "22", color: sc.text }}
                        >
                            {skill.type}
                        </span>
                    )}
                </div>

                {/* Bar */}
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: delay + 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                        className="h-full rounded-full"
                        style={{ background: sc.bar }}
                    />
                </div>
            </div>

            {/* Percentage */}
            <span
                className="text-xs font-semibold flex-shrink-0 w-8 text-right"
                style={{ color: sc.text }}
            >
                {skill.level}%
            </span>
        </motion.div>
    );
}
