<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@loongark/primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";

  export let item: object;
</script>

<Listbox.Item {item} data-scope="listbox" data-part="item" {...$$restProps}>
  <slot />
</Listbox.Item>
