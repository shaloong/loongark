<script lang="ts">
  import { bootstrapKit } from "@loongark/kit/bootstrap";
  import type { LoongArkProviderCoreProps } from "../provider-core";
  import ProviderCore from "./ProviderCore.svelte";
  let { children, ...options }: LoongArkProviderCoreProps = $props();
</script>
<ProviderCore {...options} styleBootstrap={options.styleBootstrap ?? bootstrapKit}>
  {#if children}{@render children()}{/if}
</ProviderCore>
