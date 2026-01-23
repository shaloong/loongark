<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemGroup
  data-scope="combobox"
  data-part="item-group"
  {...$$restProps}
>
  <slot />
</Combobox.ItemGroup>
