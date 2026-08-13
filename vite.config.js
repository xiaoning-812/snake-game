import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base 使用相对路径，构建产物可直接托管在任意子路径下
// （GitHub Pages 项目站点、阿里云 OSS、Cloudflare Pages 等均适用）
export default defineConfig({
  base: "./",
  plugins: [react()],
});
