<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";
  registerAutomaticStyles(lkAutomaticSplitterStyles);

  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterRootProps } from "@ark-ui/svelte/splitter";
  import type { SplitterSize } from "@loongark/primitives";

  export let size: SplitterSize = "md";
  export let panels: SplitterRootProps["panels"];
</script>

<Splitter.Root
  {panels}
  data-scope="splitter"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Splitter.Root>
