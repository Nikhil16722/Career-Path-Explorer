import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { roleToSlug } from "@/lib/gemini";
import type { CareerData } from "@/types/career";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, data }: { role: string; data: CareerData } = body;

    if (!role?.trim()) {
      return NextResponse.json({ error: "role is required" }, { status: 400 });
    }
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "data is required" }, { status: 400 });
    }

    const slug   = roleToSlug(role);
    const server = createServerClient();

    const { error } = await server
      .from("saved_roles")
      .upsert({ role, slug, data }, { onConflict: "slug" });

    if (error) throw error;

    return NextResponse.json({ success: true, slug });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/save]", message);
    return NextResponse.json({ error: "Failed to save roadmap" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const server = createServerClient();
    const { data, error } = await server
      .from("saved_roles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data });

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
