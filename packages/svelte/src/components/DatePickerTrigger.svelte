<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@shaloong/loongark-primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Trigger
  data-scope="date-picker"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.Trigger>
