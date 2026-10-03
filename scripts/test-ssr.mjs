import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createLoongArkTheme } from "../packages/theme/dist/index.js";
import { bootstrapKit } from "../packages/kit/dist/index.js";
const theme = createLoongArkTheme({ mode: "dark" });
assert.match(
  createLoongArkTheme({ targetId: "workspace" }).toCSS(),
  /data-lk-theme='workspace'/,
);
bootstrapKit(theme);
assert.match(theme.toStyleSheet(), /data-scope="button"/);
assert.match(theme.toStyleSheet(), /--lk-color-semantic-background: #121212/);
for (const [framework, script] of [
  [
    "React",
    `import {createElement as h} from 'react';import {renderToString} from 'react-dom/server';import * as L from './packages/react/dist/index.js';console.log(renderToString(h(L.LoongArkContainer,null,h(L.LoongArkButton,null,'Hello'),h(L.LoongArkTextarea,{name:'notes',value:'SSR notes',readOnly:true,autoSize:true,minRows:2,maxRows:5}),h(L.LoongArkChipRemoveTrigger,null,'Remove'),h(L.LoongArkTransferList,{items:[{value:'alpha',label:'Alpha'}],defaultValue:['alpha'],name:'assigned'}),h(L.LoongArkTimePicker,{defaultValue:'13:30',name:'meeting',minuteStep:15}),h(L.LoongArkFloatingActionButton,{'aria-label':'Create SSR'},'＋'),h(L.LoongArkSpeedDial,{label:'SSR actions',actions:[{value:'new',label:'New'}]}),h(L.LoongArkImageList,{columns:2},h(L.LoongArkImageListItem,null,'Image SSR')),h(L.LoongArkMasonry,{columns:2},h(L.LoongArkMasonryItem,null,'Media SSR')),h(L.LoongArkBottomNavigationItem,{href:'#home',active:true},'Home'))));console.log(renderToString(h("div",null,h(L.LoongArkMessageScroller,{label:'SSR conversation'},h(L.LoongArkMessage,{author:'Lin'},h(L.LoongArkBubble,null,'Conversation SSR'),h(L.LoongArkAttachment,{name:'SSR.pdf',status:'uploading'}))),h(L.LoongArkQuestionnaire,{label:'SSR feedback',questions:[{id:'answer',label:'Your answer',type:'text'}],defaultValue:{answer:'SSR answer'}}))));process.exit(0);`,
  ],
  [
    "Vue",
    `import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';import * as L from './packages/vue/dist/index.js';console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkContainer,{},()=>[h(L.LoongArkButton,{},()=> 'Hello'),h(L.LoongArkTextarea,{name:'notes',modelValue:'SSR notes',readonly:true,autoSize:true,minRows:2,maxRows:5}),h(L.LoongArkChipRemoveTrigger,{},()=> 'Remove'),h(L.LoongArkTransferList,{items:[{value:'alpha',label:'Alpha'}],defaultValue:['alpha'],name:'assigned'}),h(L.LoongArkTimePicker,{defaultValue:'13:30',name:'meeting',minuteStep:15}),h(L.LoongArkFloatingActionButton,{'aria-label':'Create SSR'},()=> '＋'),h(L.LoongArkSpeedDial,{label:'SSR actions',actions:[{value:'new',label:'New'}]}),h(L.LoongArkImageList,{columns:2},()=>h(L.LoongArkImageListItem,{},()=> 'Image SSR')),h(L.LoongArkMasonry,{columns:2},()=>h(L.LoongArkMasonryItem,{},()=> 'Media SSR')),h(L.LoongArkBottomNavigationItem,{href:'#home',active:true},()=> 'Home')])})));console.log(await renderToString(createSSRApp({render:()=>h('div',{},[h(L.LoongArkMessageScroller,{label:'SSR conversation'},()=>h(L.LoongArkMessage,{author:'Lin'},()=>[h(L.LoongArkBubble,{},()=> 'Conversation SSR'),h(L.LoongArkAttachment,{name:'SSR.pdf',status:'uploading'})])),h(L.LoongArkQuestionnaire,{label:'SSR feedback',questions:[{id:'answer',label:'Your answer',type:'text'}],defaultValue:{answer:'SSR answer'}})])})));process.exit(0);`,
  ],
  [
    "Solid",
    `import {renderToString} from 'solid-js/web';import {createComponent as h} from 'solid-js';import * as L from './packages/solid/dist/server/index.js';console.log(renderToString(()=>h(L.LoongArkContainer,{children:[h(L.LoongArkButton,{children:'Hello'}),h(L.LoongArkTextarea,{name:'notes',value:'SSR notes',readOnly:true,autoSize:true,minRows:2,maxRows:5}),h(L.LoongArkChipRemoveTrigger,{children:'Remove'}),h(L.LoongArkTransferList,{items:[{value:'alpha',label:'Alpha'}],defaultValue:['alpha'],name:'assigned'}),h(L.LoongArkTimePicker,{defaultValue:'13:30',name:'meeting',minuteStep:15}),h(L.LoongArkFloatingActionButton,{'aria-label':'Create SSR',children:'＋'}),h(L.LoongArkSpeedDial,{label:'SSR actions',actions:[{value:'new',label:'New'}]}),h(L.LoongArkImageList,{columns:2,children:h(L.LoongArkImageListItem,{children:'Image SSR'})}),h(L.LoongArkMasonry,{columns:2,children:h(L.LoongArkMasonryItem,{children:'Media SSR'})}),h(L.LoongArkBottomNavigationItem,{href:'#home',active:true,children:'Home'})]})));console.log(renderToString(()=>h(L.LoongArkMessageScroller,{label:'SSR conversation',children:[h(L.LoongArkMessage,{author:'Lin',children:[h(L.LoongArkBubble,{children:'Conversation SSR'}),h(L.LoongArkAttachment,{name:'SSR.pdf',status:'uploading'})]}),h(L.LoongArkQuestionnaire,{label:'SSR feedback',questions:[{id:'answer',label:'Your answer',type:'text'}],defaultValue:{answer:'SSR answer'}})]})));process.exit(0);`,
  ],
]) {
  const tableProps =
    "{data:[{id:'a',name:'Alpha'}],columns:[{key:'name',label:'Name'}],defaultSelectedIds:['a','missing'],onSelectionChange:()=>{throw Error('SSR must not emit selection updates')}}";
  const tableScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkDataTable,${tableProps})})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>h(L.LoongArkDataTable,${tableProps})));`
        : `console.log(renderToString(h(L.LoongArkDataTable,${tableProps})));`;
  const chartProps =
    "{data:[{name:'SSR category',value:1e308},{name:'Missing',value:null}],series:[{key:'value',label:'SSR series'}],labelKey:'name',title:'SSR chart',labels:{series:'SSR legend'}}";
  const chartScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkChart,${chartProps})})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>h(L.LoongArkChart,${chartProps})));`
        : `console.log(renderToString(h(L.LoongArkChart,${chartProps})));`;
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      script.replace(
        "process.exit(0);",
        tableScript + chartScript + "process.exit(0);",
      ),
    ],
    { encoding: "utf8", timeout: 60000 },
  );
  assert.equal(
    result.status,
    0,
    `${framework}: ${result.stderr} ${result.error ?? ""}`,
  );
  assert.match(result.stdout, /Hello/);
  assert.match(result.stdout, /aria-label="SSR legend"/);
  assert.match(result.stdout, /SSR category — SSR series: 1e\+308/);
  assert.match(result.stdout.replace(/<[^>]*>/g, ""), /1 rows · 1 selected/);
  for (const scope of [
    "attachment",
    "bubble",
    "message",
    "message-scroller",
    "questionnaire",
  ])
    assert.match(result.stdout, new RegExp(`data-scope="${scope}"`));
  assert.match(result.stdout, /Conversation SSR/);
  assert.match(result.stdout, /SSR answer/);
  assert.match(
    result.stdout,
    /<button(?=[^>]*data-scope="floating-action-button")(?=[^>]*type="button")[^>]*>/,
  );
  assert.match(result.stdout, /data-scope="speed-dial"/);
  assert.match(result.stdout, /Image SSR/);
  assert.match(result.stdout, /Media SSR/);
  assert.match(
    result.stdout,
    /<input(?=[^>]*name="assigned")(?=[^>]*value="alpha")[^>]*>/,
  );
  assert.match(
    result.stdout,
    /<input(?=[^>]*name="meeting")(?=[^>]*value="13:30")[^>]*>/,
  );
  assert.match(
    result.stdout,
    /<textarea(?=[^>]*data-autosize="true")(?=[^>]*rows="2")[^>]*>/,
  );
  assert.match(
    result.stdout,
    /<textarea[^>]*name="notes"[^>]*>SSR notes<\/textarea>/,
  );
  assert.match(
    result.stdout,
    /<button[^>]*type="button"[^>]*>Remove<\/button>/,
  );
  assert.match(result.stdout, /<a[^>]*aria-current="page"[^>]*>Home<\/a>/);
  console.log(
    `${framework} SSR: Button、Textarea、Container、ChipRemoveTrigger、BottomNavigationItem、TransferList、TimePicker、自动行数通过`,
  );
}
console.log("React、Vue、Solid SSR 与服务端主题样式收集通过");
