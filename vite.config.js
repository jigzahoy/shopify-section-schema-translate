import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// vite.config.js
export default defineConfig({
  base: "/shopify-section-schema-translate/",
  plugins: [tailwindcss()],
});
