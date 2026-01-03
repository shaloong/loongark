<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";

  export let item: any = undefined;
  export let persistFocus: boolean | undefined = undefined;
</script>

<Select.Item {item} {persistFocus} data-scope="select" data-part="item">
  <slot />
</Select.Item>
