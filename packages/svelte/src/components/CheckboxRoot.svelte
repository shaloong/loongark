<script lang="ts" module>
  import type { CheckboxSize } from "@loongark/primitives";
  type CheckedState = boolean | "indeterminate";

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
  import {
    Checkbox,
    useCheckbox,
    type CheckboxRootProps as NativeRootProps,
  } from "@ark-ui/svelte/checkbox";
  let {
    children,
    ref = $bindable(null),
    checked = $bindable(),
    size = "md",
    defaultChecked,
    disabled = false,
    invalid = false,
    readOnly = false,
    required = false,
    name,
    value,
    form,
    id,
    ids,
    onCheckedChange,
    ...dom
  }: NativeRootProps & { size?: CheckboxSize } = $props();
  const providedId = $props.id();
  const api = useCheckbox(() => ({
    id: id ?? providedId,
    ids,
    checked,
    defaultChecked,
    disabled,
    invalid,
    readOnly,
    required,
    name,
    value,
    form,
    onCheckedChange(details) {
      if (!onCheckedChange) checked = details.checked;
      onCheckedChange?.(details);
    },
  }));
</script>

<Checkbox.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="checkbox"
  data-part="root"
  data-size={size}
>
  {@render children?.()}
</Checkbox.RootProvider>
