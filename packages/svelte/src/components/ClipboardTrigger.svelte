<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticClipboardStyles } from "@shaloong/loongark-primitives/automatic-styles/clipboard";
  registerAutomaticStyles(lkAutomaticClipboardStyles);

  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardTriggerProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Trigger
  data-scope="clipboard"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</Clipboard.Trigger>
