<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@shaloong/loongark-primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.ViewControl
  data-scope="date-picker"
  data-part="view-control"
  {...$$restProps}
>
  <slot />
</DatePicker.ViewControl>
