<script lang="ts">
 import {onDestroy} from "svelte";
 import * as L from "@loongark/svelte";
 import {createAsyncCollectionDemo,type CollectionDemoItem} from "../shared/asyncCollectionDemo";
 let {onDispose}: {onDispose:()=>void} = $props();
 let revision=$state(0);const demo=createAsyncCollectionDemo(()=>revision++),list=L.useAsyncList<CollectionDemoItem,number>(()=>({load:demo.loader.load,onSuccess:demo.loader.onSuccess,autoReload:false}));
 const snapshot=$derived.by(()=>{revision;return demo.snapshot;});const api=$derived(list()),busy=$derived(api.loading||api.sorting);
 onDestroy(()=>{demo.dispose();onDispose();});
</script>
<L.LoongArkStack gap="md">
 <L.LoongArkInputRoot><L.LoongArkInputLabel>Filter collection</L.LoongArkInputLabel><L.LoongArkInputControl value={api.filterText} oninput={(e)=>api.setFilterText(e.currentTarget.value)} placeholder="Try slow, then fast" /></L.LoongArkInputRoot>
 <L.LoongArkStack orientation="horizontal" gap="sm">
  <L.LoongArkButton variant="outline" disabled={busy} onclick={api.reload}>Load collection</L.LoongArkButton><L.LoongArkButton variant="outline" disabled={busy||!api.hasMore||!!api.error} onclick={api.loadMore}>Load more</L.LoongArkButton><L.LoongArkButton variant="outline" disabled={!busy} onclick={api.abort}>Cancel request</L.LoongArkButton>
  <L.LoongArkButton variant="outline" disabled={busy} onclick={demo.failNext}>Fail next request</L.LoongArkButton><L.LoongArkButton variant="outline" disabled={busy} onclick={demo.cycleNext}>Cycle next cursor</L.LoongArkButton>
  <L.LoongArkButton variant="outline" disabled={busy} onclick={()=>api.sort({column:"label",direction:"descending"})}>Sort descending</L.LoongArkButton><L.LoongArkButton variant="outline" disabled={busy} onclick={()=>api.sort({column:"label",direction:"ascending"})}>Sort ascending</L.LoongArkButton>
 </L.LoongArkStack>
 <p role="status">{busy ? "Loading collection…" : `${api.items.length} items · ${api.hasMore ? "More pages available" : "End of collection"}`}</p>
 {#if api.error}<div role="alert" style="display:flex;align-items:center;flex-wrap:wrap;gap:var(--lk-space-component-sm)">{api.error instanceof Error ? api.error.message : String(api.error)} <L.LoongArkButton variant="outline" disabled={busy} onclick={()=>demo.snapshot.pageRequest ? api.loadMore() : api.reload()}>Retry request</L.LoongArkButton></div>{/if}
 <ul aria-label="Collection items" aria-busy={busy} style="margin:0;padding:0;list-style:none;display:grid;gap:var(--lk-space-component-sm)">{#each api.items as item (item.id)}<li data-item-id={item.id} style="border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);padding:var(--lk-space-component-compact);overflow-wrap:anywhere">{item.label}</li>{/each}</ul>
 {#if api.empty&&!busy&&!api.error}<p>No items loaded. Load the collection or choose a filter.</p>{/if}
 <output aria-label="Collection requests">{snapshot.summary}</output>
</L.LoongArkStack>
