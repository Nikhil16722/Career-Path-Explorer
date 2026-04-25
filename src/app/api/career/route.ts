import { NextRequest, NextResponse } from "next/server";
import { generateCareerData, roleToSlug } from "@/lib/gemini";
import { saveRoadmap, saveTrending, getRoadmap } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30; // Vercel max for free plan

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const role = (body.role as string)?.trim();

    if (!role || role.length < 2) {
      return NextResponse.json(
        { error: "Role is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (role.length > 80) {
      return NextResponse.json(
        { error: "Role name too long (max 80 characters)" },
        { status: 400 }
      );
    }

    const slug = roleToSlug(role);

    // ── 1. Check cache first (avoid re-calling Gemini) ──────────────────
    const cached = await getRoadmap(slug);
    if (cached?.data) {
      return NextResponse.json({ data: cached.data, cached: true });
    }

    // ── 2. Call Gemini AI ────────────────────────────────────────────────
    const data = await generateCareerData(role);

    // ── 3. Save to Supabase (background — don't await to keep it fast) ───
    Promise.all([
      saveRoadmap(role, slug, data),
      saveTrending(role, slug),
    ]).catch(console.error);

    return NextResponse.json({ data, cached: false });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/career] Error:", message);

    // Gemini rate limit
    if (message.includes("429") || message.includes("quota")) {
      return NextResponse.json(
        { error: "AI rate limit reached. Please try again in a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate career data. Please try again." },
      { status: 500 }
    );
  }
}
