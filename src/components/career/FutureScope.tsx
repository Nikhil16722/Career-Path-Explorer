"use client";

import { motion } from "framer-motion";
import type { FutureTrend } from "@/types/career";
import { FUTURE_THEMES } from "@/lib/utils";

interface Props { trends: FutureTrend[] }

export default function FutureScope({ trends }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trends.map((t, i) => {
                const theme = FUTURE_THEMES[t.color] ?? FUTURE_THEMES.teal;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl p-5 border"
                        style={{
                            background: theme.bg,
                            borderColor: theme.border,
                        }}
                    >
                        <div className="text-2xl mb-3">{t.icon}</div>
                        <h3
                            className="text-sm font-semibold mb-2"
                            style={{ color: theme.title }}
                        >
                            {t.title}
                        </h3>
                        <p
                            className="text-xs leading-relaxed"
                            style={{ color: theme.desc }}
                        >
                            {t.desc}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
