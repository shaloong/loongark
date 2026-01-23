<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
  import type { ComboboxSize } from "@loongark/primitives";
  import { createComboboxSizeContext } from "./comboboxContext";

  export let size: ComboboxSize = "md";

  export let collection: any;
  export let closeOnSelect: boolean = true;
  export let composite: boolean = true;
  export let defaultHighlightedValue: string | undefined = undefined;
  export let defaultOpen: boolean | undefined = undefined;
  export let defaultValue: string[] | undefined = undefined;
  export let defaultInputValue: string | undefined = undefined;
  export let deselectable: boolean | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let form: string | undefined = undefined;
  export let highlightedValue: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let ids: any = undefined;
  export let immediate: boolean | undefined = undefined;
  export let inputValue: string | undefined = undefined;
  export let invalid: boolean | undefined = undefined;
  export let lazyMount: boolean = false;
  export let loopFocus: boolean = false;
  export let multiple: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let onInputValueChange:
    | ((details: { inputValue: string }) => void)
    | undefined = undefined;
  export let onValueChange:
    | ((details: { value: string[] }) => void)
    | undefined = undefined;
  export let open: boolean | undefined = undefined;
  export let positioning: any = undefined;
  export let present: boolean | undefined = undefined;
  export let readOnly: boolean | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let skipAnimationOnMount: boolean = false;
  export let unmountOnExit: boolean = false;
  export let value: string[] | undefined = undefined;

  const sizeStore = createComboboxSizeContext(size);

  $: sizeStore.set(size);
</script>

<Combobox.Root
  {collection}
  {closeOnSelect}
  {composite}
  {defaultHighlightedValue}
  {defaultOpen}
  {defaultValue}
  {defaultInputValue}
  {deselectable}
  {disabled}
  {form}
  {highlightedValue}
  {id}
  {ids}
  {immediate}
  {inputValue}
  {invalid}
  {lazyMount}
  {loopFocus}
  {multiple}
  {name}
  {onInputValueChange}
  {onValueChange}
  {open}
  {positioning}
  {present}
  {readOnly}
  {required}
  {skipAnimationOnMount}
  {unmountOnExit}
  {value}
  data-scope="combobox"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Combobox.Root>
