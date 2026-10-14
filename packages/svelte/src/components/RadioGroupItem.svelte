<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticRadioGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/radio-group";
  registerAutomaticStyles(lkAutomaticRadioGroupStyles);

  import { RadioGroup } from "@ark-ui/svelte/radio-group";

  export let value: string;
  export let disabled: boolean = false;
  export let invalid: boolean = false;
</script>

<RadioGroup.Item {value} {disabled} {invalid} {...$$restProps}>
  <slot />
</RadioGroup.Item>
