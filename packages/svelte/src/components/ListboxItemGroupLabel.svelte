<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@loongark/primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemGroupLabel
  data-scope="listbox"
  data-part="item-group-label"
  {...$$restProps}
>
  <slot />
</Listbox.ItemGroupLabel>
