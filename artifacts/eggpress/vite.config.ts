import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "src", "assets"),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    host: "0.0.0.0",
    allowedHosts: true,
    hmr: {
      clientPort: 443,
      protocol: "wss",
      host: process.env.REPLIT_DEV_DOMAIN,
    },
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: Number(process.env.PORT) || 4173,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
