<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";
  registerAutomaticStyles(lkAutomaticSplitterStyles);

  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterPanelProps } from "@ark-ui/svelte/splitter";
  export let id: SplitterPanelProps["id"];
</script>

<Splitter.Panel {id} data-scope="splitter" data-part="panel" {...$$restProps}>
  <slot />
</Splitter.Panel>
