<script lang="ts" context="module">
  import type { CheckboxSize } from "@loongark/primitives";
  import type { CheckedState } from "@ark-ui/svelte/checkbox";

  export interface CheckboxRootProps {
    size?: CheckboxSize;
    checked?: CheckedState;
    defaultChecked?: CheckedState;
    disabled?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onCheckedChange?: (details: { checked: CheckedState }) => void;
  }

  export interface CheckboxControlProps {
    size?: CheckboxSize;
  }

  export interface CheckboxIndicatorProps {
    indeterminate?: boolean;
  }
</script>

<script lang="ts">
  import { CheckboxRoot } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  type $$Props = CheckboxRootProps;

  export let size: CheckboxSize = "md";
  export let checked: CheckedState | undefined = undefined;
  export let defaultChecked: CheckedState | undefined = undefined;
  export let disabled: boolean = false;
  export let invalid: boolean = false;
  export let readOnly: boolean = false;
  export let required: boolean = false;
  export let name: string | undefined = undefined;
  export let value: string | undefined = undefined;
  export let onCheckedChange:
    | ((details: { checked: CheckedState }) => void)
    | undefined = undefined;

  $: dataAttrs = getDataAttrs("checkbox", "root", { size });
</script>

<CheckboxRoot
  {checked}
  {defaultChecked}
  {disabled}
  {invalid}
  {readOnly}
  {required}
  {name}
  {value}
  {onCheckedChange}
  {...dataAttrs}
>
  <slot />
</CheckboxRoot>
