<script lang="ts">
  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardRootProps } from "@ark-ui/svelte/clipboard";
  import type { ClipboardSize } from "@loongark/primitives";

  export let size: ClipboardSize = "md";
</script>

<Clipboard.Root
  data-scope="clipboard"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Clipboard.Root>
