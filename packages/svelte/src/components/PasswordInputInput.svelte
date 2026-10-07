<script lang="ts">
  import { useFieldContext } from "@ark-ui/svelte/field";
  import {
    PasswordInput,
    usePasswordInputContext,
    type PasswordInputInputProps,
  } from "@ark-ui/svelte/password-input";
  import { nativeSelectionFieldDescription } from "@loongark/kit";
  import type {
    PasswordInputSize,
    PasswordInputState,
  } from "@loongark/primitives";
  let {
    size = "md",
    state = "default",
    disabled,
    readOnly,
    readonly: nativeReadOnly,
    ref = $bindable(null),
    ...props
  }: Omit<PasswordInputInputProps, "size" | "ref"> & {
    size?: PasswordInputSize;
    state?: PasswordInputState;
    readOnly?: boolean;
    ref?: HTMLInputElement | null;
  } = $props();
  const field = useFieldContext();
  const api = usePasswordInputContext();
  const isDisabled = $derived(disabled ?? !!api().getInputProps().disabled);
  const isReadOnly = $derived(
    readOnly ?? nativeReadOnly ?? !!api().getInputProps().readonly,
  );
</script>

<PasswordInput.Input
  bind:ref
  {...props}
  disabled={isDisabled}
  readonly={isReadOnly}
  aria-describedby={nativeSelectionFieldDescription(
    props["aria-describedby"],
    field?.(),
    api().getInputProps()["aria-invalid"],
  )}
  data-scope="password-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={isDisabled ? "true" : undefined}
  data-readonly={isReadOnly ? "true" : undefined}
/>
