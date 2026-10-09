import assert from "node:assert/strict";
import { mkdir, writeFile, cp, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// 测真实发布入口的生产应用产物；字符长度、开发模式和未下载异步块不算首包。
const destination = resolve(".artifacts/performance/bundles");
await mkdir(destination, { recursive: true });
const manifests = Object.fromEntries(await Promise.all(['react','vue','solid','svelte','kit','primitives','theme','tokens'].map(async name => [name, JSON.parse(await readFile(`packages/${name}/package.json`, 'utf8'))])));
const { createLoongArkTheme } = await import('../packages/theme/dist/index.js');
const { bootstrapKit } = await import('../packages/kit/dist/bootstrap.js');
const theme = createLoongArkTheme({ targetId: 'bundle-probe' });
bootstrapKit(theme);
const css = theme.toStyleSheet();
const report = { node: process.version, mode: "production", sharedStyles: { bytes: Buffer.byteLength(css), gzip: gzipSync(css).length, brotli: brotliCompressSync(css).length }, measurements: [] };
for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const scenario of ["button", "button-subpath", "provider-button", "table", "editor", "deferred-editor"]) {
    const root = resolve(destination, `${framework}-${scenario}`);
    await mkdir(root, { recursive: true });
    const exported =
      ["button", "button-subpath", "provider-button"].includes(scenario)
        ? "LoongArkButton"
        : scenario === "table"
          ? "LoongArkDataTable"
          : "LoongArkCodeEditor";
    let entry =
      scenario === "deferred-editor"
        ? `import {LoongArkButton} from '@loongark/${framework}'; window.component=LoongArkButton; window.loadEditor=()=>import('@loongark/${framework}/editors');`
        : scenario === 'button-subpath' ? `import {LoongArkButton} from '@loongark/${framework}/button'; window.component=LoongArkButton;`
        : scenario === 'provider-button' ? `import {LoongArkProvider} from '@loongark/${framework}/provider'; import {LoongArkButton} from '@loongark/${framework}/button'; window.components=[LoongArkProvider,LoongArkButton];`
        : `import {${exported}} from '@loongark/${framework}'; window.component=${exported};`;
    if (scenario === 'provider-button') {
      const imports = `import {LoongArkProvider} from '@loongark/${framework}/provider';import {LoongArkButton} from '@loongark/${framework}/button';`;
      if (framework === 'react') entry = `import {createElement as h} from 'react';import {createRoot} from 'react-dom/client';${imports}createRoot(document.getElementById('app')).render(h(LoongArkProvider,{},h(LoongArkButton,{},'Save')));`;
      if (framework === 'vue') entry = `import {createApp,h} from 'vue';${imports}createApp({render:()=>h(LoongArkProvider,{},()=>h(LoongArkButton,{},()=> 'Save'))}).mount('#app');`;
      if (framework === 'solid') entry = `import {createComponent as h} from 'solid-js';import {render} from 'solid-js/web';${imports}render(()=>h(LoongArkProvider,{get children(){return h(LoongArkButton,{children:'Save'});}}),document.getElementById('app'));`;
      if (framework === 'svelte') {
        await writeFile(resolve(root,'App.svelte'), `<script>${imports}</script><LoongArkProvider><LoongArkButton>Save</LoongArkButton></LoongArkProvider>`);
        entry = `import {mount} from 'svelte';import App from './App.svelte';mount(App,{target:document.getElementById('app')});`;
      }
    }
    await writeFile(resolve(root, "main.js"), entry);
    await writeFile(
      resolve(root, "index.html"),
      '<!doctype html><meta charset="utf-8"><div id="app"></div><script type="module" src="/main.js"></script>',
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
            const match = /^@loongark\/(react|vue|solid|svelte|kit|primitives|theme|tokens)(\/.+)?$/.exec(id);
            if (!match) return null;
            const manifest = manifests[match[1]];
            let entry = manifest.exports[match[2] ? '.' + match[2] : '.'];
            if (!entry) throw new Error(`未公开入口：${id}`);
            const target = typeof entry === 'string' ? entry : entry.browser ?? entry.import;
            return resolve(`packages/${match[1]}`, target);
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
              initialAdvancedRuntimeModules: entryChunks.flatMap(item => Object.entries(item.modules).filter(([name, info]) => /\/kit\/dist\/(?:data-table|data-models|table-.*|chart-.*|questionnaire|message-scroller)\.js$/.test(name) && info.renderedLength > 0).map(([name]) => name)),
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
      ["button", "button-subpath", "provider-button"].includes(scenario) ||
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
    if (['button','button-subpath','provider-button'].includes(scenario)) assert.deepEqual(measurement.initialAdvancedRuntimeModules, [], `${framework}/${scenario} 包含无关高级运行时`);
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
