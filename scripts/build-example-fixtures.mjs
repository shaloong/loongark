import { mkdir, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import solid from "vite-plugin-solid";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const index = {};
const alias = Object.fromEntries(
  [
    "react",
    "vue",
    "solid",
    "svelte",
    "theme",
    "primitives",
    "kit",
    "tokens",
  ].map((name) => [
    "@loongark/" + name,
    resolve("packages", name, "dist/index.js"),
  ]),
);
const surface =
  'style="padding:24px;min-height:100dvh;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)"';
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const files = (await readdir(`examples/${framework}`))
    .filter((file) => /Example\.(ts|tsx|svelte)$/.test(file))
    .sort();
  const names = files.map((file) => file.split(".")[0]);
  index[framework] = names;
  const folder = resolve("tests/consumers/examples-" + framework);
  await mkdir(folder, { recursive: true });
  const imports = files
    .map((file, i) =>
      framework === "svelte"
        ? `import E${i} from '../../../examples/${framework}/${file}';`
        : `import {${names[i]} as E${i}} from '../../../examples/${framework}/${file}';`,
    )
    .join("\n");
  const resolvedImports = imports;
  const dictionary =
    "{" + names.map((name, i) => `'${name}':E${i}`).join(",") + "}";
  const choose = `const examples=${dictionary}; const name=new URLSearchParams(location.search).get('example') || '${names[0]}'; const Selected=examples[name];`;
  let main;
  if (framework === "react")
    main = `import React from 'react'; import {createRoot} from 'react-dom/client'; import {LoongArkProvider as Provider} from '@loongark/react'; ${resolvedImports} ${choose} createRoot(document.getElementById('app')).render(<Provider><section style={{padding:24,minHeight:'100dvh',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}><h1 data-example-name>{name}</h1><div data-example-content><Selected/></div></section></Provider>);`;
  if (framework === "vue")
    main = `import {createApp,h} from 'vue'; import {LoongArkProvider as Provider} from '@loongark/vue'; ${resolvedImports} ${choose} createApp({render:()=>h(Provider,{},()=>h('section',{style:'padding:24px;min-height:100dvh'},[h('h1',{'data-example-name':''},name),h('div',{'data-example-content':''},[h(Selected)])]))}).mount('#app');`;
  if (framework === "solid")
    main = `import {render} from 'solid-js/web'; import {LoongArkProvider as Provider} from '@loongark/solid'; ${resolvedImports} ${choose} render(()=><Provider><section ${surface}><h1 data-example-name>{name}</h1><div data-example-content><Selected/></div></section></Provider>,document.getElementById('app'));`;
  if (framework === "svelte") {
    await writeFile(
      resolve(folder, "App.svelte"),
      `<script>import {LoongArkProvider as Provider} from '@loongark/svelte'; ${resolvedImports} ${choose}</script><Provider><section ${surface}><h1 data-example-name>{name}</h1><div data-example-content><Selected/></div></section></Provider>`,
    );
    main =
      "import {mount} from 'svelte'; import App from './App.svelte'; mount(App,{target:document.getElementById('app')});";
  }
  const extension = ["react", "solid"].includes(framework) ? "tsx" : "ts";
  await writeFile(resolve(folder, "main." + extension), main);
  await writeFile(
    resolve(folder, "index.html"),
    `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Example regression</title><style>body{margin:0}h1{overflow-wrap:anywhere}</style></head><body><main id="app"></main><script type="module" src="/main.${extension}"></script></body></html>`,
  );
  await build({
    configFile: false,
    root: folder,
    base: `/examples-${framework}/`,
    resolve: {
      alias,
      dedupe: ["react", "react-dom", "vue", "solid-js", "svelte"],
    },
    plugins:
      framework === "react"
        ? [react()]
        : framework === "solid"
          ? [solid()]
          : framework === "svelte"
            ? [svelte()]
            : [],
    logLevel: "error",
    build: {
      minify: false,
      sourcemap: true,
      outDir: resolve("tests/consumer-dist/examples-" + framework),
      emptyOutDir: true,
      rollupOptions: {
        onwarn(w, fn) {
          if (w.code !== "MODULE_LEVEL_DIRECTIVE") fn(w);
        },
      },
    },
  });
  console.log(`${framework}: ${names.length} 个现有组件示例构建通过`);
}
await writeFile(
  "tests/consumer-dist/examples-index.json",
  JSON.stringify(index, null, 2),
);
