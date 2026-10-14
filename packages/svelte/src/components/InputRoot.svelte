<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@shaloong/loongark-primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

  import { Field } from "@ark-ui/svelte/field";
  import type { InputPrimitiveProps } from "@shaloong/loongark-primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let multiline: boolean = false;
  export let variant: "default" | "floating" = "default";
  export let hasValue: boolean = false;
</script>

<Field.Root
  invalid={state === "invalid"}
  {disabled}
  {readOnly}
  data-scope="input"
  data-part="root"
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
