// ─── Core Career Types ────────────────────────────────────────────────────

export type SkillType = "technical" | "tools" | "soft" | "domain";

export interface Skill {
    name: string;
    type: SkillType;
    level: number; // 0–100
}

export interface Position {
    title: string;
    experience: string;
    salary: string;
    skills: Skill[];
}

export interface RoadmapPhase {
    name: string;
    duration: string;
    desc: string;
    skills: string[];
}

export interface FutureTrend {
    icon: string;
    title: string;
    desc: string;
    color: "teal" | "blue" | "purple" | "amber";
}

export interface CareerStats {
    levels: number;
    avgSalary: string;
    growth: string;
    demand: "High" | "Medium" | "Low";
}

export interface CareerData {
    role: string;
    stats: CareerStats;
    positions: Position[];
    phases: RoadmapPhase[];
    future: FutureTrend[];
    generatedAt: string;
}

// ─── API Response Types ───────────────────────────────────────────────────

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export interface SavedRole {
    id: string;
    role: string;
    slug: string;
    data: CareerData;
    created_at: string;
}

export interface TrendingRole {
    role: string;
    slug: string;
    count: number;
}
