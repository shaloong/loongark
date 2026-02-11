<script lang="ts">
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
