
"use client";

import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, Cell
} from "recharts";
import type { Position } from "@/types/career";
import { LEVEL_COLORS } from "@/lib/utils";

interface Props { positions: Position[] }

// Parse "₹8–15 LPA" → midpoint number
function parseSalary(salary: string): { min: number; max: number; mid: number } {
    const nums = salary.replace(/[₹,LPA\s]/g, "").split(/[-–]/).map(Number);
    const min = nums[0] || 0;
    const max = nums[1] || min;
    return { min, max, mid: Math.round((min + max) / 2) };
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
            <p className="font-semibold text-slate-800 mb-1">{label}</p>
            <p className="text-slate-500">Range: <span className="font-medium text-slate-700">{d.range}</span></p>
            <p className="text-slate-500">Avg: <span className="font-medium text-indigo-600">₹{d.mid} LPA</span></p>
        </div>
    );
};

export default function SalaryChart({ positions }: Props) {
    const data = positions.map((p, i) => {
        const { min, max, mid } = parseSalary(p.salary);
        return {
            name: p.title.length > 16 ? p.title.slice(0, 14) + "…" : p.title,
            mid,
            min,
            max,
            range: p.salary,
            color: LEVEL_COLORS[i].circle,
        };
    });

    return (
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
                {positions.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ background: LEVEL_COLORS[i].circle }}
                        />
                        <span className="text-xs text-slate-500">{p.title}</span>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(v) => `₹${v}`}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        width={48}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                    <Bar dataKey="mid" radius={[6, 6, 0, 0]}>
                        {data.map((d, i) => (
                            <Cell key={i} fill={d.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Salary table */}
            <div className="mt-6 border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {positions.map((p, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 rounded-lg"
                        style={{ background: LEVEL_COLORS[i].circleBg }}
                    >
                        <span className="text-xs font-medium" style={{ color: LEVEL_COLORS[i].expText }}>
                            {p.title}
                        </span>
                        <span className="text-xs font-bold" style={{ color: LEVEL_COLORS[i].circle }}>
                            {p.salary}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}