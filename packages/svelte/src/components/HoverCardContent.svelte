<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardContentProps } from "@ark-ui/svelte/hover-card";
</script>

<HoverCard.Content
  data-scope="hover-card"
  data-part="content"
  {...$$restProps}
>
  <slot />
</HoverCard.Content>
