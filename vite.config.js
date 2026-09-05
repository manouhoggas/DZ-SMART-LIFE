import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile() inlines all JS/CSS straight into index.html, so the
// build output is one self-contained file with no separate /assets/*
// requests — no `base` path config needed, works at any URL or subpath
// (perfect for GitHub Pages, or just opening the file directly).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
