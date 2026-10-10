import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { render } from "svelte/server";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

function check(html, framework) {
  for (const name of ["default", "custom"]) {
    const tag = [...html.matchAll(/<div\b[^>]*>/g)]
      .map((m) => m[0])
      .find((tag) => tag.includes(`data-case="${name}"`));
    assert.ok(tag, `${framework}: SSR 浮层存在`);
    assert.match(
      tag,
      /position:\s*fixed/,
      `${framework}: 用户 positioning 保留`,
    );
    assert.match(tag, /z-index:\s*1234/, `${framework}: 用户 style 保留`);
    if (name === "custom") {
      assert.match(tag, /transform:\s*translate\(17px,\s*23px\)/);
      assert.doesNotMatch(
        tag,
        /(?:left|top):\s*var\(--[xy]/,
        `${framework}: 自定义变换不再叠加默认坐标`,
      );
    } else {
      assert.match(tag, /left:\s*var\(--x/);
      assert.match(tag, /top:\s*var\(--y/);
    }
  }
  console.log(`${framework}: DatePicker SSR 定位策略与自定义样式优先级通过`);
}

for (const framework of ["react", "vue", "solid"]) {
  const header =
    framework === "react"
      ? `import {createElement as h} from 'react';import {renderToString} from 'react-dom/server';`
      : framework === "vue"
        ? `import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';`
        : `import {createComponent} from 'solid-js';import {renderToString} from 'solid-js/web';`;
  const factory =
    framework === "react"
      ? `const node=(type,props,child)=>h(type,props,child?.());`
      : framework === "vue"
        ? `const node=(type,props,child)=>h(type,props,child);`
        : `const node=(type,props,child)=>createComponent(type,{...props,get children(){return child?.()}});`;
  const source =
    header +
    `import * as L from './packages/${framework}/dist/${framework === "solid" ? "server/" : ""}index.js';` +
    factory +
    `
    const fail=()=>{throw Error('SSR must not emit open changes')};
    const body=()=>['default','custom'].map(name=>node(L.LoongArkDatePickerRoot,{defaultOpen:true,positioning:{strategy:'fixed'},onOpenChange:fail},()=>node(L.LoongArkDatePickerPositioner,{'data-case':name,style:${framework === "solid" ? "name==='custom'?'transform:translate(17px, 23px);z-index:1234':{'z-index':1234}" : "{zIndex:1234,...(name==='custom'?{transform:'translate(17px, 23px)'}:{})}"}})));
    ${framework === "vue" ? "console.log(await renderToString(createSSRApp({render:()=>h('div',body())})));" : framework === "solid" ? "console.log(renderToString(()=>body()));" : "console.log(renderToString(h('div',null,...body())));"}
    process.exit(0);`;
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", source],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, `${framework}: ${result.stderr}`);
  check(result.stdout, framework);
}

const alias = Object.fromEntries(
  ["tokens", "theme", "primitives", "kit", "svelte"].map((n) => [
    "@loongark/" + n,
    resolve(`packages/${n}/dist/index.js`),
  ]),
);
await build({
  configFile: false,
  plugins: [svelte()],
  resolve: {
    alias: {
      "@loongark/kit/bootstrap": resolve("packages/kit/dist/bootstrap.js"),
      ...alias,
    },
    dedupe: ["svelte"],
  },
  ssr: { noExternal: ["@loongark/svelte", "@ark-ui/svelte"] },
  logLevel: "error",
  build: {
    ssr: "tests/consumers/svelte/PickerPositionerSsr.svelte",
    outDir: "tests/consumer-dist/picker-positioner-ssr",
    rollupOptions: {
      external: (id) => id === "svelte" || id.startsWith("svelte/"),
      output: { entryFileNames: "index.mjs" },
    },
  },
});
const { default: component } = await import(
  pathToFileURL(resolve("tests/consumer-dist/picker-positioner-ssr/index.mjs"))
    .href
);
check(render(component).body, "svelte");
