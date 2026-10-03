import assert from "node:assert/strict";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { render } from "svelte/server";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const alias = Object.fromEntries(
  ["tokens", "theme", "primitives", "kit", "svelte"].map((name) => [
    `@loongark/${name}`,
    resolve(`packages/${name}/dist/index.js`),
  ]),
);
await build({
  configFile: false,
  plugins: [svelte()],
  resolve: { alias, dedupe: ["svelte"] },
  ssr: { noExternal: ["@loongark/svelte", "@ark-ui/svelte"] },
  build: {
    ssr: "tests/consumers/svelte/Ssr.svelte",
    outDir: "tests/consumer-dist/svelte-ssr",
    minify: false,
    rollupOptions: {
      external: (id) => id === "svelte" || id.startsWith("svelte/"),
      output: { entryFileNames: "index.mjs" },
    },
  },
});
const { default: component } = await import(
  pathToFileURL(resolve("tests/consumer-dist/svelte-ssr/index.mjs")).href
);
const html = render(component).body;
assert.match(
  html,
  /<input(?=[^>]*name="assigned")(?=[^>]*value="alpha")[^>]*>/,
);
assert.match(html, /<input(?=[^>]*name="meeting")(?=[^>]*value="13:30")[^>]*>/);
assert.match(
  html,
  /<textarea(?=[^>]*data-autosize="true")(?=[^>]*rows="2")[^>]*>/,
);
assert.match(html, /Hello from Svelte SSR/);
for (const scope of [
  "attachment",
  "bubble",
  "message",
  "message-scroller",
  "questionnaire",
])
  assert.match(html, new RegExp(`data-scope="${scope}"`));
assert.match(html, /Conversation SSR/);
assert.match(html, /SSR answer/);
assert.match(html, /<textarea[^>]*name="notes"[^>]*>SSR notes<\/textarea>/);
assert.match(html, /<button[^>]*type="button"[^>]*>.*?Remove.*?<\/button>/);
assert.match(html, /<a[^>]*aria-current="page"[^>]*>.*?Home.*?<\/a>/);
assert.match(html, /data-scope="floating-action-button"/);
assert.match(html, /data-scope="speed-dial"/);
assert.match(html, /Image SSR/);
assert.match(html, /Media SSR/);
console.log("Svelte 发布产物 SSR 通过");
