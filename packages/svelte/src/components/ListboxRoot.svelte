<script lang="ts" generics="T extends object">
  import type { ListboxRootProps } from "@ark-ui/svelte/listbox";
  import { Listbox } from "@ark-ui/svelte/listbox";
  import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

  export let size: ListboxSize = "md";
  export let orientation: ListboxOrientation = "vertical";
  export let collection: ListboxRootProps<T>["collection"];
  export let defaultValue: string[] | undefined = undefined;
  export let value: string[] | undefined = undefined;
  export let multiple: boolean | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let loopFocus: boolean | undefined = undefined;
  export let id: string | undefined = undefined;
  export let onValueChange:
    ((details: { value: string[] }) => void) | undefined = undefined;
</script>

<Listbox.Root
  {collection}
  {defaultValue}
  {value}
  selectionMode={multiple ? "multiple" : "single"}
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
