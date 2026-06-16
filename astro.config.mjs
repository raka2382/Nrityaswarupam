// @ts-check
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

// Public pages are static; data-driven pages (schedule/gallery/about/home),
// the admin dashboard, and API routes run on-demand (prerender = false) as
// Netlify serverless functions.
export default defineConfig({
  site: "https://nrityaswarupam.example.com",
  output: "static",
  adapter: netlify(),
});
