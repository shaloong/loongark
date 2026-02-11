<script lang="ts">
  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterPanelProps } from "@ark-ui/svelte/splitter";
</script>

<Splitter.Panel
  data-scope="splitter"
  data-part="panel"
  {...$$restProps}
>
  <slot />
</Splitter.Panel>
