import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { render } from "svelte/server";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
function check(html, framework) {
  for (const state of ["default", "readonly", "disabled"])
    for (const action of ["clear", "button", "text"])
      for (const own of ["inherit", "false", "true"]) {
        const label = state + "-" + action + "-" + own;
        const tag = [...html.matchAll(/<(?:button|span)\b[^>]*>/g)]
          .map((m) => m[0])
          .find((tag) => tag.includes('aria-label="' + label + '"'));
        assert.ok(tag, framework + ": " + label);
        const interactive = action !== "text";
        assert.equal(
          tag.startsWith("<button"),
          interactive,
          framework + ": native button " + label,
        );
        const blocked =
          interactive &&
          (own === "true" ||
            (own === "inherit" &&
              (state === "disabled" ||
                (state === "readonly" && action === "clear"))));
        assert.equal(
          /\sdisabled(?:\s|=|>)/.test(tag),
          blocked,
          framework + ": disabled " + label,
        );
      }
  console.log(
    framework +
      ": 后缀原生按钮/文本、只读非编辑操作及显式 disabled 覆盖 SSR 通过",
  );
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
      ? `const node=(type,props,children=()=>[])=>h(type,props,...children());`
      : framework === "vue"
        ? `const node=(type,props,children=()=>[])=>h(type,props,children);`
        : `const node=(type,props,children=()=>[])=>createComponent(type,{...props,get children(){return children()}});`;
  const source =
    header +
    `import * as L from './packages/${framework}/dist/${framework === "solid" ? "server/" : ""}index.js';` +
    factory +
    `
    const fail=()=>{throw Error('SSR must not emit input actions')};
    const body=()=>['default','readonly','disabled'].flatMap(state=>['clear','button','text'].flatMap(action=>['inherit','false','true'].map(own=>
      node(L.LoongArkInputRoot,{disabled:state==='disabled',readOnly:state==='readonly'},()=>[
        node(L.LoongArkInputLabel,{},()=>['Search']),
        node(L.LoongArkInputGroup,{},()=>[
          node(L.LoongArkInputControl,{name:state+'-'+action+'-'+own}),
          node(L.LoongArkInputSuffix,{action,onClick:fail,'aria-label':state+'-'+action+'-'+own,...(own==='inherit'?{}:{disabled:own==='true'})},()=>['Suffix'])])]))));
    ${framework === "vue" ? `console.log(await renderToString(createSSRApp({render:()=>h('div',body())})));` : framework === "solid" ? `console.log(renderToString(()=>body()));` : `console.log(renderToString(h('div',null,...body())));`}process.exit(0);`;
  const result = spawnSync(
    process.execPath,
    [
      ...(framework === "solid" ? ["--conditions=solid"] : []),
      "--input-type=module",
      "-e",
      source,
    ],
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
  resolve: { alias, dedupe: ["svelte"] },
  ssr: { noExternal: ["@loongark/svelte", "@ark-ui/svelte"] },
  logLevel: "error",
  build: {
    ssr: "tests/consumers/svelte/InputAdornmentSsr.svelte",
    outDir: "tests/consumer-dist/input-adornment-ssr",
    minify: false,
    rollupOptions: {
      external: (id) => id === "svelte" || id.startsWith("svelte/"),
      output: { entryFileNames: "index.mjs" },
    },
  },
});
const { default: component } = await import(
  pathToFileURL(resolve("tests/consumer-dist/input-adornment-ssr/index.mjs"))
    .href
);
check(render(component).body, "svelte");
