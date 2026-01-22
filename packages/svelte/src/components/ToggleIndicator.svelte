<script lang="ts">
  import { Toggle } from "@ark-ui/svelte/toggle";
</script>

<Toggle.Indicator data-scope="toggle" data-part="indicator" {...$$restProps}>
  <slot />
</Toggle.Indicator>
