<script lang="ts">
  import { Clipboard } from "@ark-ui/svelte/clipboard";
  import type { ClipboardInputProps } from "@ark-ui/svelte/clipboard";
</script>

<Clipboard.Input
  data-scope="clipboard"
  data-part="input"
  {...$$restProps}
/>
