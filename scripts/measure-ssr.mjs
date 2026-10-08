import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const folder = resolve(".artifacts/performance/ssr");
const frameworks = ["react", "vue", "solid", "svelte"];
const cases = ["button", "table", "code", "rich"];
const data = Array.from({ length: 10000 }, (_, id) => ({
  id: String(id),
  name: `Row ${id}`,
  amount: id,
}));
const properties = (kind) =>
  kind === "table"
    ? {
        data,
        columns: [
          { key: "name", label: "Name" },
          { key: "amount", label: "Amount" },
        ],
        virtualization: { height: 320, estimateSize: 40, overscan: 3 },
        pageSize: 10000,
      }
    : kind === "code"
      ? {
          defaultValue: "const message = '你好';\n".repeat(100),
          language: "typescript",
          label: "Code",
        }
      : kind === "rich"
        ? {
            defaultValue: {
              type: "doc",
              content: Array.from({ length: 100 }, () => ({
                type: "paragraph",
                content: [{ type: "text", text: "中文富文本 SSR 性能验证。" }],
              })),
            },
            label: "Rich text",
          }
        : { children: "Continue" };
const componentName = (kind) =>
  kind === "table"
    ? "LoongArkDataTable"
    : kind === "code"
      ? "LoongArkCodeEditor"
      : kind === "rich"
        ? "LoongArkRichTextEditor"
        : "LoongArkButton";

if (process.argv[2] === "--worker") {
  const framework = process.argv[3];
  const start = performance.now();
  let render;
  if (framework === "react") {
    const [api, React, server] = await Promise.all([
      import("../packages/react/dist/index.js"),
      import("react"),
      import("react-dom/server"),
    ]);
    render = (kind) =>
      server.renderToString(
        React.createElement(
          api.LoongArkProvider,
          {},
          React.createElement(api[componentName(kind)], properties(kind)),
        ),
      );
  } else if (framework === "vue") {
    const [api, Vue, server] = await Promise.all([
      import("../packages/vue/dist/index.js"),
      import("vue"),
      import("vue/server-renderer"),
    ]);
    render = async (kind) =>
      server.renderToString(
        Vue.createSSRApp({
          render: () =>
            Vue.h(api.LoongArkProvider, {}, () => {
              const { children, ...props } = properties(kind);
              return Vue.h(
                api[componentName(kind)],
                props,
                kind === "button" ? () => children : undefined,
              );
            }),
        }),
      );
  } else if (framework === "solid") {
    const [api, Solid, server] = await Promise.all([
      import("../packages/solid/dist/server/index.js"),
      import("solid-js"),
      import("solid-js/web"),
    ]);
    render = (kind) =>
      server.renderToString(() =>
        Solid.createComponent(api.LoongArkProvider, {
          get children() {
            return Solid.createComponent(
              api[componentName(kind)],
              properties(kind),
            );
          },
        }),
      );
  } else {
    const server = await import("svelte/server");
    const components = Object.fromEntries(
      await Promise.all(
        cases.map(async (kind) => [
          kind,
          (
            await import(
              pathToFileURL(resolve(folder, kind, "dist/index.mjs")).href
            )
          ).default,
        ]),
      ),
    );
    render = (kind) => server.render(components[kind]).body;
  }
  const coldImportMs = performance.now() - start;
  const { createLoongArkTheme } =
    await import("../packages/theme/dist/index.js");
  const { bootstrapKit } = await import("../packages/kit/dist/index.js");
  const styleSamples = [];
  let styleBytes = 0;
  for (let index = 0; index < 35; index++) {
    const styleStart = performance.now();
    const theme = createLoongArkTheme({ targetId: "ssr-perf" });
    bootstrapKit(theme);
    styleBytes = Buffer.byteLength(theme.toStyleSheet());
    theme.unmount();
    if (index >= 5) styleSamples.push(performance.now() - styleStart);
  }
  styleSamples.sort((a, b) => a - b);
  const results = [];
  for (const kind of cases) {
    for (let index = 0; index < 5; index++) await render(kind);
    const samples = [];
    let html;
    for (let index = 0; index < 30; index++) {
      const start = performance.now();
      html = await render(kind);
      samples.push(performance.now() - start);
    }
    assert.ok(html.length > 0);
    if (kind === "table")
      assert.ok(!html.includes("Row 9999"), "表格 SSR 必须维持有界窗口");
    if (kind === "code")
      assert.ok(!html.includes("cm-editor"), "SSR 不挂载编辑器引擎");
    samples.sort((left, right) => left - right);
    results.push({
      kind,
      samples: samples.length,
      medianMs: samples[15],
      p95Ms: samples[28],
      htmlBytes: Buffer.byteLength(html),
    });
  }
  console.log(
    JSON.stringify({
      framework,
      coldImportMs,
      results,
      style: {
        medianMs: styleSamples[15],
        p95Ms: styleSamples[28],
        bytes: styleBytes,
      },
      memory: process.memoryUsage(),
    }),
  );
  process.exit(0);
}

