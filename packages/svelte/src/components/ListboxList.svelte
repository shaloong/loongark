<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";
  registerAutomaticStyles(lkAutomaticListboxStyles);

  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.Content data-scope="listbox" data-part="list" {...$$restProps}>
  <slot />
</Listbox.Content>
