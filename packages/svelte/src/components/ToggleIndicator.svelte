<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticToggleStyles } from "@loongark/primitives/automatic-styles/toggle";
  registerAutomaticStyles(lkAutomaticToggleStyles);

  import { Toggle } from "@ark-ui/svelte/toggle";
</script>

<Toggle.Indicator data-scope="toggle" data-part="indicator" {...$$restProps}>
  <slot />
</Toggle.Indicator>
