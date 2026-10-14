import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { render } from "svelte/server";

const styles = `import {createPrimitiveStyleBootstrap} from './packages/primitives/dist/styles.js';import {buttonPrimitive} from './packages/primitives/dist/button.js';const styleBootstrap=createPrimitiveStyleBootstrap([buttonPrimitive]);`;
for (const framework of ["react", "vue", "solid"]) {
  const imports = `import {LoongArkProviderCore as Provider} from './packages/${framework}/dist/${framework === "solid" ? "server/" : ""}entries/provider-core.js';import {LoongArkButton as Button} from './packages/${framework}/dist/${framework === "solid" ? "server/" : ""}entries/button.js';`;
  const source =
    styles +
    imports +
    (framework === "react"
      ? `import {createElement as h} from 'react';import {renderToString} from 'react-dom/server';console.log(renderToString(h(Provider,{styleBootstrap,targetId:'core-ssr',mode:'dark'},h(Button,null,'Core SSR'))));`
      : framework === "vue"
        ? `import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';console.log(await renderToString(createSSRApp({render:()=>h(Provider,{styleBootstrap,targetId:'core-ssr',mode:'dark'},()=>h(Button,{},()=> 'Core SSR'))})));`
        : `import {createComponent as h} from 'solid-js';import {renderToString} from 'solid-js/web';console.log(renderToString(()=>h(Provider,{styleBootstrap,targetId:'core-ssr',mode:'dark',get children(){return h(Button,{children:'Core SSR'});}})));`);
  const result = spawnSync(
    process.execPath,
    ["--conditions=node", "--input-type=module", "-e", source],
    { encoding: "utf8", timeout: 30000 },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Core SSR/);
  assert.match(result.stdout, /data-lk-theme="core-ssr"/);
  assert.match(result.stdout, /data-scope="button"/);
  console.log(`${framework} Core 实际 node 产物 SSR 通过`);
}
const folder = resolve(".artifacts/core-provider/ssr");
await mkdir(folder, { recursive: true });
await writeFile(
  resolve(folder, "App.svelte"),
  `<script>import {LoongArkProviderCore as Provider} from '@shaloong/loongark-svelte/provider-core';import {LoongArkButton as Button} from '@shaloong/loongark-svelte/button';import {createPrimitiveStyleBootstrap} from '@shaloong/loongark-primitives/styles';import {buttonPrimitive} from '@shaloong/loongark-primitives/button';const styleBootstrap=createPrimitiveStyleBootstrap([buttonPrimitive]);</script><Provider {styleBootstrap} targetId="core-ssr" mode="dark"><Button>Core SSR</Button></Provider>`,
);
await build({
  configFile: false,
  logLevel: "error",
  plugins: [
    svelte(),
    {
      name: "core-ssr-entries",
      async resolveId(id) {
        const m = /^@shaloong\/loongark-(svelte|primitives|theme|tokens)(\/.+)?$/.exec(
          id,
        );
        if (!m) return null;
        const pkg = JSON.parse(
          await readFile(`packages/${m[1]}/package.json`, "utf8"),
        );
        const entry = pkg.exports[m[2] ? "." + m[2] : "."];
        return resolve(`packages/${m[1]}`, entry.import);
      },
    },
  ],
  resolve: { dedupe: ["svelte"] },
  ssr: { noExternal: ["@ark-ui/svelte"] },
  build: {
    ssr: resolve(folder, "App.svelte"),
    outDir: resolve(folder, "dist"),
    rollupOptions: {
      external: (id) => id === "svelte" || id.startsWith("svelte/"),
      output: { entryFileNames: "index.mjs" },
    },
  },
});
const component = (
  await import(pathToFileURL(resolve(folder, "dist/index.mjs")).href)
).default;
const html = render(component).body;
assert.match(html, /Core SSR/);
assert.match(html, /data-lk-theme="core-ssr"/);
assert.match(html, /data-scope="button"/);
console.log("svelte Core 实际发布源码 SSR 通过");
