<script lang="ts">
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
