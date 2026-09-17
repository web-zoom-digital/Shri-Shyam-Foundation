import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co"

// Server-side client: uses service role key (bypasses RLS) — only used in API routes
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_key"

// Public client: uses anon key — safe to expose
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_key"

/** Server-side admin client (bypasses Row Level Security) */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})

/** Client-side public client (respects Row Level Security) */
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})
