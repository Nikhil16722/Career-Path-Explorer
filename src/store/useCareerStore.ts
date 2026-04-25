
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CareerData } from "@/types/career";

interface CareerStore {
    // Recent searches (stored in localStorage)
    history: string[];
    addHistory: (role: string) => void;
    clearHistory: () => void;

    // In-memory cache of generated career data
    cache: Record<string, CareerData>;
    setCache: (slug: string, data: CareerData) => void;
    getCache: (slug: string) => CareerData | undefined;

    // Currently viewed role
    currentRole: string | null;
    setCurrentRole: (role: string | null) => void;
}

export const useCareerStore = create<CareerStore>()(
    persist(
        (set, get) => ({
            // ── History ────────────────────────────────────────────────────────
            history: [],
            addHistory(role) {
                set((s) => ({
                    history: [role, ...s.history.filter((r) => r !== role)].slice(0, 10),
                }));
            },
            clearHistory() {
                set({ history: [] });
            },

            // ── In-memory cache ────────────────────────────────────────────────
            cache: {},
            setCache(slug, data) {
                set((s) => ({ cache: { ...s.cache, [slug]: data } }));
            },
            getCache(slug) {
                return get().cache[slug];
            },

            // ── Current role ──────────────────────────────────────────────────
            currentRole: null,
            setCurrentRole(role) {
                set({ currentRole: role });
            },
        }),
        {
            name: "career-store",
            // Only persist history to localStorage, not the full cache
            partialize: (s) => ({ history: s.history }),
        }
    )
);