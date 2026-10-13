<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticClipboardStyles } from "@loongark/primitives/automatic-styles/clipboard";
  registerAutomaticStyles(lkAutomaticClipboardStyles);

  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardIndicatorProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Indicator
  data-scope="clipboard"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Clipboard.Indicator>
