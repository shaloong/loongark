<script lang="ts">
 import * as L from "@loongark/svelte";import CollectionView from "./AsyncCollectionView.svelte";
 let shown=$state(true),disposed=$state(0);
</script>
<L.LoongArkStack gap="md" style="max-width:640px;width:100%"><L.LoongArkTypography as="h2">A resilient async collection</L.LoongArkTypography><L.LoongArkTypography variant="muted">Pages overlap intentionally. Cancel, retry or change the filter while loading; late results stay out of the collection.</L.LoongArkTypography><L.LoongArkButton variant="outline" onclick={()=>shown=!shown}>{shown ? "Hide collection" : "Show collection"}</L.LoongArkButton>{#if shown}<CollectionView onDispose={()=>disposed++} />{/if}<output aria-label="Disposed collections">{`${disposed} disposed`}</output></L.LoongArkStack>
