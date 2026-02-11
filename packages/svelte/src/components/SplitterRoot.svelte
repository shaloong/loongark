<script lang="ts">
  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterRootProps } from "@ark-ui/svelte/splitter";
  import type { SplitterSize } from "@loongark/primitives";

  export let size: SplitterSize = "md";
</script>

<Splitter.Root
  data-scope="splitter"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Splitter.Root>
