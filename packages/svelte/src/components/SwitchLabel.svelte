<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSwitchStyles } from "@shaloong/loongark-primitives/automatic-styles/switch";
  registerAutomaticStyles(lkAutomaticSwitchStyles);

  import { Switch } from "@ark-ui/svelte/switch";

  export let disabled: boolean = false;
</script>

<Switch.Label
  data-scope="switch"
  data-part="label"
  data-disabled={disabled || undefined}
  {...$$restProps}
>
  <slot />
</Switch.Label>
