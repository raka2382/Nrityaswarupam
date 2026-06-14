import { defineMiddleware } from "astro:middleware";
import { isSupabaseConfigured, createSupabaseServerClient } from "./lib/supabase";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/callback"];

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  // Only guard the admin area.
  if (!path.startsWith("/admin")) return next();
  if (PUBLIC_ADMIN_PATHS.includes(path)) return next();

  // Without Supabase configured, send admins to the login page (it explains setup).
  if (!isSupabaseConfigured()) return context.redirect("/admin/login");

  const supabase = createSupabaseServerClient(context.request.headers, context.cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return context.redirect("/admin/login");

  // Optional second layer: restrict to an explicit allowlist of admin emails.
  // Set ADMIN_EMAILS="a@x.com,b@y.com" in the environment to enable it.
  const allow = process.env.ADMIN_EMAILS;
  if (allow) {
    const list = allow.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!user.email || !list.includes(user.email.toLowerCase())) {
      await supabase.auth.signOut();
      return context.redirect("/admin/login?denied=1");
    }
  }

  context.locals.user = user;
  return next();
});
