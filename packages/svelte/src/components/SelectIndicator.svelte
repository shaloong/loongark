<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Indicator data-scope="select" data-part="indicator" {...$$restProps}>
  <slot><Icon icon={controlIcons.chevronDown} size="sm" /></slot>
</Select.Indicator>
