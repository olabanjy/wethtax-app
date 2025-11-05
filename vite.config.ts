import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   // Increase warning limit and guide Rollup to split heavy vendor chunks
  //   chunkSizeWarningLimit: 1500,
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (!id.includes("node_modules")) return undefined;
  //         if (id.includes("react-apexcharts") || id.includes("apexcharts")) return "vendor-charts";
  //         if (id.includes("d3")) return "vendor-d3";
  //         if (id.includes("@tanstack")) return "vendor-query";
  //         if (id.includes("react-router-dom")) return "vendor-router";
  //         if (id.includes("lucide-react") || id.includes("react-icons")) return "vendor-icons";
  //         if (id.includes("react")) return "vendor-react";
  //         return "vendor";
  //       },
  //     },
  //   },
  // },
})
