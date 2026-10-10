import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";

// 临时消费项目先生成自身锁文件，再冻结安装；不修改或放宽仓库锁文件。
const root = await mkdtemp(resolve(tmpdir(), "loongark-minimum-"));
const packs = JSON.parse(
  await readFile(".artifacts/releases/packages/report.json", "utf8"),
);
const versions = {
  react: "18.0.0",
  "react-dom": "18.0.0",
  vue: "3.5.43",
  "solid-js": "1.9.17",
  svelte: "5.57.2",
};
const ark = Object.fromEntries(
  await Promise.all(
    ["react", "vue", "solid", "svelte"].map(async (framework) => [
      `@ark-ui/${framework}`,
      JSON.parse(
        await readFile(
          `packages/${framework}/node_modules/@ark-ui/${framework}/package.json`,
          "utf8",
        ),
      ).version,
    ]),
  ),
);
const packed = Object.fromEntries(
  packs.map((entry) => [entry.name, `file:${entry.tarball}`]),
);
await writeFile(
  resolve(root, "package.json"),
  JSON.stringify(
    {
      name: "loongark-minimum-consumer",
      private: true,
      type: "module",
      dependencies: {
        ...packed,
        ...versions,
        vite: "7.3.7",
        "@sveltejs/vite-plugin-svelte": "6.2.1",
      },
      pnpm: { overrides: { ...packed, ...versions, ...ark } },
    },
    null,
    2,
  ),
);
for (const args of [
  ["install", "--lockfile-only", "--ignore-workspace"],
  ["install", "--frozen-lockfile", "--ignore-workspace"],
]) {
  const result = spawnSync(
    "pnpm",
    [...args, "--store-dir", resolve(".artifacts/releases/store")],
    { cwd: root, encoding: "utf8", timeout: 240000 },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
}
// 使用真实安装包解析每个子路径声明，不能依赖工作区 aliases。
const ts = (await import('typescript')).default;
const typeFixture = resolve(root, 'entries.ts');
const imports = packs.filter(entry => ['@loongark/react','@loongark/vue','@loongark/solid','@loongark/svelte'].includes(entry.name)).flatMap(entry => Object.keys(entry.exports).filter(key => key !== './package.json').map(key => entry.name + (key === '.' ? '' : key.slice(1))));
await writeFile(typeFixture, imports.map((id,index) => `import * as E${index} from ${JSON.stringify(id)}; void E${index};`).join('\n'));
const typeOptions = { noEmit:true, strict:true, skipLibCheck:true, module:ts.ModuleKind.ESNext, moduleResolution:ts.ModuleResolutionKind.Bundler, target:ts.ScriptTarget.ES2022, jsx:ts.JsxEmit.Preserve };
for (const id of imports) assert.ok(ts.resolveModuleName(id,typeFixture,typeOptions,ts.sys).resolvedModule?.resolvedFileName.endsWith('.d.ts'), `消费声明缺失：${id}`);
const types = ts.createProgram([typeFixture],typeOptions);
const diagnostics = ts.getPreEmitDiagnostics(types);
assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:file=>file,getCurrentDirectory:()=>root,getNewLine:()=> '\n'}));
// 在真实 tarball 消费项目审计，避免只依赖工作区 overrides 的安全结果。
const dependencyAudit = spawnSync("pnpm", ["audit", "--json"], {
  cwd: root,
  encoding: "utf8",
  timeout: 240000,
});
await mkdir(".artifacts/releases/minimum", { recursive: true });
await writeFile(
  ".artifacts/releases/minimum/dependencies.json",
  dependencyAudit.stdout,
);
assert.equal(
  dependencyAudit.status,
  0,
  dependencyAudit.stderr || dependencyAudit.stdout,
);
const dependencyMetadata = JSON.parse(dependencyAudit.stdout).metadata;
await writeFile(
  resolve(root, "index.html"),
  '<!doctype html><meta charset="utf-8"><div id="react"></div><div id="vue"></div><div id="solid"></div><div id="svelte"></div><script type="module" src="/main.js"></script>',
);
await writeFile(
  resolve(root, "App.svelte"),
  `<script>import {LoongArkButton} from '@loongark/svelte/button';import {LoongArkProvider} from '@loongark/svelte/provider';</script><LoongArkProvider><LoongArkButton onclick={()=>window.activations.svelte++}>Svelte minimum</LoongArkButton></LoongArkProvider>`,
);
await writeFile(
  resolve(root, "main.js"),
  `import React from 'react';import {createRoot} from 'react-dom/client';import {createApp,h} from 'vue';import {createComponent} from 'solid-js';import {render as renderSolid} from 'solid-js/web';import {mount} from 'svelte';import App from './App.svelte';import {LoongArkProvider as RProvider} from '@loongark/react/provider';import {LoongArkButton as RButton} from '@loongark/react/button';import {LoongArkProvider as VProvider} from '@loongark/vue/provider';import {LoongArkButton as VButton} from '@loongark/vue/button';import {LoongArkProvider as OProvider} from '@loongark/solid/provider';import {LoongArkButton as OButton} from '@loongark/solid/button';window.activations={react:0,vue:0,solid:0,svelte:0};createRoot(document.getElementById('react')).render(React.createElement(RProvider,{},React.createElement(RButton,{onClick:()=>window.activations.react++},'React minimum')));createApp({render:()=>h(VProvider,{},()=>h(VButton,{onClick:()=>window.activations.vue++},()=> 'Vue minimum'))}).mount('#vue');renderSolid(()=>createComponent(OProvider,{get children(){return createComponent(OButton,{onClick:()=>window.activations.solid++,children:'Solid minimum'});}}),document.getElementById('solid'));mount(App,{target:document.getElementById('svelte')});`,
);
await writeFile(
  resolve(root, "ssr.js"),
  `import React from 'react';import {renderToString as reactSSR} from 'react-dom/server';import {createSSRApp,h} from 'vue';import {renderToString as vueSSR} from 'vue/server-renderer';import {createComponent} from 'solid-js';import {renderToString as solidSSR} from 'solid-js/web';import {render as svelteSSR} from 'svelte/server';import {LoongArkProvider as RProvider} from '@loongark/react/provider';import {LoongArkButton as RButton} from '@loongark/react/button';import {LoongArkProvider as VProvider} from '@loongark/vue/provider';import {LoongArkButton as VButton} from '@loongark/vue/button';import {LoongArkProvider as OProvider} from '@loongark/solid/provider';import {LoongArkButton as OButton} from '@loongark/solid/button';import App from './App.svelte';export const output=[reactSSR(React.createElement(RProvider,{},React.createElement(RButton,{},'React minimum'))),await vueSSR(createSSRApp({render:()=>h(VProvider,{},()=>h(VButton,{},()=> 'Vue minimum'))})),solidSSR(()=>createComponent(OProvider,{get children(){return createComponent(OButton,{children:'Solid minimum'});}})),svelteSSR(App).body];`,
);
await writeFile(
  resolve(root, "build.mjs"),
  `import {build} from 'vite';import {svelte} from '@sveltejs/vite-plugin-svelte';const warning=(w,warn)=>{if(w.code!=='MODULE_LEVEL_DIRECTIVE')warn(w);};await build({configFile:false,logLevel:'error',plugins:[svelte()],resolve:{dedupe:['react','react-dom','vue','solid-js','svelte']},build:{outDir:'dist',rollupOptions:{onwarn:warning}}});await build({configFile:false,logLevel:'error',plugins:[svelte()],ssr:{noExternal:['@loongark/svelte','@ark-ui/svelte']},build:{ssr:'ssr.js',outDir:'ssr',rollupOptions:{output:{entryFileNames:'index.mjs'},onwarn:warning}}});const {output}=await import('./ssr/index.mjs');for(const [index,framework] of ['React','Vue','Solid','Svelte'].entries())if(!output[index].includes(framework+' minimum'))throw Error(framework+' minimum SSR failed');console.log(JSON.stringify({ssrBytes:output.map(html=>Buffer.byteLength(html))}));`,
);
const built = spawnSync(process.execPath, ["build.mjs"], {
  cwd: root,
  encoding: "utf8",
  timeout: 240000,
});
assert.equal(built.status, 0, built.stderr || built.stdout);
const measurements = JSON.parse(built.stdout.trim().split("\n").at(-1));
// 本地 dist 静态服务，真实消费已打包的四端入口。
const { createServer } = await import("node:http");
const { stat } = await import("node:fs/promises");
const server = createServer(async (request, response) => {
  try {
    const path = resolve(
      root,
      "dist",
      `.${new URL(request.url, "http://localhost").pathname}`,
    );
    if (!path.startsWith(resolve(root, "dist")))
      throw Error("Path outside dist");
    const file = (await stat(path)).isDirectory()
      ? resolve(path, "index.html")
      : path;
    response.setHeader(
      "Content-Type",
      file.endsWith(".js")
        ? "text/javascript"
        : file.endsWith(".css")
          ? "text/css"
          : "text/html",
    );
    response.end(await readFile(file));
  } catch {
    response.statusCode = 404;
    response.end();
  }
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  for (const framework of ["React", "Vue", "Solid", "Svelte"])
    await page.getByRole("button", { name: `${framework} minimum` }).click();
  for (const framework of ['React','Vue','Solid','Svelte']) {
    const height = await page.getByRole('button', {name:`${framework} minimum`}).evaluate(node => node.getBoundingClientRect().height);
    assert.ok(height >= 36, `${framework} 子路径 Provider 未自动应用共享控件样式：${height}`);
  }
  assert.deepEqual(await page.evaluate(() => window.activations), {
    react: 1,
    vue: 1,
    solid: 1,
    svelte: 1,
  });
  assert.deepEqual(errors, []);
  measurements.browser = browser.version();
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
await mkdir(".artifacts/releases/minimum", { recursive: true });
await writeFile(
  ".artifacts/releases/minimum/report.json",
  JSON.stringify(
    {
      versions,
      ark,
      dependencyAudit: dependencyMetadata,
      scope:
        "9个真实tarball；四端全部子路径声明解析、子路径 Provider/Button 原生消费构建、SSR与点击。最低版本未执行完整高级交互矩阵。",
      ...measurements,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "最低 peer 版本真实打包消费、四端 SSR 和浏览器点击通过。",
  versions,
);
