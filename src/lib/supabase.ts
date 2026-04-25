import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ─── Browser client (use in components) ──────────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnon);

// ─── Server client (use in API routes) ───────────────────────────────────
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

// ─── DB helpers ───────────────────────────────────────────────────────────
export async function saveTrending(role: string, slug: string) {
  const server = createServerClient();

  // upsert: if role exists increment count, else insert with count=1
  const { error } = await server.rpc("upsert_trending", {
    p_role: role,
    p_slug: slug,
  });

  if (error) console.error("saveTrending error:", error.message);
}

export async function getTrending(limit = 8) {
  const { data, error } = await supabase
    .from("trending_roles")
    .select("role, slug, count")
    .order("count", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

export async function saveRoadmap(role: string, slug: string, data: object) {
  const server = createServerClient();
  const { error } = await server.from("saved_roles").upsert(
    { role, slug, data },
    { onConflict: "slug" }
  );
  if (error) console.error("saveRoadmap error:", error.message);
}

export async function getRoadmap(slug: string) {
  const { data, error } = await supabase
    .from("saved_roles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}
