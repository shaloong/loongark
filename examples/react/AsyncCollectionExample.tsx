import { useEffect, useState, useRef } from "react";
import * as L from "@loongark/react";
import { createAsyncCollectionDemo, type CollectionDemoItem } from "../shared/asyncCollectionDemo";
function CollectionView({onDispose}: {onDispose: () => void}) {
 const [,redraw] = useState(0), [demo] = useState(() => createAsyncCollectionDemo(() => redraw(v=>v+1)));
 const list = L.useAsyncList<CollectionDemoItem,number>({load:demo.loader.load,onSuccess:demo.loader.onSuccess,autoReload:false});
 const life=useRef(0);
 useEffect(()=>{const version=++life.current;return()=>{demo.cancel();queueMicrotask(()=>{if(life.current===version){demo.dispose();onDispose();}});};},[demo,onDispose]);
 const button=(label:string,action:()=>void,disabled=false)=><L.LoongArkButton type="button" variant="outline" disabled={disabled} onClick={action}>{label}</L.LoongArkButton>;
 const busy=list.loading || list.sorting;
 return <L.LoongArkStack gap="md">
  <L.LoongArkInputRoot><L.LoongArkInputLabel>Filter collection</L.LoongArkInputLabel><L.LoongArkInputControl value={list.filterText} onChange={e=>list.setFilterText(e.currentTarget.value)} placeholder="Try slow, then fast" /></L.LoongArkInputRoot>
  <L.LoongArkStack orientation="horizontal" gap="sm">
   {button("Load collection",list.reload,busy)}{button("Load more",list.loadMore,busy||!list.hasMore||!!list.error)}{button("Cancel request",list.abort,!busy)}
   {button("Fail next request",demo.failNext,busy)}{button("Cycle next cursor",demo.cycleNext,busy)}
   {button("Sort descending",()=>list.sort({column:"label",direction:"descending"}),busy)}{button("Sort ascending",()=>list.sort({column:"label",direction:"ascending"}),busy)}
  </L.LoongArkStack>
  <p role="status">{busy ? "Loading collection…" : `${list.items.length} items · ${list.hasMore ? "More pages available" : "End of collection"}`}</p>
  {list.error && <div role="alert" style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"var(--lk-space-component-sm)"}}>{list.error instanceof Error ? list.error.message : String(list.error)} {button("Retry request",()=>demo.snapshot.pageRequest ? list.loadMore() : list.reload(),busy)}</div>}
  <ul aria-label="Collection items" aria-busy={busy} style={{margin:0,padding:0,listStyle:"none",display:"grid",gap:"var(--lk-space-component-sm)"}}>{list.items.map(item=><li key={item.id} data-item-id={item.id} style={{border:"var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",borderRadius:"var(--lk-radius-md)",padding:"var(--lk-space-component-compact)",overflowWrap:"anywhere"}}>{item.label}</li>)}</ul>
  {list.empty && !busy && !list.error && <p>No items loaded. Load the collection or choose a filter.</p>}
  <output aria-label="Collection requests">{demo.snapshot.summary}</output>
 </L.LoongArkStack>;
}
export function AsyncCollectionExample() {
 const [shown,setShown]=useState(true),[disposed,setDisposed]=useState(0);
 const [onDispose]=useState(()=>()=>setDisposed(v=>v+1));
 return <L.LoongArkStack gap="md" style={{maxWidth:640,width:"100%"}}><L.LoongArkTypography as="h2">A resilient async collection</L.LoongArkTypography><L.LoongArkTypography variant="muted">Pages overlap intentionally. Cancel, retry or change the filter while loading; late results stay out of the collection.</L.LoongArkTypography><L.LoongArkButton variant="outline" onClick={()=>setShown(!shown)}>{shown ? "Hide collection" : "Show collection"}</L.LoongArkButton>{shown && <CollectionView onDispose={onDispose}/>}<output aria-label="Disposed collections">{`${disposed} disposed`}</output></L.LoongArkStack>;
}
