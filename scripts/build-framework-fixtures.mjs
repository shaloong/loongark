import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import solid from "vite-plugin-solid";
import { svelte } from "@sveltejs/vite-plugin-svelte";
const root = resolve("tests/consumers");
await mkdir(root, { recursive: true });
await mkdir(resolve("tests/consumer-dist"), { recursive: true });
await writeFile(
  resolve("tests/consumer-dist/index.html"),
  "<!doctype html><title>Consumers</title>",
);
const names = [
  "Provider",
  "Button",
  "InputRoot",
  "InputLabel",
  "InputControl",
  "InputErrorText",
  "DialogRoot",
  "DialogTrigger",
  "DialogPortal",
  "DialogOverlay",
  "DialogPositioner",
  "DialogContent",
  "DialogTitle",
  "DialogDescription",
  "DialogCloseTrigger",
];
names.push(
  "SwitchRoot",
  "SwitchControl",
  "SwitchThumb",
  "SwitchLabel",
  "SwitchHiddenInput",
  "SelectRoot",
  "SelectLabel",
  "SelectControl",
  "SelectTrigger",
  "SelectValueText",
  "SelectPositioner",
  "SelectContent",
  "SelectItem",
  "SelectItemText",
  "SelectHiddenSelect",
  "Portal",
  "DataTable",
  "Chart",
  "SheetRoot",
  "SheetTrigger",
  "SheetPortal",
  "SheetOverlay",
  "SheetPositioner",
  "SheetContent",
  "SheetTitle",
  "SheetDescription",
  "SheetAction",
);
const imports =
  names.map((n) => `LoongArk${n} as ${n}`).join(", ") +
  ", createListCollection";
