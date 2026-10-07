import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { render } from "svelte/server";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
function check(html, framework) {
  for (const kind of ["NumberInput", "PasswordInput"])
    for (const own of [false, true]) {
      const name = (own ? "own-" : "inherited-") + kind;
      const input = [...html.matchAll(/<input\b[^>]*>/g)]
        .map((m) => m[0])
        .find((tag) => tag.includes(`name="${name}"`));
      assert.ok(input, `${framework}: ${name}`);
      for (const attribute of ["disabled", "required", "readonly"])
        assert.equal(
          new RegExp(`\\s${attribute}(?:\\s|=|>)`, "i").test(input),
          !own,
          `${framework}: ${name} ${attribute}`,
        );
      assert.equal(
        /aria-invalid="true"/.test(input),
        !own,
        `${framework}: ${name} invalid`,
      );
    }
  console.log(`${framework}: 复合输入继承与显式覆盖 SSR 通过`);
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
    const fail=()=>{throw Error('SSR must not emit selection changes')};
    const body=()=>[false,true].flatMap(own=>['NumberInput','PasswordInput'].map(kind=>
      node(L.LoongArkFieldRoot,{disabled:true,required:true,invalid:true,readOnly:true},()=>[
        node(L['LoongArk'+kind+'Root'],{name:(own?'own-':'inherited-')+kind,...(own?{disabled:false,required:false,invalid:false,readOnly:false}:{}),...(kind==='NumberInput'?{defaultValue:'3',onValueChange:fail}:{onVisibilityChange:fail})},()=>[
          node(L['LoongArk'+kind+'Label'],{},()=>['Label']),
          node(L['LoongArk'+kind+'Control'],{},()=>[node(L['LoongArk'+kind+'Input'],{})])])])));
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
    ssr: "tests/consumers/svelte/CompoundFieldSsr.svelte",
    outDir: "tests/consumer-dist/compound-field-ssr",
    minify: false,
    rollupOptions: {
      external: (id) => id === "svelte" || id.startsWith("svelte/"),
      output: { entryFileNames: "index.mjs" },
    },
  },
});
const { default: component } = await import(
  pathToFileURL(resolve("tests/consumer-dist/compound-field-ssr/index.mjs"))
    .href
);
check(render(component).body, "svelte");
