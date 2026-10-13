<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticClipboardStyles } from "@loongark/primitives/automatic-styles/clipboard";
  registerAutomaticStyles(lkAutomaticClipboardStyles);

  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardControlProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Control
  data-scope="clipboard"
  data-part="control"
  {...$$restProps}
>
  <slot />
</Clipboard.Control>
