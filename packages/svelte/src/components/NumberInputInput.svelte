<script lang="ts">
  import { useFieldContext } from "@ark-ui/svelte/field";
  import {
    NumberInput,
    useNumberInputContext,
    type NumberInputInputProps,
  } from "@ark-ui/svelte/number-input";
  import {
    nativeSelectionFieldDescription,
    mountNativeSelection,
  } from "@loongark/kit";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";
  let {
    size = "md",
    state = "default",
    disabled,
    readOnly,
    readonly: nativeReadOnly,
    ref = $bindable(null),
    ...props
  }: Omit<NumberInputInputProps, "size" | "ref"> & {
    size?: NumberInputSize;
    state?: NumberInputState;
    readOnly?: boolean;
    ref?: HTMLInputElement | null;
  } = $props();
  const field = useFieldContext();
  const api = useNumberInputContext();
  const isDisabled = $derived(disabled ?? !!api().getInputProps().disabled);
  const isReadOnly = $derived(
    readOnly ?? nativeReadOnly ?? !!api().getInputProps().readonly,
  );
  $effect(() => {
    const input = ref;
    return input
      ? mountNativeSelection(
          input,
          () => ({
            formValue: String(api().getInputProps().value ?? ""),
            readOnly: input.readOnly,
          }),
          { syncOnInput: true },
        )
      : undefined;
  });
</script>

<NumberInput.Input
  bind:ref
  {...props}
  disabled={isDisabled}
  readonly={isReadOnly}
  aria-describedby={nativeSelectionFieldDescription(
    props["aria-describedby"],
    field?.(),
    api().getInputProps()["aria-invalid"],
  )}
  data-scope="number-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={isDisabled ? "true" : undefined}
  data-readonly={isReadOnly ? "true" : undefined}
/>
