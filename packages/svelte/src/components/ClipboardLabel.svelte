<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticClipboardStyles } from "@shaloong/loongark-primitives/automatic-styles/clipboard";
  registerAutomaticStyles(lkAutomaticClipboardStyles);

  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardLabelProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Label
  data-scope="clipboard"
  data-part="label"
  {...$$restProps}
>
  <slot />
</Clipboard.Label>
