import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Customize output directory
    assetsDir: "assets", // Store assets in a subdirectory
    sourcemap: true, // Generate sourcemaps
    rollupOptions: {
      input: {
        main: "index.html", // Main entry point
      },
      output: {
        format: "es", // Use ECMAScript modules for output
        entryFileNames: "[name].[hash].js", // Custom entry file naming
        chunkFileNames: "[name].[hash].js", // Custom chunk file naming
        assetFileNames: "[name].[hash][extname]", // Custom asset file naming
      },
    },
  },
});
