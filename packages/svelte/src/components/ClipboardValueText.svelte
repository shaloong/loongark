<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticClipboardStyles } from "@shaloong/loongark-primitives/automatic-styles/clipboard";
  registerAutomaticStyles(lkAutomaticClipboardStyles);

  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardValueTextProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.ValueText
  data-scope="clipboard"
  data-part="value-text"
  {...$$restProps}
>
  <slot />
</Clipboard.ValueText>
