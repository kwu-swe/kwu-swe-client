import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        { find: "@components", replacement: "/src/components" },
        { find: "@", replacement: "/src" },
      ],
    },
    build: {
      outDir: "build",
      rollupOptions: {
        context: 'globalThis',
        // Disable native optimization to avoid platform-specific dependencies
        maxParallelFileOps: 1,
        treeshake: {
          moduleSideEffects: true
        }
      }
    },
    define: {
      "process.env": process.env,
    },
  });
};
