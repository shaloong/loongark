<script lang="ts" module>
  import type { CheckboxSize } from "@shaloong/loongark-primitives";
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
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@shaloong/loongark-primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { nativeSelectionProps } from "@shaloong/loongark-kit";
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
    disabled,
    invalid,
    readOnly,
    required,
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
    ...nativeSelectionProps({
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
      onCheckedChange(
        details: Parameters<NonNullable<NativeRootProps["onCheckedChange"]>>[0],
      ) {
        if (!onCheckedChange) checked = details.checked;
        onCheckedChange?.(details);
      },
    }),
    id: id ?? providedId,
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