await mkdir(folder, { recursive: true });
for (const kind of cases) {
  const root = resolve(folder, kind);
  await mkdir(root, { recursive: true });
  const props = properties(kind);
  const markup =
    kind === "button"
      ? "<L.LoongArkButton>Continue</L.LoongArkButton>"
      : `<L.${componentName(kind)} {...props} />`;
  await writeFile(
    resolve(root, "App.svelte"),
    `<script>import * as L from '@loongark/svelte';const props=${JSON.stringify(props)};</script><L.LoongArkProvider>${markup}</L.LoongArkProvider>`,
  );
  await build({
    configFile: false,
    root,
    logLevel: "error",
    plugins: [
      {
        name: "shared-runtime",
        enforce: "pre",
        resolveId(id) {
          if (/^@loongark\/(kit|theme|primitives|tokens)$/.test(id))
            return {
              id: resolve(`packages/${id.split("/")[1]}/dist/index.js`),
              external: true,
            };
        },
      },
      svelte(),
    ],
    resolve: {
      alias: { "@loongark/svelte": resolve("packages/svelte/dist/index.js") },
      dedupe: ["svelte"],
    },
    ssr: { noExternal: ["@loongark/svelte", "@ark-ui/svelte"] },
    build: {
      ssr: resolve(root, "App.svelte"),
      outDir: "dist",
      minify: true,
      rollupOptions: {
        external: (id) => id === "svelte" || id.startsWith("svelte/"),
        output: { entryFileNames: "index.mjs" },
        onwarn(warning, warn) {
          if (warning.code !== "MODULE_LEVEL_DIRECTIVE") warn(warning);
        },
      },
    },
  });
}
const report = {
  node: process.version,
  scope:
    "包含 Provider 渲染；共享主题样式生成/序列化独立测量；每进程5次预热、30次渲染；10,000行数据在计时外构造；冷导入5个独立进程。",
  measurements: [],
};
for (const framework of frameworks) {
  const runs = [];
  for (let index = 0; index < 5; index++) {
    const result = spawnSync(
      process.execPath,
      ["scripts/measure-ssr.mjs", "--worker", framework],
      { encoding: "utf8", timeout: 120000 },
    );
    assert.equal(
      result.status,
      0,
      `${framework} SSR 测量失败：${result.stderr || result.stdout}`,
    );
    runs.push(JSON.parse(result.stdout.trim().split("\n").at(-1)));
  }
  report.measurements.push({ framework, runs });
  console.log(
    framework,
    "冷导入中位数",
    runs
      .map((run) => run.coldImportMs)
      .sort((a, b) => a - b)[2]
      .toFixed(2),
    "ms；渲染",
    runs[2].results,
  );
}
await writeFile(
  resolve(folder, "report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
