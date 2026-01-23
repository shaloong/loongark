<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
  import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

  export let size: ListboxSize = "md";
  export let orientation: ListboxOrientation = "vertical";
  export let collection: any = undefined;
  export let defaultValue: string[] | undefined = undefined;
  export let value: string[] | undefined = undefined;
  export let multiple: boolean | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let loopFocus: boolean | undefined = undefined;
  export let id: string | undefined = undefined;
  export let onValueChange: ((details: { value: string[] }) => void) | undefined =
    undefined;
</script>

<Listbox.Root
  {collection}
  {defaultValue}
  {value}
  {multiple}
  {disabled}
  {loopFocus}
  {id}
  {onValueChange}
  {orientation}
  data-scope="listbox"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Listbox.Root>
