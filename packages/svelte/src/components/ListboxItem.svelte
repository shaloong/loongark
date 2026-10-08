<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";

  export let item: object;
</script>

<Listbox.Item {item} data-scope="listbox" data-part="item" {...$$restProps}>
  <slot />
</Listbox.Item>
