<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemIndicator
  data-scope="select"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot><Icon icon={controlIcons.check} size="sm" /></slot>
</Select.ItemIndicator>
