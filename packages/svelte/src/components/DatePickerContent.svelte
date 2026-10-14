<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@shaloong/loongark-primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import { getDatePickerSize } from "./datePickerContext";

  const sizeStore = getDatePickerSize();
</script>

<DatePicker.Content
  data-scope="date-picker"
  data-part="content"
  data-size={$sizeStore}
  {...$$restProps}
>
  <slot />
</DatePicker.Content>
