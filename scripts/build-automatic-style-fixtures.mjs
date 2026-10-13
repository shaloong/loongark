import { publishedWorkspacePlugin } from "./published-workspace-plugin.mjs";
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {build} from 'vite';import react from '@vitejs/plugin-react';import solid from 'vite-plugin-solid';import {svelte} from '@sveltejs/vite-plugin-svelte';
const frameworks=['react','vue','solid','svelte'];
const manifests=Object.fromEntries(await Promise.all(['react','vue','solid','svelte','kit','primitives','theme','tokens'].map(async name=>[name,JSON.parse(await readFile(`packages/${name}/package.json`,'utf8'))])));
for(const framework of frameworks){
 const root=resolve(`tests/consumers/${framework}/automatic`);await mkdir(root,{recursive:true});
 const shared=`import type {} from '../../../automaticStyleProbe';
import {LoongArkProvider as Provider,LoongArkButton as Button,LoongArkBox as Box,LoongArkNativeSelect as NativeSelect,LoongArkToolbar as Toolbar} from '@loongark/${framework}';
import {bootstrapKitAutomatic} from '@loongark/kit/automatic-bootstrap';
const explicit=new URLSearchParams(location.search).has('explicit');
const styleBootstrap=explicit?bootstrapKitAutomatic:undefined;
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少自动样式挂载节点');`;
 let entry;
 const main=`<Box data-testid="automatic-box" padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box>`;
 const parts=['Root','Trigger','Portal','Overlay','Positioner','Content','Title','Description','CloseTrigger'];
 if(framework==='react'){
  entry=shared+`
import {useState,useEffect} from 'react';import {createRoot} from 'react-dom/client';
type DialogModule=typeof import('@loongark/react/dialog');
const root=createRoot(target);
function App(){const [mode,setMode]=useState<'light'|'dark'|'high-contrast'>('light');const [first,setFirst]=useState(true);const [second,setSecond]=useState(true);const [dialog,setDialog]=useState<DialogModule>();
useEffect(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>setDialog(await import('@loongark/react/dialog')),changeTheme:()=>setMode(m=>m==='light'?'dark':m==='dark'?'high-contrast':'light'),removeFirst:()=>setFirst(false),removeAll:()=>{setFirst(false);setSecond(false);},loadAfterUnmount:async()=>{await import('@loongark/react/input');}};},[]);
const body=(owner:string)=><Provider mode={mode} targetId={'automatic-'+owner} nonce={nonce} styleBootstrap={styleBootstrap}><section data-owner={owner}><Box padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box>{dialog&&<dialog.LoongArkDialogRoot><dialog.LoongArkDialogTrigger>Late dialog</dialog.LoongArkDialogTrigger><dialog.LoongArkDialogPortal><dialog.LoongArkDialogOverlay/><dialog.LoongArkDialogPositioner><dialog.LoongArkDialogContent><dialog.LoongArkDialogTitle>Late dialog title</dialog.LoongArkDialogTitle><dialog.LoongArkDialogDescription>Automatically loaded styles.</dialog.LoongArkDialogDescription><dialog.LoongArkDialogCloseTrigger>Close</dialog.LoongArkDialogCloseTrigger></dialog.LoongArkDialogContent></dialog.LoongArkDialogPositioner></dialog.LoongArkDialogPortal></dialog.LoongArkDialogRoot>}</section></Provider>;
return <main>{first&&body('a')}{second&&body('b')}</main>;}
root.render(<App/>);`;
 }
 if(framework==='vue'){
  entry=shared+`
import {createApp,h,ref,shallowRef,onMounted} from 'vue';
type DialogModule=typeof import('@loongark/vue/dialog');
createApp({setup(){const mode=ref<'light'|'dark'|'high-contrast'>('light');const first=ref(true),second=ref(true),dialog=shallowRef<DialogModule>();
onMounted(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>{dialog.value=await import('@loongark/vue/dialog');},changeTheme:()=>{mode.value=mode.value==='light'?'dark':mode.value==='dark'?'high-contrast':'light';},removeFirst:()=>{first.value=false;},removeAll:()=>{first.value=false;second.value=false;},loadAfterUnmount:async()=>{await import('@loongark/vue/input');}};});
const body=(owner:string)=>{const d=dialog.value;return h(Provider,{mode:mode.value,targetId:'automatic-'+owner,nonce,styleBootstrap},()=>h('section',{'data-owner':owner},[h(Box,{padding:'md'},()=>[h(Button,{},()=> 'Automatic button'),h(NativeSelect,{'aria-label':'Automatic selection'},()=>[h('option','One'),h('option','Two')]),h(Toolbar,{'aria-label':'Automatic toolbar'},()=>h(Button,{},()=> 'Toolbar action'))]),d&&h(d.LoongArkDialogRoot,{},()=>[h(d.LoongArkDialogTrigger,{},()=> 'Late dialog'),h(d.LoongArkDialogPortal,{},()=>[h(d.LoongArkDialogOverlay),h(d.LoongArkDialogPositioner,{},()=>h(d.LoongArkDialogContent,{},()=>[h(d.LoongArkDialogTitle,{},()=> 'Late dialog title'),h(d.LoongArkDialogDescription,{},()=> 'Automatically loaded styles.'),h(d.LoongArkDialogCloseTrigger,{},()=> 'Close')]))])])]));};
return ()=>h('main',[first.value&&body('a'),second.value&&body('b')]);}}).mount(target);`;
 }
 if(framework==='solid'){
  entry=shared+`
import {createSignal,onMount,Show} from 'solid-js';import {render} from 'solid-js/web';
type DialogModule=typeof import('@loongark/solid/dialog');
function App(){const [mode,setMode]=createSignal<'light'|'dark'|'high-contrast'>('light');const [first,setFirst]=createSignal(true),[second,setSecond]=createSignal(true),[dialog,setDialog]=createSignal<DialogModule>();
onMount(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>{setDialog(await import('@loongark/solid/dialog'));},changeTheme:()=>setMode(m=>m==='light'?'dark':m==='dark'?'high-contrast':'light'),removeFirst:()=>setFirst(false),removeAll:()=>{setFirst(false);setSecond(false);},loadAfterUnmount:async()=>{await import('@loongark/solid/input');}};});
const body=(owner:string)=><Provider mode={mode()} targetId={'automatic-'+owner} nonce={nonce} styleBootstrap={styleBootstrap}><section data-owner={owner}><Box padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box><Show when={dialog()}>{d=><d().LoongArkDialogRoot/>}</Show></section></Provider>;
return <main><Show when={first()}>{body('a')}</Show><Show when={second()}>{body('b')}</Show></main>;}
render(App,target);`;
  // Solid JSX 成员表达式需先取得稳定模块引用，不能把函数调用作为标签。
  entry=entry.replace('<Show when={dialog()}>{d=><d().LoongArkDialogRoot/>}</Show>',`<Show when={dialog()}>{d=>{const {${parts.map(p=>`LoongArkDialog${p}:Dialog${p}`).join(',')}}=d();return <DialogRoot><DialogTrigger>Late dialog</DialogTrigger><DialogPortal><DialogOverlay/><DialogPositioner><DialogContent><DialogTitle>Late dialog title</DialogTitle><DialogDescription>Automatically loaded styles.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot>;}}</Show>`);
 }
 if(framework==='svelte'){
  const source=`<script lang="ts">${shared}
import {onMount} from 'svelte';
import type {StyleBootstrap} from '@loongark/primitives/styles';
let mode=$state<'light'|'dark'|'high-contrast'>('light');let first=$state(true),second=$state(true);let dialog=$state<typeof import('@loongark/svelte/dialog')>();
onMount(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>{dialog=await import('@loongark/svelte/dialog');},changeTheme:()=>{mode=mode==='light'?'dark':mode==='dark'?'high-contrast':'light';},removeFirst:()=>{first=false;},removeAll:()=>{first=false;second=false;},loadAfterUnmount:async()=>{await import('@loongark/svelte/input');}};});
</script>
{#snippet body(owner:string,mode:'light'|'dark'|'high-contrast',dialog:typeof import('@loongark/svelte/dialog')|undefined,nonce:string|undefined,styleBootstrap:StyleBootstrap|undefined)}<Provider {mode} targetId={'automatic-'+owner} {nonce} {styleBootstrap}><section data-owner={owner}>${main}{#if dialog}<dialog.LoongArkDialogRoot><dialog.LoongArkDialogTrigger>Late dialog</dialog.LoongArkDialogTrigger><dialog.LoongArkDialogPortal><dialog.LoongArkDialogOverlay/><dialog.LoongArkDialogPositioner><dialog.LoongArkDialogContent><dialog.LoongArkDialogTitle>Late dialog title</dialog.LoongArkDialogTitle><dialog.LoongArkDialogDescription>Automatically loaded styles.</dialog.LoongArkDialogDescription><dialog.LoongArkDialogCloseTrigger>Close</dialog.LoongArkDialogCloseTrigger></dialog.LoongArkDialogContent></dialog.LoongArkDialogPositioner></dialog.LoongArkDialogPortal></dialog.LoongArkDialogRoot>{/if}</section></Provider>{/snippet}
<main>{#if first}{@render body('a',mode,dialog,nonce,styleBootstrap)}{/if}{#if second}{@render body('b',mode,dialog,nonce,styleBootstrap)}{/if}</main>`;
  await writeFile(resolve(root,'App.svelte'),source);
  entry=`import {mount} from 'svelte';import App from './App.svelte';const target=document.getElementById('app');if(!target)throw Error('缺少挂载节点');mount(App,{target});`;
 }
 const file=framework==='react'||framework==='solid'?'main.tsx':'main.ts';await writeFile(resolve(root,file),entry);
  await writeFile(resolve(root,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Automatic styles</title><body><header><h1>Automatic styles</h1></header><div id="app"></div><script type="module" src="/${file}"></script></body></html>`);
 await build({root,configFile:false,base:'./',logLevel:'error',plugins:[await publishedWorkspacePlugin(), ...(framework==='react'?[react()]:framework==='solid'?[solid()]:framework==='svelte'?[svelte()]:[]),{name:'actual-published-entries',resolveId(id){const m=/^@loongark\/(react|vue|solid|svelte|kit|primitives|theme|tokens)(\/.+)?$/.exec(id);if(!m)return;const entry=manifests[m[1]].exports[m[2]?'.'+m[2]:'.'];if(!entry)throw Error('未公开入口：'+id);return resolve(`packages/${m[1]}`,typeof entry==='string'?entry:entry.browser??entry.import);}}],build:{outDir:resolve(`tests/consumer-dist/automatic-${framework}`),emptyOutDir:true,rollupOptions:{onwarn(warning,warn){if(warning.code!=='MODULE_LEVEL_DIRECTIVE')warn(warning);}}}});
 console.log(framework,'automatic actual-root fixture built');
}
