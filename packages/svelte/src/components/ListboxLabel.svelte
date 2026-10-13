<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@loongark/primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.Label data-scope="listbox" data-part="label" {...$$restProps}>
  <slot />
</Listbox.Label>
