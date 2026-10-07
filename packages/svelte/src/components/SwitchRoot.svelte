<script lang="ts">
  import { nativeSelectionProps } from "@loongark/kit";
  import {
    Switch,
    useSwitch,
    type SwitchRootProps,
  } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@loongark/primitives";
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
    label,
    onCheckedChange,
    ...dom
  }: SwitchRootProps & SwitchPrimitiveProps = $props();
  const providedId = $props.id();
  const api = useSwitch(() => ({
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
      label,
      onCheckedChange(
        details: Parameters<NonNullable<SwitchRootProps["onCheckedChange"]>>[0],
      ) {
        if (!onCheckedChange) checked = details.checked;
        onCheckedChange?.(details);
      },
    }),
    id: id ?? providedId,
  }));
</script>

<Switch.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="switch"
  data-part="root"
  data-size={size}
  data-disabled={disabled || undefined}
>
  {@render children?.()}
</Switch.RootProvider>
