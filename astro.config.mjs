// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// Public pages are static; data-driven pages (schedule/gallery/about), the admin
// dashboard, and API routes run on-demand via the Node adapter (prerender = false).
// To deploy on Netlify/Vercel, swap the adapter for theirs.
export default defineConfig({
  site: "https://nrityaswarupam.example.com",
  output: "static",
  adapter: node({ mode: "standalone" }),
});