const body = `<InputRoot state="invalid"><InputLabel>Email</InputLabel><InputControl data-testid="email" value={email} onInput={(e) => setEmail(e.currentTarget.value)} /><InputErrorText>Enter a valid email</InputErrorText></InputRoot>
<Button data-testid="busy-cancel" aria-busy="true">Cancel background work</Button>
<Button data-testid="busy-false" aria-busy="false">Ready action</Button>
<Button data-testid="busy-loading" loading aria-busy="false">Working</Button>
<Button data-testid="submit" disabled={!email}>Continue</Button>
<Button data-testid="mode" onClick={() => setMode(mode === "light" ? "dark" : "light")}>Theme</Button>
<DialogRoot><DialogTrigger>Open dialog</DialogTrigger><DialogPortal><DialogOverlay /><DialogPositioner><DialogContent><DialogTitle>Review details</DialogTitle><DialogDescription>Theme follows this dialog.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot>
<form><SwitchRoot name="notifications"><SwitchControl><SwitchThumb/></SwitchControl><SwitchLabel>Notifications</SwitchLabel><SwitchHiddenInput/></SwitchRoot></form>
<SelectRoot collection={collection}><SelectLabel>Plan</SelectLabel><SelectControl><SelectTrigger data-testid="select"><SelectValueText placeholder="Choose a plan"/></SelectTrigger></SelectControl><Portal><SelectPositioner><SelectContent>{plans.map(item=><SelectItem item={item}><SelectItemText>{item.label}</SelectItemText></SelectItem>)}</SelectContent></SelectPositioner></Portal><SelectHiddenSelect/></SelectRoot>
<DataTable data={rows} columns={columns} pageSize={2}/><Chart data={rows} series={[{key:'amount'}]} labelKey="name" title="Revenue"/>
<SheetRoot><SheetTrigger>Open sheet</SheetTrigger><SheetPortal><SheetOverlay/><SheetPositioner><SheetContent><SheetTitle>Edit profile</SheetTitle><SheetDescription>Update your settings.</SheetDescription><SheetAction>Save changes</SheetAction></SheetContent></SheetPositioner></SheetPortal></SheetRoot>`;
const dataCode = `const plans=[{label:'Free',value:'free'},{label:'Pro',value:'pro'}];const collection=createListCollection({items:plans});const rows=[{id:'a',name:'Alpha',amount:20},{id:'b',name:'Beta',amount:10},{id:'c',name:'Gamma',amount:35}];const columns=[{key:'name',label:'Name'},{key:'amount',label:'Revenue'}];`;
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const folder = resolve(root, framework);
  await mkdir(folder, { recursive: true });
  await writeFile(
    resolve(folder, "index.html"),
    '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>LoongArk consumer</title><style>body{margin:0}</style></head><body><main id="app"></main><script type="module" src="/main.' +
      (framework === "vue" || framework === "svelte" ? "ts" : "tsx") +
      '"></script></body></html>',
  );
  let source;
  if (framework === "react")
    source = `import React, { useState } from 'react'; import { createRoot } from 'react-dom/client'; import { ${imports} } from '@loongark/react'; function App() { const [email,setEmail]=useState(''); const [mode,setMode]=useState<'light'|'dark'>('light'); return <Provider mode={mode}><section style={{padding:24,display:'grid',gap:16,minHeight:'100dvh',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}>${body}</section></Provider>; } createRoot(document.getElementById('app')!).render(<App/>);`;
  if (framework === "solid")
    source = `import { createSignal } from 'solid-js'; import { render } from 'solid-js/web'; import { ${imports} } from '@loongark/solid'; function App() { const [email,setEmail]=createSignal(''); const [mode,setMode]=createSignal<'light'|'dark'>('light'); return <Provider mode={mode()}><section style={{padding:'24px',display:'grid',gap:'16px','min-height':'100dvh',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}>${body.replaceAll("value={email}", "value={email()}").replaceAll("disabled={!email}", "disabled={!email()}").replaceAll("mode ===", "mode() ===")}</section></Provider>; } render(()=><App/>,document.getElementById('app')!);`;
  if (framework === "vue")
    source = `import { createApp, defineComponent, h, ref } from 'vue'; import { ${imports} } from '@loongark/vue'; const App=defineComponent({setup(){const email=ref(''), mode=ref<'light'|'dark'>('light'); return ()=>h(Provider,{mode:mode.value},{default:()=>h('section',{style:{padding:'24px',display:'grid',gap:'16px','min-height':'100dvh',background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}},[
h(InputRoot,{state:'invalid'},{default:()=>[h(InputLabel,{},()=> 'Email'),h(InputControl,{'data-testid':'email',modelValue:email.value,'onUpdate:modelValue':(v:string)=>email.value=v}),h(InputErrorText,{},()=> 'Enter a valid email')]}),
h(Button,{'data-testid':'busy-cancel','aria-busy':'true'},()=> 'Cancel background work'),
h(Button,{'data-testid':'busy-false','aria-busy':'false'},()=> 'Ready action'),
h(Button,{'data-testid':'busy-loading',loading:true,'aria-busy':'false'},()=> 'Working'),
h(Button,{'data-testid':'submit',disabled:!email.value},()=> 'Continue'),h(Button,{'data-testid':'mode',onClick:()=>mode.value=mode.value==='light'?'dark':'light'},()=> 'Theme'),
h(DialogRoot,{},()=>[h(DialogTrigger,{},()=> 'Open dialog'),h(DialogPortal,{},()=>[h(DialogOverlay),h(DialogPositioner,{},()=>h(DialogContent,{},()=>[h(DialogTitle,{},()=> 'Review details'),h(DialogDescription,{},()=> 'Theme follows this dialog.'),h(DialogCloseTrigger,{},()=> 'Close')]))])])])});}}); createApp(App).mount('#app');`;
  if (framework === "svelte") {
    await writeFile(
      resolve(folder, "App.svelte"),
      `<script lang="ts">import { ${imports}, LoongArkQuestionnaire as Questionnaire, type QuestionnaireValue } from '@loongark/svelte'; let email=''; let mode:'light'|'dark'='light';let freshNote:QuestionnaireValue|undefined;</script><Provider {mode}><section style="padding:24px;display:grid;gap:16px;min-height:100dvh;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)">${body.replace("value={email} onInput={(e) => setEmail(e.currentTarget.value)}", "bind:value={email}").replace('onClick={() => setMode(mode === "light" ? "dark" : "light")}', 'onclick={() => mode = mode === "light" ? "dark" : "light"}')}<Questionnaire label="Fresh feedback" questions={[{id:'note',label:'Fresh note',type:'text'}]} bind:value={freshNote}/><output aria-label="Bound fresh note">{freshNote?.note ?? ''}</output></section></Provider>`,
    );
    source = `import { mount } from 'svelte'; import App from './App.svelte'; mount(App,{target:document.getElementById('app')!});`;
  }
  if (framework === "react" || framework === "solid")
    source = source.replace("function App()", dataCode + "function App()");
  if (framework === "vue")
    source = source.replace("const App=", dataCode + "const App=").replace(
      "h(DialogRoot,{},()=>[",
      `h('form',{},[h(SwitchRoot,{name:'notifications'},()=>[h(SwitchControl,{},()=>h(SwitchThumb)),h(SwitchLabel,{},()=> 'Notifications'),h(SwitchHiddenInput)])]),
    h(SelectRoot,{collection},()=>[h(SelectLabel,{},()=> 'Plan'),h(SelectControl,{},()=>h(SelectTrigger,{'data-testid':'select'},()=>h(SelectValueText,{placeholder:'Choose a plan'}))),h(Portal,{},()=>h(SelectPositioner,{},()=>h(SelectContent,{},()=>plans.map(item=>h(SelectItem,{item},()=>h(SelectItemText,{},()=>item.label)))))),h(SelectHiddenSelect)]),
    h(DataTable,{data:rows,columns,pageSize:2}),h(Chart,{data:rows,series:[{key:'amount'}],labelKey:'name',title:'Revenue'}),
    h(SheetRoot,{},()=>[h(SheetTrigger,{},()=> 'Open sheet'),h(SheetPortal,{},()=>[h(SheetOverlay),h(SheetPositioner,{},()=>h(SheetContent,{},()=>[h(SheetTitle,{},()=> 'Edit profile'),h(SheetDescription,{},()=> 'Update your settings.'),h(SheetAction,{},()=> 'Save changes')]))])]),h(DialogRoot,{},()=>[`,
    );
  if (framework === "svelte") {
    let app = await (
      await import("node:fs/promises")
    ).readFile(resolve(folder, "App.svelte"), "utf8");
    app = app
      .replace("let email='';", dataCode + "let email='';")
      .replace(
        "{plans.map(item=><SelectItem item={item}><SelectItemText>{item.label}</SelectItemText></SelectItem>)}",
        "{#each plans as item}<SelectItem {item}><SelectItemText>{item.label}</SelectItemText></SelectItem>{/each}",
      );
    await writeFile(resolve(folder, "App.svelte"), app);
  }
  source = "import '../runtime';\n" + source;
  await writeFile(
    resolve(
      folder,
      "main." + (framework === "vue" || framework === "svelte" ? "ts" : "tsx"),
    ),
    source,
  );
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
    ].map((p) => ["@loongark/" + p, resolve("packages", p, "dist/index.js")]),
  );
  await build({
    configFile: false,
    root: folder,
    base: `/${framework}/`,
    resolve: {
      alias,
      dedupe: ["react", "react-dom", "solid-js", "svelte", "vue"],
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
      outDir: resolve("tests/consumer-dist", framework),
      emptyOutDir: true,
      rollupOptions: {
        onwarn(w, fn) {
          if (w.code !== "MODULE_LEVEL_DIRECTIVE") fn(w);
        },
      },
    },
  });
  console.log(`${framework} 发布消费构建通过`);
}

