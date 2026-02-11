<script lang="ts">
  import {
    LoongArkHoverCardRoot,
    LoongArkHoverCardTrigger,
    LoongArkHoverCardPositioner,
    LoongArkHoverCardContent,
    LoongArkHoverCardArrow,
    LoongArkHoverCardArrowTip,
  } from "@loongark/svelte";
  import type { HoverCardSize } from "@loongark/primitives";

  export let size: HoverCardSize = "md";
</script>

<LoongArkHoverCardRoot {size} openDelay={200}>
  <LoongArkHoverCardTrigger>Hover details</LoongArkHoverCardTrigger>
  <LoongArkHoverCardPositioner>
    <LoongArkHoverCardContent>
      <div style="display: grid; gap: 6px;">
        <strong>@loongark</strong>
        <span style="opacity: 0.7;">Design-ready UI primitives.</span>
      </div>
      <LoongArkHoverCardArrow>
        <LoongArkHoverCardArrowTip />
      </LoongArkHoverCardArrow>
    </LoongArkHoverCardContent>
  </LoongArkHoverCardPositioner>
</LoongArkHoverCardRoot>
