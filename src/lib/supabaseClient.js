import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase env vars are missing. Copy .env.example to .env and fill in " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. See docs/SETUP_SUPABASE.md."
  );
}

// Only the public anon key belongs here. It is safe to expose in the
// frontend because every table it can touch is protected by Row Level
// Security policies (see supabase/rls_policies.sql). The service-role/secret
// key must never be used in frontend code.
const fallbackFetch = async () =>
  new Response(
    JSON.stringify({
      code: "SUPABASE_NOT_CONFIGURED",
      message: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.",
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );

export const supabase = createClient(
  supabaseUrl || "https://supabase-not-configured.invalid",
  supabaseAnonKey || "supabase-not-configured",
  isSupabaseConfigured ? undefined : { global: { fetch: fallbackFetch } }
);
