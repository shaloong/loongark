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
const drawerTriggers = [
  ...html.matchAll(
    /<button(?=[^>]*data-scope="drawer")(?=[^>]*data-part="trigger")[^>]*>/g,
  ),
].map(([tag]) => ({
  id: tag.match(/\bid="([^"]+)"/)?.[1],
  owner: tag.match(/\bdata-ownedby="([^"]+)"/)?.[1],
}));
assert.equal(drawerTriggers.length, 17);
assert.equal(new Set(drawerTriggers.map((trigger) => trigger.id)).size, 17);
for (const trigger of drawerTriggers) {
  assert.ok(trigger.id && !trigger.id.includes("undefined"));
  assert.ok(trigger.owner);
  assert.equal(trigger.id, `drawer:${trigger.owner}:trigger`);
}
console.log(
  "Svelte SSR Drawer：原有触发器与两个全方向示例的 17 个触发器均保留唯一 ID 和所有权关联。",
);
assert.match(html, /aria-rowcount="10000"/);
assert.match(html, /aria-colcount="80"/);
assert.match(html, /SSR_grid_0_0/);
assert.doesNotMatch(html, /SSR_grid_5000_40|SSR_masonry_5000/);
assert.match(html, /aria-setsize="10000"/);
const gridCells = [...html.matchAll(/data-row-key="grid-row-[^"]+"/g)];
const masonryItems = [...html.matchAll(/data-virtual-key="masonry-[^"]+"/g)];
assert(gridCells.length > 0 && gridCells.length < 80);
assert(masonryItems.length > 0 && masonryItems.length < 30);

assert.match(html, /aria-colcount="51"/);
assert.match(html, /SSR_window_0/);
assert.match(html, /SSR_window_49/);
assert.ok(!html.includes("SSR_window_26"));
assert.match(html, /data-part="column-spacer"/);
assert.match(html, /name="contactsSSR\[stable\]\[name\]"/);
assert.match(html, /Group &lt;safe&gt;/);
assert.ok(!html.includes("must-not-render-hidden"));
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
const virtualKeys = [...html.matchAll(/data-virtual-key="(m-[^"]+)"/g)].map(
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
assert.equal((html.match(/data-pinned="end"/g) ?? []).length, 4);
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

assert.match(html, /SSR source &lt;safe&gt;/);
assert.match(html, /SSR rich &lt;safe&gt;/);
assert.match(html, /name="ssr-source"/);
assert.match(html, /name="ssr-document"/);
console.log("Svelte 独立编辑器 SSR 转义、表单值、无 DOM/语法请求/回调通过");
assert.match(html, /data-part="area"/);
assert.match(html, /data-part="slice"/);
assert.match(html, /data-slice-key="Axis &lt;safe&gt;"/);
assert.match(html, /<th scope="col">at<\/th>/);
assert.match(html, /<th scope="col">x<\/th>/);
console.log("Svelte 图表新增类型与轴 SSR 转义、可访问原始数据及无回调通过");

assert.equal([...html.matchAll(/<input(?=[^>]*name="multiMatrix\[row\]")(?=[^>]*checked)[^>]*>/g)].length, 2);

assert.ok(html.includes('data-part="rank-instructions"'));
assert.equal([...html.matchAll(/data-question-control="rank-drag"/g)].length, 2);
assert.ok(html.indexOf('name="rankSurvey" value="b"') < html.indexOf('name="rankSurvey" value="a"'));

assert.match(html,/SSR custom &lt;safe(?:&gt;|>) 3/);
assert.match(html,/SSR custom &lt;safe(?:&gt;|>) 4/);
assert.match(html,/SSR ordinary &lt;safe&gt;/);
assert.equal((html.match(/name="customPeople\[stable\]\[score\]"/g)??[]).length,1);
assert.equal((html.match(/name="score"/g)??[]).length,1);
assert.ok(!html.includes("hidden-custom-answer"));

assert.match(html, /<input(?=[^>]*name="ssr-rating")(?=[^>]*value="3")[^>]*>/);

assert.match(html, /<input(?=[^>]*name="ssr-local-datetime")(?=[^>]*value="2026-10-06T14:35:20")[^>]*>/);
assert.match(html, /<input(?=[^>]*name="ssr-zoned-datetime")(?=[^>]*value="2026-10-06T14:35:20\+08:00\[Asia\/Shanghai\]")[^>]*>/);
assert.match(html, /aria-label="SSR localized date"[^>]*>2026-10-06/);
console.log("Svelte 本地化解析及完整日期时间/时区表单值SSR无回调通过");

for (const prefix of ["ssr-inherit", "ssr-individual"])
  for (const kind of ["input", "textarea"]) {
      const tag = html.match(new RegExp('<' + kind + '(?=[^>]*name="' + prefix + '-' + kind + '")[^>]*>'))?.[0];
    assert.ok(tag, prefix + " " + kind);
    for (const state of ["disabled", "readonly", "required"])
      assert.match(tag, new RegExp("\\s" + state + "(?:\\s|=|>)", "i"));
  }
console.log("Svelte Input/Textarea 父级状态继承及独立状态SSR通过");
