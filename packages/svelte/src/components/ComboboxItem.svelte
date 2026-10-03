<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";

  export let item: object;
  export let persistFocus: boolean | undefined = undefined;
</script>

<Combobox.Item
  {item}
  {persistFocus}
  data-scope="combobox"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Combobox.Item>
