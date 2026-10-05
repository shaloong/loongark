/** @jsxImportSource solid-js */
import { createSignal, onCleanup } from "solid-js";
import * as L from "@loongark/solid";
import { createAsyncCollectionDemo, type CollectionDemoItem } from "../shared/asyncCollectionDemo";
function CollectionView({onDispose}: {onDispose: () => void}) {
 const [revision,redraw] = createSignal(0), demo = createAsyncCollectionDemo(() => redraw(v=>v+1));
 const snapshot = () => { revision();return demo.snapshot; };
 const list = L.useAsyncList<CollectionDemoItem,number>(()=>({load:demo.loader.load,onSuccess:demo.loader.onSuccess,autoReload:false}));
 onCleanup(()=>{demo.dispose();onDispose();});
 const button=(label:string,action:()=>void,disabled:()=>boolean=()=>false)=><L.LoongArkButton type="button" variant="outline" disabled={disabled()} onClick={action}>{label}</L.LoongArkButton>;
 const busy=()=>list().loading || list().sorting;
 return <L.LoongArkStack gap="md">
  <L.LoongArkInputRoot><L.LoongArkInputLabel>Filter collection</L.LoongArkInputLabel><L.LoongArkInputControl value={list().filterText} onInput={e=>list().setFilterText(e.currentTarget.value)} placeholder="Try slow, then fast" /></L.LoongArkInputRoot>
  <L.LoongArkStack orientation="horizontal" gap="sm">
   {button("Load collection",list().reload,busy)}{button("Load more",list().loadMore,()=>busy()||!list().hasMore||!!list().error)}{button("Cancel request",list().abort,()=>!busy())}
   {button("Fail next request",demo.failNext,busy)}{button("Cycle next cursor",demo.cycleNext,busy)}
   {button("Sort descending",()=>list().sort({column:"label",direction:"descending"}),busy)}{button("Sort ascending",()=>list().sort({column:"label",direction:"ascending"}),busy)}
  </L.LoongArkStack>
  <p role="status">{busy() ? "Loading collection…" : `${list().items.length} items · ${list().hasMore ? "More pages available" : "End of collection"}`}</p>
  {list().error && <div role="alert" style={{display:"flex","align-items":"center","flex-wrap":"wrap",gap:"var(--lk-space-component-sm)"}}>{list().error instanceof Error ? list().error.message : String(list().error)} {button("Retry request",()=>demo.snapshot.pageRequest ? list().loadMore() : list().reload(),busy)}</div>}
  <ul aria-label="Collection items" aria-busy={busy()} style={{margin:0,padding:0,"list-style":"none",display:"grid",gap:"var(--lk-space-component-sm)"}}>{list().items.map(item=><li data-item-id={item.id} style={{border:"var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)","border-radius":"var(--lk-radius-md)",padding:"var(--lk-space-component-compact)","overflow-wrap":"anywhere"}}>{item.label}</li>)}</ul>
  {list().empty && !busy() && !list().error && <p>No items loaded. Load the collection or choose a filter.</p>}
  <output aria-label="Collection requests">{snapshot().summary}</output>
 </L.LoongArkStack>;
}
export function AsyncCollectionExample() {
 const [shown,setShown]=createSignal(true),[disposed,setDisposed]=createSignal(0);
 const onDispose=()=>setDisposed(v=>v+1);
 return <L.LoongArkStack gap="md" style={{"max-width":"640px",width:"100%"}}><L.LoongArkTypography as="h2">A resilient async collection</L.LoongArkTypography><L.LoongArkTypography variant="muted">Pages overlap intentionally. Cancel, retry or change the filter while loading; late results stay out of the collection.</L.LoongArkTypography><L.LoongArkButton variant="outline" onClick={()=>setShown(!shown())}>{shown() ? "Hide collection" : "Show collection"}</L.LoongArkButton>{shown() && <CollectionView onDispose={onDispose}/>}<output aria-label="Disposed collections">{`${disposed()} disposed`}</output></L.LoongArkStack>;
}
