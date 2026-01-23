<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";

  export let item: any = undefined;
  export let disabled: boolean | undefined = undefined;
  export let persistFocus: boolean | undefined = undefined;
</script>

<Combobox.Item
  {item}
  {disabled}
  {persistFocus}
  data-scope="combobox"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Combobox.Item>
