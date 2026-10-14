<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";
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
