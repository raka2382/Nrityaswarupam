import type { APIRoute } from "astro";
import { isSupabaseConfigured, getPublicClient } from "../../lib/supabase";

// This route runs on-demand (server), not prerendered at build time.
export const prerender = false;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, message: "Invalid form submission." }, 400);
  }

  const get = (k: string) => (form.get(k) ?? "").toString().trim();
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const danceForm = get("dance_form");
  const level = get("level");
  const message = get("message");

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: "Please provide a valid name and email." }, 422);
  }

  // 1) Store the enquiry in Supabase (best-effort — never lose a lead).
  let stored = false;
  if (isSupabaseConfigured()) {
    try {
      const { error } = await getPublicClient().from("enquiries").insert({
        name,
        email,
        phone: phone || null,
        dance_form: danceForm || null,
        level: level || null,
        message: message || null,
      });
      stored = !error;
    } catch {
      stored = false;
    }
  }

  // 2) Email the academy via Resend (if configured).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL || "Nrityaswarupam <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // No email configured. If we at least stored it, treat as success.
    if (stored) return json({ success: true });
    return json(
      {
        success: false,
        message:
          "The enquiry form isn't connected yet. Connect Supabase and/or Resend (see TIER2_PLAN.md).",
      },
      503
    );
  }

  const html = `
    <h2>New class enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>Dance form:</strong> ${escapeHtml(danceForm) || "—"}</p>
    <p><strong>Level:</strong> ${escapeHtml(level) || "—"}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message) || "—"}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      if (stored) return json({ success: true });
      const detail = await res.text().catch(() => "");
      return json({ success: false, message: "Could not send the enquiry right now.", detail }, 502);
    }

    return json({ success: true });
  } catch {
    if (stored) return json({ success: true });
    return json({ success: false, message: "Could not reach the email service." }, 502);
  }
};
