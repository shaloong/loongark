import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import solid from "vite-plugin-solid";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { publishedWorkspacePlugin } from "./published-workspace-plugin.mjs";

for (const framework of ["react", "vue", "solid", "svelte"]) {
  const directory = resolve(".artifacts/releases/ticket-ssr", framework);
  await mkdir(directory, { recursive: true });
  const extension =
    framework === "vue" ? "ts" : framework === "svelte" ? "svelte" : "tsx";
  const example = normalizePath(
    resolve(`examples/${framework}/TicketWorkflowExample.${extension}`),
  );
  if (framework === "svelte")
    await writeFile(
      resolve(directory, "Page.svelte"),
      `<script>import Example from ${JSON.stringify(example)};import {LoongArkProvider as Provider} from '@shaloong/loongark-svelte';</script><Provider><Example/></Provider>`,
    );
  const component =
    framework === "svelte"
      ? `import Example from './Page.svelte';`
      : `import {TicketWorkflowExample as Example} from ${JSON.stringify(example)};`;
  const provider = `import {LoongArkProvider as Provider} from '@shaloong/loongark-${framework}';`;
  const render =
    framework === "react"
      ? `import {createElement as h} from 'react';import {renderToString} from 'react-dom/server';export const html=renderToString(h(Provider,{},h(Example)));`
      : framework === "vue"
        ? `import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';export const html=await renderToString(createSSRApp({render:()=>h(Provider,{},()=>h(Example))}));`
        : framework === "solid"
          ? `import {createComponent} from 'solid-js';import {renderToString} from 'solid-js/web';export const html=renderToString(()=>createComponent(Provider,{get children(){return createComponent(Example,{})}}));`
          : `import {render} from 'svelte/server';export const html=render(Example).body;`;
  const entry = resolve(directory, "entry.mjs");
  await writeFile(
    entry,
    component + (framework === "svelte" ? "" : provider) + render,
  );
  await build({
    configFile: false,
    plugins: [
      await publishedWorkspacePlugin("node"),
      ...(framework === "react"
        ? [react()]
        : framework === "solid"
          ? [solid({ ssr: true })]
          : framework === "svelte"
            ? [svelte()]
            : []),
    ],
    ssr: { noExternal: framework === "svelte" ? ["@ark-ui/svelte"] : [] },
    logLevel: "error",
    build: {
      ssr: entry,
      outDir: resolve(directory, "dist"),
      rollupOptions: {
        output: { entryFileNames: "index.mjs" },
        onwarn(warning, warn) {
          if (warning.code !== "MODULE_LEVEL_DIRECTIVE") warn(warning);
        },
      },
    },
  });
  const { html } = await import(
    pathToFileURL(resolve(directory, "dist/index.mjs")).href
  );
  const withoutBoundaries = html.replace(/<!--[\s\S]*?-->/g, "");
  for (const text of [
    "工单工作台",
    "搜索工单",
    "找到 3 条工单",
    "T-101",
    "更新项目文档",
    "编辑所选工单",
  ])
    assert.ok(
      withoutBoundaries.includes(text),
      `${framework} SSR 缺少 ${text}`,
    );
  assert.doesNotMatch(html, /保存中…/);
  assert.doesNotMatch(html, /aria-label="Filter rows"/);
  console.log(`${framework} 工单组合真实发布入口 SSR 通过`);
}
