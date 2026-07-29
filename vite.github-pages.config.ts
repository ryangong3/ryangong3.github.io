import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL("./github-pages", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "next/image": fileURLToPath(
        new URL("./github-pages/next-image.tsx", import.meta.url),
      ),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./docs", import.meta.url)),
    emptyOutDir: true,
  },
});
