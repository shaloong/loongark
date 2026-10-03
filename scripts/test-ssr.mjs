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
  const interactiveChartProps =
    "{data:[{name:'Advanced SSR category',value:75,hidden:20}],series:[{key:'value',label:'Visible SSR series'},{key:'hidden',label:'Hidden SSR series'}],seriesKeys:['value'],labelKey:'name',title:'Advanced SSR chart',domain:[0,50],interactive:true,showDataTable:true,onSeriesKeysChange:()=>{throw Error('SSR must not toggle series')}}";
  const interactiveChartScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkChart,${interactiveChartProps})})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>h(L.LoongArkChart,${interactiveChartProps})));`
        : `console.log(renderToString(h(L.LoongArkChart,${interactiveChartProps})));`;
  const arkScript =
    framework === "Vue"
      ? `function AdvancedSSR(){const select=L.useSelect({collection:L.createListCollection({items:['react','vue']}),name:'ssr-framework',defaultValue:['react']});const crop=L.useImageCropper();return ()=>h('div',{},[h(L.LoongArkSelectRootProvider,{value:select.value},()=>h(L.LoongArkSelectHiddenSelect)),h(L.LoongArkImageCropperRootProvider,{value:crop.value},()=>h(L.LoongArkImageCropperViewport)),h(L.LoongArkJsonTreeViewRoot,{data:{project:'SSR JSON'},defaultExpandedDepth:1},()=>h(L.LoongArkJsonTreeViewTree,{'aria-label':'SSR structured data'})),h(L.LoongArkClientOnly,{}, {default:()=> 'Client-only secret',fallback:()=> 'SSR client fallback'}),h(L.LoongArkHighlight,{text:'SSR highlighted text',query:'highlighted'}),h(L.LoongArkFormatByte,{value:2048,unitSystem:'binary'})]);}console.log(await renderToString(createSSRApp({setup:AdvancedSSR})));`
      : framework === "Solid"
        ? `function AdvancedSSR(){const select=L.useSelect(()=>({collection:L.createListCollection({items:['react','vue']}),name:'ssr-framework',defaultValue:['react']})),crop=L.useImageCropper();return [h(L.LoongArkSelectRootProvider,{value:select,get children(){return h(L.LoongArkSelectHiddenSelect,{})}}),h(L.LoongArkImageCropperRootProvider,{value:crop,get children(){return h(L.LoongArkImageCropperViewport,{})}}),h(L.LoongArkJsonTreeViewRoot,{data:{project:'SSR JSON'},defaultExpandedDepth:1,get children(){return h(L.LoongArkJsonTreeViewTree,{'aria-label':'SSR structured data'})}}),h(L.LoongArkClientOnly,{children:'Client-only secret',fallback:'SSR client fallback'}),h(L.LoongArkHighlight,{text:'SSR highlighted text',query:'highlighted'}),h(L.LoongArkFormatByte,{value:2048,unitSystem:'binary'})];}console.log(renderToString(()=>h(AdvancedSSR,{})));`
        : `function AdvancedSSR(){const select=L.useSelect({collection:L.createListCollection({items:['react','vue']}),name:'ssr-framework',defaultValue:['react']}),crop=L.useImageCropper();return h('div',null,h(L.LoongArkSelectRootProvider,{value:select},h(L.LoongArkSelectHiddenSelect)),h(L.LoongArkImageCropperRootProvider,{value:crop},h(L.LoongArkImageCropperViewport)),h(L.LoongArkJsonTreeViewRoot,{data:{project:'SSR JSON'},defaultExpandedDepth:1},h(L.LoongArkJsonTreeViewTree,{'aria-label':'SSR structured data'})),h(L.LoongArkClientOnly,{fallback:'SSR client fallback'},'Client-only secret'),h(L.LoongArkHighlight,{text:'SSR highlighted text',query:'highlighted'}),h(L.LoongArkFormatByte,{value:2048,unitSystem:'binary'}));}console.log(renderToString(h(AdvancedSSR)));`;
  const nextScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h('div',{},[h(L.LoongArkDateInputRoot,{name:'ssr-date',locale:'en-US',defaultValue:[L.parseDate('2026-10-03')]},()=>[h(L.LoongArkDateInputLabel,{},()=> 'SSR date'),h(L.LoongArkDateInputHiddenInput)]),h(L.LoongArkTocRoot,{id:'ssr-outline',items:[]},()=>h(L.LoongArkTocNav,{},()=>h(L.LoongArkTocTitle,{},()=> 'SSR outline'))),h(L.LoongArkSwapRoot,{swapped:false},()=>h(L.LoongArkSwapIndicator,{type:'off'},()=> 'SSR swap off')),h(L.LoongArkDrawerRoot,{},()=>h(L.LoongArkDrawerTrigger,{},()=> 'SSR drawer trigger'))])})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>[h(L.LoongArkDateInputRoot,{name:'ssr-date',locale:'en-US',defaultValue:[L.parseDate('2026-10-03')],get children(){return [h(L.LoongArkDateInputLabel,{children:'SSR date'}),h(L.LoongArkDateInputHiddenInput,{})]}}),h(L.LoongArkTocRoot,{id:'ssr-outline',items:[],get children(){return h(L.LoongArkTocNav,{get children(){return h(L.LoongArkTocTitle,{children:'SSR outline'})}})}}),h(L.LoongArkSwapRoot,{swapped:false,get children(){return h(L.LoongArkSwapIndicator,{type:'off',children:'SSR swap off'})}}),h(L.LoongArkDrawerRoot,{get children(){return h(L.LoongArkDrawerTrigger,{children:'SSR drawer trigger'})}})]));`
        : `console.log(renderToString(h('div',null,h(L.LoongArkDateInputRoot,{name:'ssr-date',locale:'en-US',defaultValue:[L.parseDate('2026-10-03')]},h(L.LoongArkDateInputLabel,null,'SSR date'),h(L.LoongArkDateInputHiddenInput)),h(L.LoongArkTocRoot,{id:'ssr-outline',items:[]},h(L.LoongArkTocNav,null,h(L.LoongArkTocTitle,null,'SSR outline'))),h(L.LoongArkSwapRoot,{swapped:false},h(L.LoongArkSwapIndicator,{type:'off'},'SSR swap off')),h(L.LoongArkDrawerRoot,null,h(L.LoongArkDrawerTrigger,null,'SSR drawer trigger')))));`;
  const questionnaireProps =
    "{label:'Conditional SSR',questions:[{id:'hiddenSSR',label:'Hidden SSR',type:'text',required:true,when:()=>false,validate:()=>{throw Error('SSR must not validate')}},{id:'visibleSSR',label:'Visible SSR',type:'text',validate:()=>{throw Error('SSR must not validate')}}],defaultValue:{hiddenSSR:'Hidden answer must not leak',visibleSSR:'Visible conditional SSR answer'},onValueChange:()=>{throw Error('SSR must not emit')},onComplete:()=>{throw Error('SSR must not complete')}}";
  const questionnaireScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkQuestionnaire,${questionnaireProps})})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>h(L.LoongArkQuestionnaire,${questionnaireProps})));`
        : `console.log(renderToString(h(L.LoongArkQuestionnaire,${questionnaireProps})));`;
  const serverProps =
    "{label:'SSR remote table',data:[{id:'remoteSSR',name:'SSR remote row',value:9}],columns:[{key:'name',label:'Remote project'},{key:'value',label:'Remote revenue'}],columnKeys:['value','name'],mode:'server',totalRows:21,pageSize:2,state:{query:'not-matching',page:3,sort:{key:'value',direction:'asc'}},selectedIds:['off-page'],loading:true,error:'SSR remote failure',onRetry:()=>{throw Error('SSR must not retry')},onStateChange:()=>{throw Error('SSR must not change table state')},onSelectionChange:()=>{throw Error('SSR must not select')}}";
  const serverScript =
    framework === "Vue"
      ? `console.log(await renderToString(createSSRApp({render:()=>h(L.LoongArkDataTable,${serverProps})})));`
      : framework === "Solid"
        ? `console.log(renderToString(()=>h(L.LoongArkDataTable,${serverProps})));`
        : `console.log(renderToString(h(L.LoongArkDataTable,${serverProps})));`;
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      script.replace(
        "process.exit(0);",
        tableScript +
          chartScript +
          interactiveChartScript +
          arkScript +
          nextScript +
          questionnaireScript +
          serverScript +
          "process.exit(0);",
      ),
    ],
    { encoding: "utf8", timeout: 60000 },
  );
  assert.equal(
    result.status,
    0,
    `${framework}: ${result.stderr} ${result.error ?? ""}`,
  );
  assert.match(
    result.stdout,
    /<input(?=[^>]*name="ssr-date")(?=[^>]*value="10\/3\/2026")[^>]*>/,
  );
  for (const text of ["SSR outline", "SSR swap off", "SSR drawer trigger"])
    assert.ok(result.stdout.includes(text));
  assert.equal((result.stdout.match(/id="toc:ssr-outline"/g) ?? []).length, 1);
  assert.match(result.stdout, /id="toc:ssr-outline-nav"/);
  assert.match(result.stdout, /Advanced SSR category — Visible SSR series: 75/);
  assert.match(result.stdout, /Visible range: 0 to 50/);
  assert.match(result.stdout, /<caption>Advanced SSR chart<\/caption>/);
  assert.match(result.stdout, /aria-pressed="false"/);
  assert.doesNotMatch(result.stdout, /<th scope="col">Hidden SSR series/);
  assert.match(result.stdout, /SSR remote row/);
  assert.match(result.stdout, /SSR remote failure/);
  assert.match(result.stdout, /aria-busy="true"/);
  assert.match(
    result.stdout.replace(/<[^>]*>/g, ""),
    /21 rows · 1 selected · 3 \/ 11/,
  );
  assert.match(result.stdout, /Visible conditional SSR answer/);
  assert.doesNotMatch(
    result.stdout,
    /Hidden answer must not leak|name="hiddenSSR"/,
  );
  assert.match(result.stdout, /name="visibleSSR"/);
  assert.match(result.stdout, /Hello/);
  assert.match(result.stdout, /SSR client fallback/);
  assert.doesNotMatch(result.stdout, /Client-only secret/);
  assert.match(result.stdout, /SSR JSON/);
  assert.match(result.stdout, /data-scope="image-cropper"/);
  assert.match(result.stdout, /name="ssr-framework"/);
  assert.match(result.stdout, /<mark[^>]*>highlighted<\/mark>/);

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
