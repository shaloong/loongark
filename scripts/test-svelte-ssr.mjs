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
assert.match(html, /aria-label="Move Project &lt;safe&gt; column"/);
assert.match(
  html,
  /aria-valuemin="120"[^>]*aria-valuemax="480"[^>]*aria-valuenow="220"/,
);
assert.match(html, /tabindex="-1"[^>]*aria-disabled="true"/);
assert.match(html, /data-part="batch-trigger"/);
assert.match(html, /data-part="range-start"/);
assert.match(html, /data-part="inspect-category"/);
assert.match(html, /aria-rowcount="1001"/);
assert.match(html, /aria-setsize="500"/);
const virtualKeys = [...html.matchAll(/data-virtual-key="([^"]+)"/g)].map(
  (m) => m[1],
);
assert(virtualKeys.length > 0 && virtualKeys.length < 20);
assert(virtualKeys.includes("m-499"));
assert(!virtualKeys.includes("v-500"));
assert.match(
  html,
  /<input(?=[^>]*name="assigned")(?=[^>]*value="alpha")[^>]*>/,
);
assert.match(html, /<input(?=[^>]*name="meeting")(?=[^>]*value="13:30")[^>]*>/);
assert.match(
  html,
  /<textarea(?=[^>]*data-autosize="true")(?=[^>]*rows="2")[^>]*>/,
);
assert.match(html, /Visible conditional SSR answer/);
assert.doesNotMatch(html, /Hidden answer must not leak|name="hiddenSSR"/);
assert.match(html, /name="visibleSSR"/);
assert.match(html, /Hello from Svelte SSR/);
assert.match(html, /SSR client fallback/);
assert.doesNotMatch(html, /Client-only secret/);
assert.match(html, /SSR JSON/);
assert.match(html, /data-scope="image-cropper"/);
assert.match(html, /name="ssr-framework"/);
assert.match(html, /<mark[^>]*>highlighted<\/mark>/);

assert.match(html, /aria-label="SSR legend"/);
assert.match(html, /SSR category — SSR series: 1e\+308/);
assert.match(html.replace(/<[^>]*>/g, ""), /1 rows · 1 selected/);
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
assert.match(
  html,
  /<input(?=[^>]*name="ssr-date")(?=[^>]*value="10\/3\/2026")[^>]*>/,
);
for (const text of ["SSR outline", "SSR swap off", "SSR drawer trigger"])
  assert.ok(html.includes(text));
assert.equal((html.match(/id="toc:ssr-outline"/g) ?? []).length, 1);
assert.match(html, /id="toc:ssr-outline-nav"/);
console.log("Svelte 发布产物 SSR 通过");

assert.match(html, /SSR remote row/);
assert.equal((html.match(/data-pinned="start"/g) ?? []).length, 4);
assert.equal((html.match(/data-pinned="end"/g) ?? []).length, 2);
assert.doesNotMatch(html, /style="[^"]*--lk-data-table-pin-offset/);
assert.match(html, /SSR remote failure/);
assert.match(html, /aria-busy="true"/);
assert.match(html.replace(/<[^>]*>/g, ""), /21 rows · 1 selected · 3 \/ 11/);

assert.match(html, /Advanced SSR category — Visible SSR series: 75/);
assert.match(html, /Visible range: 0 to 50/);
assert.match(html, /<caption>Advanced SSR chart<\/caption>/);
assert.match(html, /aria-pressed="false"/);
assert.doesNotMatch(html, /<th scope="col">Hidden SSR series/);

assert.match(html, /Save SSR/);
assert.match(
  html,
  /<button(?=[^>]*data-action-id="archive")(?=[^>]*disabled)[^>]*>/,
);
assert.match(html, /aria-label="Preview SSR actions.txt"/);
assert.match(html, /aria-label="Cancel upload SSR upload.zip"/);
assert.doesNotMatch(html, /data-part="action-feedback"/);

assert.match(html, /aria-label="SSR search"/);
assert.match(html, /non-scaling-stroke/);

assert.match(html, /name="typed\[row\]"/);

assert.match(html, /SSR async idle 1/);

assert.match(html, /Query SSR row/);
assert.match(html, /data-part="sort-priority"/);
const filterErrorIds = [
  ...html.matchAll(/<p[^>]*id="([^"]+-filter-1)"[^>]*role="alert"/g),
].map((match) => match[1]);
assert.equal(filterErrorIds.length, 2);
assert.equal(new Set(filterErrorIds).size, 2);
for (const id of filterErrorIds)
  assert(html.includes(`aria-describedby="${id}"`));
console.log("Svelte 多列查询 SSR 草稿、选项与多实例错误关联通过");

assert.match(
  html,
  /<option(?=[^>]*value="0")(?=[^>]*selected)[^>]*>Unassigned/,
);

assert.match(html, /Team: Team &lt;safe&gt; · 2 rows/);
assert.match(html, /data-row-kind="group"/);
assert.match(html, /data-part="row-expand"[^>]*aria-expanded="true"/);
assert.match(html, /SSR grouped row/);
console.log("Svelte 分组聚合原生展开、转义及SSR无回调通过");

assert.match(
  html,
  /aria-label="SSR hidden columns"[\s\S]*data-part="row-expand"/,
);
assert.match(html, /Team: Hidden columns group · 1 row/);

assert.match(html, /role="grid"[^>]*aria-multiselectable="true"/);
assert.match(
  html,
  /role="gridcell"[^>]*data-cell-row="range"[^>]*aria-selected="true"/,
);
assert.match(html, /Range &lt;safe&gt;/);
console.log("Svelte 范围选择 SSR 单一焦点、原生grid语义、转义及无回调通过");
