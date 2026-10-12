<script lang="ts">
  import { bootstrapKitAutomatic } from "@loongark/kit/automatic-bootstrap";
  import type { LoongArkProviderCoreProps } from "../provider-core";
  import ProviderCore from "./ProviderCore.svelte";
  let { children, ...options }: LoongArkProviderCoreProps = $props();
</script>
<ProviderCore {...options} styleBootstrap={options.styleBootstrap ?? bootstrapKitAutomatic}>
  {#if children}{@render children()}{/if}
</ProviderCore>
