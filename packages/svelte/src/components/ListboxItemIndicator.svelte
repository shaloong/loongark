<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemIndicator
  data-scope="listbox"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Listbox.ItemIndicator>
