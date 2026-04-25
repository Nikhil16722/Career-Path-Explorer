import { NextRequest, NextResponse } from "next/server";
import { saveRoadmap } from "@/lib/supabase";
import { roleToSlug } from "@/lib/gemini";
import type { CareerData } from "@/types/career";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { role, data }: { role: string; data: CareerData } = body;

        if (!role || !data) {
            return NextResponse.json(
                { error: "role and data are required" },
                { status: 400 }
            );
        }

        const slug = roleToSlug(role);
        await saveRoadmap(role, slug, data);

        return NextResponse.json({ success: true, slug });
    } catch (err) {
        console.error("[/api/save]", err);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
} 
