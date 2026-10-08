import assert from "node:assert/strict";
import { mkdir, writeFile, cp } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// 测真实发布入口的生产应用产物；字符长度、开发模式和未下载异步块不算首包。
const destination = resolve(".artifacts/performance/bundles");
await mkdir(destination, { recursive: true });
const report = { node: process.version, mode: "production", measurements: [] };
for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const scenario of ["button", "table", "editor", "deferred-editor"]) {
    const root = resolve(destination, `${framework}-${scenario}`);
    await mkdir(root, { recursive: true });
    const exported =
      scenario === "button"
        ? "LoongArkButton"
        : scenario === "table"
          ? "LoongArkDataTable"
          : "LoongArkCodeEditor";
    const entry =
      scenario === "deferred-editor"
        ? `import {LoongArkButton} from '@loongark/${framework}'; window.component=LoongArkButton; window.loadEditor=()=>import('@loongark/${framework}/editors');`
        : `import {${exported}} from '@loongark/${framework}'; window.component=${exported};`;
    await writeFile(resolve(root, "main.js"), entry);
    await writeFile(
      resolve(root, "index.html"),
      '<!doctype html><meta charset="utf-8"><script type="module" src="/main.js"></script>',
    );
    let measurement;
    await build({
      configFile: false,
      root,
      base: "./",
      mode: "production",
      logLevel: "error",
      plugins: [
        ...(framework === "svelte" ? [svelte()] : []),
        {
          name: "published-workspace-entry",
          resolveId(id) {
            const match =
              /^@loongark\/(react|vue|solid|svelte|kit|primitives|theme|tokens)(\/editors)?$/.exec(
                id,
              );
            return match
              ? resolve(
                  `packages/${match[1]}/dist/${match[2] ? "components/editors.js" : "index.js"}`,
                )
              : null;
          },
          generateBundle(_, bundle) {
            const chunks = Object.values(bundle).filter(
              (item) => item.type === "chunk",
            );
            const initial = new Set();
            const visit = (name) => {
              if (initial.has(name)) return;
              initial.add(name);
              bundle[name]?.imports?.forEach(visit);
            };
            chunks
              .filter((item) => item.isEntry)
              .forEach((item) => visit(item.fileName));
            const sizes = (items) =>
              items.reduce(
                (sum, item) => ({
                  bytes: sum.bytes + Buffer.byteLength(item.code),
                  gzip: sum.gzip + gzipSync(item.code).length,
                  brotli: sum.brotli + brotliCompressSync(item.code).length,
                }),
                { bytes: 0, gzip: 0, brotli: 0 },
              );
            const entryChunks = chunks.filter((item) =>
              initial.has(item.fileName),
            );
            const editorModules = (items) => [
              ...new Set(
                items.flatMap((item) =>
                  Object.entries(item.modules)
                    .filter(
                      ([name, info]) =>
                        /(?:codemirror|prosemirror)/.test(name) &&
                        info.renderedLength > 0,
                    )
                    .map(([name]) => name.replace(/^.*node_modules\//, "")),
                ),
              ),
            ];
            measurement = {
              framework,
              scenario,
              initial: sizes(entryChunks),
              all: sizes(chunks),
              initialEditorModules: editorModules(entryChunks),
              allEditorModules: editorModules(chunks),
              chunks: chunks.map((item) => ({
                file: item.fileName,
                initial: initial.has(item.fileName),
                bytes: Buffer.byteLength(item.code),
              })),
            };
          },
        },
      ],
      build: {
        outDir: "dist",
        minify: "esbuild",
        sourcemap: false,
        reportCompressedSize: false,
        rollupOptions: {
          onwarn(warning, warn) {
            if (warning.code !== "MODULE_LEVEL_DIRECTIVE") warn(warning);
          },
        },
      },
    });
    if (
      scenario === "button" ||
      scenario === "table" ||
      scenario === "deferred-editor"
    ) {
      if (measurement.initialEditorModules.length)
        console.error(
          measurement.framework,
          measurement.scenario,
          measurement.initialEditorModules,
        );
      assert.equal(
        measurement.initialEditorModules.length,
        0,
        `${framework}/${scenario} 不应提前加载编辑器引擎`,
      );
    }
    if (scenario === "editor" || scenario === "deferred-editor")
      assert.ok(
        measurement.allEditorModules.length > 0,
        "编辑器能力必须保留在真实产物中",
      );
    report.measurements.push(measurement);
    if (scenario === "deferred-editor")
      await cp(
        resolve(root, "dist"),
        resolve(`tests/consumer-dist/performance/${framework}-deferred-editor`),
        { recursive: true },
      );
    console.log(
      framework,
      scenario,
      measurement.initial,
      `异步块 ${measurement.chunks.filter((item) => !item.initial).length}`,
    );
  }
}
await writeFile(
  resolve(destination, "report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  "生产包体与编辑器加载边界通过；完整报告位于 .artifacts/performance/bundles/report.json。",
);
