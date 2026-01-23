<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemText
  data-scope="combobox"
  data-part="item-text"
  {...$$restProps}
>
  <slot />
</Combobox.ItemText>
