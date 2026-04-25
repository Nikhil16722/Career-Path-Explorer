import { NextResponse } from "next/server";
import { getTrending } from "@/lib/supabase";

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
    try {
        const data = await getTrending(8);
        return NextResponse.json({ data });
    } catch (err) {
        console.error("[/api/trending]", err);
        return NextResponse.json({ data: [] });
    }
} 
