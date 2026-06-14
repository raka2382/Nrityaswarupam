import { createClient } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";
import ws from "ws";

// Node < 22 has no global WebSocket. Supabase's realtime client requires one
// even though we never use realtime, so provide the `ws` implementation.
const realtime = { transport: ws as unknown as typeof WebSocket };

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

/** True once the Supabase URL + anon key are present in the environment. */
export const isSupabaseConfigured = () => Boolean(url && anonKey);

/** Anonymous client for public reads (subject to Row Level Security). */
export function getPublicClient() {
  return createClient(url as string, anonKey as string, {
    auth: { persistSession: false },
    realtime,
  });
}

/** Cookie-aware client for auth + admin actions in SSR routes. */
export function createSupabaseServerClient(headers: Headers, cookies: AstroCookies) {
  return createServerClient(url as string, anonKey as string, {
    realtime,
    cookies: {
      getAll() {
        return parseCookieHeader(headers.get("Cookie") ?? "").map((c) => ({
          name: c.name,
          value: c.value ?? "",
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, options));
      },
    },
  });
}
