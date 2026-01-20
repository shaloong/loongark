<script lang="ts">
  import { PinInput } from "@ark-ui/svelte/pin-input";
  import type { PinInputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<PinInputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<PinInputPrimitiveProps["state"]> = "default";
  export let disabled: boolean = false;
  export let value: string[] | undefined = undefined;
  export let defaultValue: string[] | undefined = undefined;
  export let onValueChange: ((details: { value: string[]; valueAsString: string }) => void) | undefined = undefined;
  export let onValueComplete: ((details: { value: string[]; valueAsString: string }) => void) | undefined = undefined;
  export let type: "alphanumeric" | "numeric" | "alphabetic" | undefined = undefined;
  export let mask: boolean | undefined = undefined;
  export let otp: boolean | undefined = undefined;
  export let placeholder: string | undefined = undefined;
</script>

<PinInput.Root
  {disabled}
  {value}
  {defaultValue}
  {onValueChange}
  {onValueComplete}
  {type}
  {mask}
  {otp}
  {placeholder}
  data-scope="pin-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled || undefined}
  {...$$restProps}
>
  <slot />
</PinInput.Root>
