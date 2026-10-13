<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@loongark/primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemGroup data-scope="listbox" data-part="item-group" {...$$restProps}>
  <slot />
</Listbox.ItemGroup>
