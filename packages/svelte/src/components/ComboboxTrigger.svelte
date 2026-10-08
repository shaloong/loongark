<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Trigger data-scope="combobox" data-part="trigger" {...$$restProps}>
  <slot><Icon icon={controlIcons.chevronDown} size="sm" /></slot>
</Combobox.Trigger>
