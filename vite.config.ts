import { defineConfig } from "vite";

export default defineConfig({
  base: "/daily-chess-puzzle-viewer/",
  build: {
    outDir: "docs",
    target: "esnext",
  },
});
