<script lang="ts">
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
