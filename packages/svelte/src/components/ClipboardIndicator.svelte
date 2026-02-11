<script lang="ts">
  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardIndicatorProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Indicator
  data-scope="clipboard"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Clipboard.Indicator>
