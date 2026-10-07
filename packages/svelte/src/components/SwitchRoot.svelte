<script lang="ts">
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
    disabled = false,
    invalid = false,
    readOnly = false,
    required = false,
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
    label,
    onCheckedChange(details) {
      if (!onCheckedChange) checked = details.checked;
      onCheckedChange?.(details);
    },
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
