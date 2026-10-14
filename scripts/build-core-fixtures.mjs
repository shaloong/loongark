import { publishedWorkspacePlugin } from "./published-workspace-plugin.mjs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import solid from "vite-plugin-solid";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const styles = `import {createPrimitiveStyleBootstrap} from '@shaloong/loongark-primitives/styles';
import {buttonPrimitive} from '@shaloong/loongark-primitives/button';
import {dialogPrimitive} from '@shaloong/loongark-primitives/dialog';
import {inputPrimitive} from '@shaloong/loongark-primitives/input';
const buttonStyles=createPrimitiveStyleBootstrap([buttonPrimitive]);
const initialStyles=createPrimitiveStyleBootstrap([buttonPrimitive,dialogPrimitive]);
const extraStyles=createPrimitiveStyleBootstrap([inputPrimitive,dialogPrimitive,buttonPrimitive]);
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少 Core 挂载节点');`;
const names = [
  "Root",
  "Trigger",
  "Portal",
  "Overlay",
  "Positioner",
  "Content",
  "Title",
  "Description",
  "CloseTrigger",
];
const body = `<Button onClick={()=>setMode(mode==='light'?'dark':mode==='dark'?'high-contrast':'light')}>Theme</Button>
<Button onClick={()=>setExtra(!extra)}>Change styles</Button><Button>Core button</Button>
<InputRoot><InputLabel>Email</InputLabel><InputControl data-testid="core-input" /></InputRoot>
<DialogRoot><DialogTrigger>Open dialog</DialogTrigger><DialogPortal><DialogOverlay/><DialogPositioner><DialogContent><DialogTitle>Core dialog</DialogTitle><DialogDescription>Shared theme and selected styles.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot>`;
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const root = resolve(`tests/consumers/${framework}/core`);
  await mkdir(root, { recursive: true });
  await writeFile(
    resolve(root, "index.html"),
    '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Core provider</title><style>body{margin:0}</style></head><body><main id="app"></main><script type="module" src="/main.' +
      (framework === "svelte" || framework === "vue" ? "ts" : "tsx") +
      '"></script></body></html>',
  );
  const imports = `import {LoongArkProviderCore as Provider} from '@shaloong/loongark-${framework}/provider-core';
import {LoongArkButton as Button} from '@shaloong/loongark-${framework}/button';
import {${names.map((n) => "LoongArkDialog" + n + " as Dialog" + n).join(",")}} from '@shaloong/loongark-${framework}/dialog';
import {LoongArkInputRoot as InputRoot,LoongArkInputControl as InputControl,LoongArkInputLabel as InputLabel} from '@shaloong/loongark-${framework}/input';`;
  let source;
  if (framework === "react")
    source = `${imports}${styles}import {useState} from 'react';import {createRoot} from 'react-dom/client';function App(){const [mode,setMode]=useState<'light'|'dark'|'high-contrast'>('light');const [extra,setExtra]=useState(false);const [shown,setShown]=useState(true);const [second,setSecond]=useState(false);return <><button onClick={()=>setShown(!shown)}>Toggle provider</button><button onClick={()=>setSecond(!second)}>Toggle survivor</button>{second&&<Provider nonce={nonce} mode="dark" styleBootstrap={buttonStyles}><Button>Survivor</Button></Provider>}{shown&&<Provider mode={mode} nonce={nonce} styleBootstrap={extra?extraStyles:initialStyles}><section style={{padding:24,background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}>${body}</section></Provider>}</>;}createRoot(target).render(<App/>);`;
  if (framework === "solid")
    source = `${imports}${styles}import {createSignal,Show} from 'solid-js';import {render} from 'solid-js/web';function App(){const [mode,setMode]=createSignal<'light'|'dark'|'high-contrast'>('light');const [extra,setExtra]=createSignal(false);const [shown,setShown]=createSignal(true);const [second,setSecond]=createSignal(false);return <><button onClick={()=>setShown(!shown())}>Toggle provider</button><button onClick={()=>setSecond(!second())}>Toggle survivor</button><Show when={second()}><Provider nonce={nonce} mode="dark" styleBootstrap={buttonStyles}><Button>Survivor</Button></Provider></Show><Show when={shown()}><Provider mode={mode()} nonce={nonce} styleBootstrap={extra()?extraStyles:initialStyles}><section style={{padding:'24px',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}>${body.replaceAll("mode===", "mode()===").replaceAll("!extra", "!extra()")}</section></Provider></Show></>;}render(()=><App/>,target);`;
  if (framework === "vue")
    source = `${imports}${styles}import {createApp,defineComponent,h,ref} from 'vue';const App=defineComponent({setup(){const mode=ref<'light'|'dark'|'high-contrast'>('light'),extra=ref(false),shown=ref(true),second=ref(false);return()=>h('div',{},[h('button',{onClick:()=>shown.value=!shown.value},'Toggle provider'),h('button',{onClick:()=>second.value=!second.value},'Toggle survivor'),second.value&&h(Provider,{nonce,mode:'dark',styleBootstrap:buttonStyles},{default:()=>h(Button,{},()=> 'Survivor')}),shown.value&&h(Provider,{mode:mode.value,nonce,styleBootstrap:extra.value?extraStyles:initialStyles},{default:()=>h('section',{style:{padding:'24px',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}},[
h(Button,{onClick:()=>mode.value=mode.value==='light'?'dark':mode.value==='dark'?'high-contrast':'light'},()=> 'Theme'),h(Button,{onClick:()=>extra.value=!extra.value},()=> 'Change styles'),h(Button,{},()=> 'Core button'),h(InputRoot,{},()=>[h(InputLabel,{},()=> 'Email'),h(InputControl,{'data-testid':'core-input'})]),h(DialogRoot,{},()=>[h(DialogTrigger,{},()=> 'Open dialog'),h(DialogPortal,{},()=>[h(DialogOverlay),h(DialogPositioner,{},()=>h(DialogContent,{},()=>[h(DialogTitle,{},()=> 'Core dialog'),h(DialogDescription,{},()=> 'Shared theme and selected styles.'),h(DialogCloseTrigger,{},()=> 'Close')]))])])])})]);}});createApp(App).mount('#app');`;
  if (framework === "svelte") {
    await writeFile(
      resolve(root, "App.svelte"),
      `<script lang="ts">${imports}${styles}let mode:'light'|'dark'|'high-contrast'=$state('light');let extra=$state(false);let shown=$state(true);let second=$state(false);</script><button onclick={()=>shown=!shown}>Toggle provider</button><button onclick={()=>second=!second}>Toggle survivor</button>{#if second}<Provider {nonce} mode="dark" styleBootstrap={buttonStyles}><Button>Survivor</Button></Provider>{/if}{#if shown}<Provider {mode} {nonce} styleBootstrap={extra?extraStyles:initialStyles}><section style="padding:24px;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)">${body.replaceAll("onClick", "onclick").replaceAll("setMode(mode==='light'?'dark':mode==='dark'?'high-contrast':'light')", "mode=mode==='light'?'dark':mode==='dark'?'high-contrast':'light'").replaceAll("setExtra(!extra)", "extra=!extra")}</section></Provider>{/if}`,
    );
    source = `import {mount} from 'svelte';import App from './App.svelte';const target=document.getElementById('app');if(!target)throw Error('缺少 Core 挂载节点');mount(App,{target});`;
  }
  await writeFile(
    resolve(
      root,
      framework === "svelte" || framework === "vue" ? "main.ts" : "main.tsx",
    ),
    source,
  );
  await build({
    configFile: false,
    root,
    base: `/core-${framework}/`,
    logLevel: "error",
    plugins: [await publishedWorkspacePlugin(),
      ...(framework === "react"
        ? [react()]
        : framework === "solid"
          ? [solid()]
          : framework === "svelte"
            ? [svelte()]
            : []),
      {
        name: "public-core-entries",
        async resolveId(id) {
          const m =
            /^@shaloong\/loongark-(react|vue|solid|svelte|kit|primitives|theme|tokens)(\/.+)?$/.exec(
              id,
            );
          if (!m) return null;
          const pkg = JSON.parse(
            await readFile(`packages/${m[1]}/package.json`, "utf8"),
          );
          const entry = pkg.exports[m[2] ? "." + m[2] : "."];
          if (!entry) throw Error("未公开入口：" + id);
          return resolve(`packages/${m[1]}`, entry.browser ?? entry.import);
        },
      },
    ],
    resolve: { dedupe: ["react", "react-dom", "solid-js", "svelte", "vue"] },
    build: {
      outDir: resolve(`tests/consumer-dist/core-${framework}`),
      emptyOutDir: true,
      rollupOptions: {
        onwarn(w, fn) {
          if (w.code !== "MODULE_LEVEL_DIRECTIVE") fn(w);
        },
      },
    },
  });
  console.log(`${framework} Core 真实公开入口消费构建通过`);
}
