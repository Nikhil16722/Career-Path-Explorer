-- ─── File 12: supabase/migrations/001_init.sql ───────────────────────────
-- Run this in your Supabase project → SQL Editor → New Query → Run

-- ─── Trending roles table ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trending_roles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role       text NOT NULL,
  slug       text NOT NULL UNIQUE,
  count      integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── Saved roadmaps table ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_roles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role       text NOT NULL,
  slug       text NOT NULL UNIQUE,
  data       jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── Indexes for fast lookups ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_trending_slug  ON trending_roles(slug);
CREATE INDEX IF NOT EXISTS idx_trending_count ON trending_roles(count DESC);
CREATE INDEX IF NOT EXISTS idx_saved_slug     ON saved_roles(slug);

-- ─── RLS (Row Level Security) ─────────────────────────────────────────────
ALTER TABLE trending_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_roles    ENABLE ROW LEVEL SECURITY;

-- Allow public read on trending roles
CREATE POLICY "public can read trending"
  ON trending_roles FOR SELECT USING (true);

-- Allow public read on saved roles (cached career data)
CREATE POLICY "public can read saved"
  ON saved_roles FOR SELECT USING (true);

-- Only service role can insert/update (done from API routes)
CREATE POLICY "service role can write trending"
  ON trending_roles FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service role can write saved"
  ON saved_roles FOR ALL USING (auth.role() = 'service_role');

-- ─── Upsert trending function ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION upsert_trending(p_role text, p_slug text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO trending_roles (role, slug, count)
  VALUES (p_role, p_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET
    count      = trending_roles.count + 1,
    updated_at = now();
END;
$$; 
