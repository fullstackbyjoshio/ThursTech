import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/products",
  "/repair-request",
  "/quote",
  "/shop",
  "/projects",
  "/faq",
  "/request-repair",
  "/request-a-quote",
  "/services/ac-installation",
  "/services/ac-repair",
  "/services/ac-servicing",
  "/services/ac-maintenance",
  "/services/ac-relocation",
  "/services/commercial-hvac",
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://www.thurstech.com.ng",
      // The plugin discovers `/` from dist/index.html, so avoid emitting it twice.
      dynamicRoutes: publicRoutes.filter((route) => route !== "/"),
      externalSitemaps: ["https://thurstech.vercel.app/sitemap.xml"],
      generateRobotsTxt: true,
      readable: true,
      robots: [
        { userAgent: "*", allow: "/", disallow: "/admin/" },
        { userAgent: "Googlebot", allow: "/" },
      ],
    }),
  ],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@supabase")) {
              return "supabase";
            }
            if (id.includes("framer-motion") || id.includes("/motion/")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            return "vendor";
          }
        },
      },
    },
  },
});