import { build } from "vite";
import { readdir } from "node:fs/promises";
import solid from "vite-plugin-solid";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const workspace = resolve(fileURLToPath(new URL("..", import.meta.url)));
const require = createRequire(
  resolve(workspace, "packages/solid/package.json"),
);
const arkDirectory = dirname(require.resolve("@ark-ui/solid/package.json"));
const arkManifest = require("@ark-ui/solid/package.json");
const nativeJSX = {
  name: "loongark-solid-native-ssr",
  enforce: "pre",
  resolveId(id) {
    if (!id.startsWith("@ark-ui/solid")) return;
    const key =
      id === "@ark-ui/solid" ? "." : "./" + id.slice("@ark-ui/solid/".length);
    const entry = arkManifest.exports[key] ?? arkManifest.exports["./*"];
    return join(arkDirectory, entry.solid.replaceAll("*", key.slice(2)));
  },
};
await build({
  root: workspace,
  configFile: false,
  plugins: [
    nativeJSX,
    solid({ include: ["**/*.jsx", "**/*.tsx"], exclude: [], ssr: true }),
  ],
  resolve: { conditions: ["solid", "node"] },
  ssr: {
    noExternal: ["@ark-ui/solid"],
    resolve: { conditions: ["solid", "node"] },
  },
  build: {
    ssr: true,
    outDir: resolve(workspace, "packages/solid/dist/server"),
    minify: false,
    rollupOptions: {
      input: {
        index: resolve(workspace, "packages/solid/dist/ssr/index.js"),
        editors: resolve(workspace, "packages/solid/dist/ssr/components/editors.js"),
        ...Object.fromEntries((await readdir(resolve(workspace, "packages/solid/dist/ssr/entries"))).filter(name => name.endsWith(".js")).map(name => [`entries/${name.slice(0,-3)}`, resolve(workspace, "packages/solid/dist/ssr/entries", name)])),
      },
      external: (id) =>
        id === "solid-js" ||
        id.startsWith("solid-js/") ||
        id.startsWith("@loongark/"),
      output: { entryFileNames: "[name].js" },
    },
  },
  logLevel: "error",
});
console.log("Solid 与 Ark JSX 的 SSR 入口构建通过");
