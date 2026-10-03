<script lang="ts">
 import {untrack} from "svelte";
 import {EnvironmentProvider} from "@ark-ui/svelte/environment";
 import {Portal} from "@ark-ui/svelte/portal";
 import type {FrameProps} from "@ark-ui/svelte/frame";
 import {frameDocument,observeFrameSize} from "@loongark/kit";
 let {ref=$bindable(null),srcdoc=frameDocument,head,children,onMount,onUnmount,onload,...props}:FrameProps=$props();
 let content=$state<HTMLElement|null>(null),headNode=$state<HTMLHeadElement|null>(null);
 function loaded(event:Event & {currentTarget:EventTarget & Element}){
  const doc=ref?.contentDocument;
  content=doc?.querySelector<HTMLElement>('.frame-root')??doc?.body??null;headNode=doc?.head??null;
  onload?.(event);
 }
 $effect(()=>{
  const frame=ref,node=content;
  if(!frame||!node)return;
  const dispose=observeFrameSize(frame,node);untrack(()=>onMount?.());
  return ()=>{dispose();untrack(()=>onUnmount?.());};
 });
</script>
<iframe {...props} {srcdoc} bind:this={ref} onload={loaded}></iframe>
<EnvironmentProvider value={()=>ref?.contentDocument??document}>
 {#if content}<Portal container={content}>{@render children?.()}</Portal>{/if}
 {#if headNode&&head}<Portal container={headNode}>{@render head()}</Portal>{/if}
</EnvironmentProvider>
