<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";

  export let item: any = undefined;
  export let disabled: boolean | undefined = undefined;
</script>

<Listbox.Item
  {item}
  {disabled}
  data-scope="listbox"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Listbox.Item>
