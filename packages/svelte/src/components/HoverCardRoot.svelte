<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";
  import type { HoverCardSize } from "@loongark/primitives";

  export let size: HoverCardSize = "md";
</script>

<HoverCard.Root
  data-scope="hover-card"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</HoverCard.Root>
