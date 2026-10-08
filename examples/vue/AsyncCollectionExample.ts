import {defineComponent,h,ref,onBeforeUnmount, type PropType} from "vue";
import * as L from "@loongark/vue";
import {createAsyncCollectionDemo,type CollectionDemoItem} from "../shared/asyncCollectionDemo";
const CollectionView=defineComponent({props:{onDispose:{type:Function as PropType<()=>void>,required:true}},setup(p){
 const revision=ref(0),demo=createAsyncCollectionDemo(()=>revision.value++),list=L.useAsyncList<CollectionDemoItem,number>({load:demo.loader.load,onSuccess:demo.loader.onSuccess,autoReload:false});
 onBeforeUnmount(()=>{demo.dispose();p.onDispose();});
 return ()=>{revision.value;const api=list.value,busy=api.loading||api.sorting;
 const button=(label:string,onClick:()=>void,disabled=false)=>h(L.LoongArkButton,{type:"button",variant:"outline",onClick,disabled},()=>label);
 return h(L.LoongArkStack,{gap:"md"},()=>[
 h(L.LoongArkInputRoot,{},()=>[h(L.LoongArkInputLabel,{},()=>"Filter collection"),h(L.LoongArkInputControl,{value:api.filterText,placeholder:"Try slow, then fast",onInput:(e:Event)=>api.setFilterText((e.target as HTMLInputElement).value)})]),
 h(L.LoongArkStack,{orientation:"horizontal",gap:"sm"},()=>[button("Load collection",api.reload,busy),button("Load more",api.loadMore,busy||!api.hasMore||!!api.error),button("Cancel request",api.abort,!busy),button("Fail next request",demo.failNext,busy),button("Cycle next cursor",demo.cycleNext,busy),button("Sort descending",()=>api.sort({column:"label",direction:"descending"}),busy),button("Sort ascending",()=>api.sort({column:"label",direction:"ascending"}),busy)]),
 h("p",{role:"status"},busy ? "Loading collection…" : `${api.items.length} items · ${api.hasMore ? "More pages available" : "End of collection"}`),
 api.error && h("div",{role:"alert",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"var(--lk-space-component-sm)"}},[api.error instanceof Error ? api.error.message : String(api.error)," ",button("Retry request",()=>demo.snapshot.pageRequest ? api.loadMore() : api.reload(),busy)]),
 h("ul",{"aria-label":"Collection items","aria-busy":busy,style:{margin:0,padding:0,listStyle:"none",display:"grid",gap:"var(--lk-space-component-sm)"}},api.items.map(item=>h("li",{key:item.id,"data-item-id":item.id,style:{border:"var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",borderRadius:"var(--lk-radius-md)",padding:"var(--lk-space-component-compact)",overflowWrap:"anywhere"}},item.label))),
 api.empty&&!busy&&!api.error&&h("p",{},"No items loaded. Load the collection or choose a filter."),h("output",{"aria-label":"Collection requests"},demo.snapshot.summary)]);
 };
}});
export const AsyncCollectionExample=defineComponent({setup(){const shown=ref(true),disposed=ref(0);return()=>h(L.LoongArkStack,{gap:"md",style:{maxWidth:"640px",width:"100%"}},()=>[h(L.LoongArkTypography,{as:"h2"},()=>"A resilient async collection"),h(L.LoongArkTypography,{variant:"muted"},()=>"Pages overlap intentionally. Cancel, retry or change the filter while loading; late results stay out of the collection."),h(L.LoongArkButton,{variant:"outline",onClick:()=>shown.value=!shown.value},()=>shown.value ? "Hide collection" : "Show collection"),shown.value&&h(CollectionView,{onDispose:()=>disposed.value++}),h("output",{"aria-label":"Disposed collections"},`${disposed.value} disposed`)]);}});
