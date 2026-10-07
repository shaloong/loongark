<script lang="ts">
  import { onMount } from "svelte";
  import { mountNativeSelection } from "@loongark/kit";
  import {
    RadioGroup,
    useRadioGroupContext,
    useRadioGroupItemContext,
    type RadioGroupItemHiddenInputProps,
  } from "@ark-ui/svelte/radio-group";
  let {
    ref = $bindable(null),
    disabled,
    ...props
  }: Omit<RadioGroupItemHiddenInputProps, "ref"> & {
    ref?: HTMLInputElement | null;
  } = $props();
  const api = useRadioGroupContext();
  const item = useRadioGroupItemContext();
  const inputDisabled = $derived(item().disabled || !!disabled);
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({
          radioValue: api().value,
          readOnly: String(api().getRootProps()["aria-readonly"]) === "true",
        }))
      : undefined,
  );
</script>

<RadioGroup.ItemHiddenInput bind:ref {...props} disabled={inputDisabled} />
