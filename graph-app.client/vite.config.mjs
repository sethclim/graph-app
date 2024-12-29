// ./vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // allows you to import svgs as react components
 
export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
  };
});