// 单独消费共享发布模块，验证四端调用之外的导出选项与 DOM 根节点契约。
await copyFile(resolve("packages/kit/dist/cropper-export.js"), resolve("tests/consumer-dist/cropper-export.js"));

// 独立消费真实 Kit 发布模块，在浏览器中验证第三方有内部状态的自定义控件契约。
await build({
  configFile: false,
  logLevel: "error",
  build: {
    outDir: resolve("tests/consumer-dist"),
    emptyOutDir: false,
    lib: {
      entry: resolve("packages/kit/dist/questionnaire-custom.js"),
      formats: ["es"],
      fileName: () => "questionnaire-custom.js",
    },
  },
});
console.log("自定义题型共享发布模块浏览器消费构建通过");

// 直接消费共享题组焦点桥，覆盖延迟注册、受控拒绝与卸载。
await build({
  configFile: false,
  logLevel: "error",
  build: {
    outDir: resolve("tests/consumer-dist"),
    emptyOutDir: false,
    lib: {
      entry: resolve("packages/kit/dist/questionnaire-groups.js"),
      formats: ["es"],
      fileName: () => "questionnaire-groups.js",
    },
  },
});

// 单独消费共享横向窗口发布契约，验证初始定位与原生滚动事件的先后关系。
await build({
 configFile: false, logLevel: "error",
 resolve: { alias: { "@loongark/kit": resolve("packages/kit/dist/index.js") } },
 build: { outDir: resolve("tests/consumer-dist"), emptyOutDir: false, lib: { entry: resolve("tests/consumers/column-window.mjs"), formats: ["es"], fileName: () => "column-window.js" } },
});
console.log("横向列窗口共享发布模块浏览器消费构建通过");

await build({
  configFile: false,
  logLevel: "error",
  resolve: {
    alias: { "@loongark/kit": resolve("packages/kit/dist/index.js") },
  },
  build: {
    outDir: resolve("tests/consumer-dist"),
    emptyOutDir: false,
    lib: {
      entry: resolve("tests/consumers/virtual-layout.mjs"),
      formats: ["es"],
      fileName: () => "virtual-layout.js",
    },
  },
});
console.log("二维网格/瀑布流共享发布模块浏览器消费构建通过");
