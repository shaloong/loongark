<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipContentProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipContentProps> = {};
</script>

<Tooltip.Content
  {...props}
  data-scope="tooltip"
  data-part="content"
  data-interactive={props.interactive ? "true" : undefined}
>
  <slot />
</Tooltip.Content>
