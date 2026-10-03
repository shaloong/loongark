<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";
  import type { HoverCardSize } from "@loongark/primitives";

  export let size: HoverCardSize = "md";
</script>

<HoverCard.Root {...$$restProps}>
  <div data-scope="hover-card" data-part="root" data-size={size}><slot /></div>
</HoverCard.Root>
