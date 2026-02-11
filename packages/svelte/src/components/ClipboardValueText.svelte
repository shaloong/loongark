<script lang="ts">
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
