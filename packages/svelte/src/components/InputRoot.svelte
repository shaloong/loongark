<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
  import { ark } from "@ark-ui/svelte";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let multiline: boolean = false;
  export let variant: "default" | "floating" = "default";
  export let hasValue: boolean = false;
</script>

<Field.Root
  {disabled}
  {readOnly}
  data-lk-input-wrapper=""
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled || undefined}
  data-multiline={multiline || undefined}
  data-variant={variant === "floating" ? "floating" : undefined}
  data-has-value={variant === "floating" && hasValue ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</Field.Root>
