import { formatExample } from "./format-example.mjs";
import { writeFile } from "node:fs/promises";
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const read =
    framework === "solid"
      ? "query()"
      : framework === "vue"
        ? "query.value"
        : "query";
  const compute = `const items=L.filterCommandItems(rows,${read},item=>item.name); const collection=L.createCommandCollection({items,itemToString:item=>item.name,itemToValue:item=>item.id});`;
  const rows = `const rows=[{id:"overview",name:"组件概览"},{id:"api",name:"API 参考"},{id:"release",name:"发布说明"}];`;
  const markup = `<L.LoongArkCommand.Root collection={collection} open inputValue={${read}} onInputValueChange={details=>setQuery(details.inputValue)}><L.LoongArkCommand.Label>搜索命令</L.LoongArkCommand.Label><L.LoongArkCommand.Control><L.LoongArkCommand.Input placeholder="搜索组件、API 或发布说明" /></L.LoongArkCommand.Control><L.LoongArkCommand.Content>{items.map(item=><L.LoongArkCommand.Item ${framework === "react" ? "key={item.id}" : ""} item={item}><L.LoongArkCommand.ItemText>{item.name}</L.LoongArkCommand.ItemText></L.LoongArkCommand.Item>)}</L.LoongArkCommand.Content></L.LoongArkCommand.Root>`;
  let source;
  if (framework === "react")
    source = `import React,{useState} from "react";import * as L from "@loongark/react";${rows}export function CommandExample(){const [query,setQuery]=useState("");${compute}return ${markup};}`;
  if (framework === "solid")
    source = `/** @jsxImportSource solid-js */\nimport {createSignal,createMemo} from "solid-js";import * as L from "@loongark/solid";${rows}export function CommandExample(){const [query,setQuery]=createSignal("");const data=createMemo(()=>{${compute}return {items,collection};});return ${markup.replaceAll("collection={collection}", "collection={data().collection}").replaceAll("items.map", "data().items.map")};}`;
  if (framework === "vue")
    source = `import type {ComboboxInputProps} from "@ark-ui/vue/combobox";
import {defineComponent,h,createVNode,resolveDynamicComponent,ref} from "vue";import * as L from "@loongark/vue";${rows}export const CommandExample=defineComponent({setup(){const query=ref("");return ()=>{${compute}return h(L.LoongArkCommand.Root<(typeof rows)[number]>,{collection,open:true,inputValue:query.value,onInputValueChange:(details:{inputValue:string})=>query.value=details.inputValue},()=>[h(L.LoongArkCommand.Label,{},()=>"搜索命令"),h(L.LoongArkCommand.Control,{},()=>createVNode(resolveDynamicComponent(L.LoongArkCommand.Input),{placeholder:"搜索组件、API 或发布说明"} satisfies ComboboxInputProps)),h(L.LoongArkCommand.Content,{},()=>items.map(item=>h(L.LoongArkCommand.Item,{item,key:item.id},()=>h(L.LoongArkCommand.ItemText,{},()=>item.name))))]);};}});`;
  if (framework === "svelte")
    source = `<script lang="ts">import * as L from "@loongark/svelte";${rows}let query=$state("");const items=$derived(L.filterCommandItems(rows,query,item=>item.name));const collection=$derived(L.createCommandCollection({items,itemToString:item=>item.name,itemToValue:item=>item.id}));const setQuery=(next:string)=>query=next;</script>${markup.replace(/\{items\.map\(item=>(.*)\)\}/s, "{#each items as item (item.id)}$1{/each}")}`;
  await writeFile(
    `examples/${framework}/CommandExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
    await formatExample(
      `examples/${framework}/CommandExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
      source + "\n",
    ),
  );
  const invoke =
    framework === "react"
      ? "tour.start()"
      : framework === "vue"
        ? "tour.value.start()"
        : "tour().start()";
  const options = `const tour=L.useTour({onStatusChange:focus.onStatusChange,steps:[{id:"welcome",type:"dialog",title:"欢迎",description:"使用键盘或关闭按钮结束引导。"}]});`;
  const body = `<><L.LoongArkButton onClick={(event)=>focus.start(event,()=>${invoke})}>开始引导</L.LoongArkButton><L.LoongArkTour.Root tour={tour}><L.LoongArkPortal><L.LoongArkTour.Backdrop /><L.LoongArkTour.Positioner><L.LoongArkTour.Content><L.LoongArkTour.Title /><L.LoongArkTour.Description /><L.LoongArkTour.CloseTrigger aria-label="关闭">关闭</L.LoongArkTour.CloseTrigger></L.LoongArkTour.Content></L.LoongArkTour.Positioner></L.LoongArkPortal></L.LoongArkTour.Root></>`;
  if (framework === "react" || framework === "solid")
    source =
      (framework === "solid"
        ? '/** @jsxImportSource solid-js */\nimport {onCleanup} from "solid-js";'
        : 'import React,{useState,useEffect} from "react";') +
      `import * as L from "@loongark/${framework}";export function TourExample(){${framework === "react" ? "const [focus]=useState(createTourFocusDemo);useEffect(()=>()=>focus.dispose(),[focus]);" : "const focus=createTourFocusDemo();onCleanup(focus.dispose);"}${options}return ${body};}`;
  if (framework === "vue")
    source = `import {defineComponent,h,onBeforeUnmount} from "vue";import * as L from "@loongark/vue";export const TourExample=defineComponent({setup(){const focus=createTourFocusDemo();onBeforeUnmount(focus.dispose);${options}return ()=>h("div",{},[h(L.LoongArkButton,{onClick:(event:MouseEvent)=>focus.start(event,()=>${invoke})},()=>"开始引导"),h(L.LoongArkTour.Root,{tour:tour.value},()=>h(L.LoongArkPortal,{},()=>[h(L.LoongArkTour.Backdrop),h(L.LoongArkTour.Positioner,{},()=>h(L.LoongArkTour.Content,{},()=>[h(L.LoongArkTour.Title),h(L.LoongArkTour.Description),h(L.LoongArkTour.CloseTrigger,{"aria-label":"关闭"},()=>"关闭")]))]))]);}});`;
  if (framework === "svelte")
    source = `<script lang="ts">import {onDestroy} from "svelte";import * as L from "@loongark/svelte";const focus=createTourFocusDemo();onDestroy(focus.dispose);${options}</script>${body.replace(/^<>|<\/>$/g, "").replace("onClick=", "onclick=")}`;
  source = source.replace(
    "import * as L from",
    'import {createTourFocusDemo} from "../shared/tourFocusDemo";import * as L from',
  );
  await writeFile(
    `examples/${framework}/TourExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
    await formatExample(
      `examples/${framework}/TourExample.${framework === "svelte" ? "svelte" : framework === "vue" ? "ts" : "tsx"}`,
      source + "\n",
    ),
  );
}
