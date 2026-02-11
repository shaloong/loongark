<script lang="ts">
  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardRootProps } from "@ark-ui/svelte/clipboard";
  import type { ClipboardSize } from "@loongark/primitives";

  export let size: ClipboardSize = "md";
  export let disabled: ClipboardRootProps["disabled"] = undefined;
</script>

<Clipboard.Root
  {disabled}
  data-scope="clipboard"
  data-part="root"
  data-size={size}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</Clipboard.Root>
