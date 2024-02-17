import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// import { webpackStats } from "rollup-plugin-webpack-stats";
import { defineConfig } from "vite";
// import pkg from "./package.json";
// import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig((conf) => ({
  // test: {
  //   environment: "jsdom",
  //   setupFiles: ["./vitestSetup.ts"],
  // },
  plugins: [
    vue(),
    vueJsx(),
    // webpackStats()
  ],
  server: {
    port: 8825,
  },
  // used so that vitest resolves the core package from the sources instead of the built version
  resolve: {
    alias:
      conf.command === "build"
        ? ({} as Record<string, string>)
        : ({
            // load live from sources with live reload working
            "@blocknote/core": path.resolve(__dirname, "../core/src/"),
            "blocknote-editor-vue": path.resolve(__dirname, "/src/"),
          } as Record<string, string>),
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "blocknote-react",
      fileName: "blocknote-react",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: Object.keys({
      //   ...pkg.dependencies,
      //   ...pkg.peerDependencies,
      //   ...pkg.devDependencies,
      // }),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   react: "React",
        //   "react-dom": "ReactDOM",
        // },
        // interop: "compat", // https://rollupjs.org/migration/#changed-defaults
      },
    },
  },
}));
