<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
  import type { SelectSize } from "@loongark/primitives";
  import { createSelectSizeContext } from "./selectContext";

  export let size: SelectSize = "md";

  // 导出所有 Ark UI Select Root 支持的属性
  export let collection: any;
  export let closeOnSelect: boolean = true;
  export let composite: boolean = true;
  export let defaultHighlightedValue: string | undefined = undefined;
  export let defaultOpen: boolean | undefined = undefined;
  export let defaultValue: string[] | undefined = undefined;
  export let deselectable: boolean | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let form: string | undefined = undefined;
  export let highlightedValue: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let ids: any = undefined;
  export let immediate: boolean | undefined = undefined;
  export let invalid: boolean | undefined = undefined;
  export let lazyMount: boolean = false;
  export let loopFocus: boolean = false;
  export let multiple: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let open: boolean | undefined = undefined;
  export let positioning: any = undefined;
  export let present: boolean | undefined = undefined;
  export let readOnly: boolean | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let scrollToIndexFn: any = undefined;
  export let skipAnimationOnMount: boolean = false;
  export let unmountOnExit: boolean = false;
  export let value: string[] | undefined = undefined;

  const sizeStore = createSelectSizeContext(size);

  $: sizeStore.set(size);
</script>

<Select.Root
  {collection}
  {closeOnSelect}
  {composite}
  {defaultHighlightedValue}
  {defaultOpen}
  {defaultValue}
  {deselectable}
  {disabled}
  {form}
  {highlightedValue}
  {id}
  {ids}
  {immediate}
  {invalid}
  {lazyMount}
  {loopFocus}
  {multiple}
  {name}
  {open}
  {positioning}
  {present}
  {readOnly}
  {required}
  {scrollToIndexFn}
  {skipAnimationOnMount}
  {unmountOnExit}
  {value}
  data-scope="select"
  data-part="root"
  data-size={size}
>
  <slot />
</Select.Root>
