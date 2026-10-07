<script lang="ts">
  import { onMount } from "svelte";
  import { useFieldContext } from "@ark-ui/svelte/field";
  import {
    mountNativeSelection,
    nativeSelectionFieldDescription,
  } from "@loongark/kit";
  import {
    Checkbox,
    useCheckboxContext,
    type CheckboxHiddenInputProps,
  } from "@ark-ui/svelte/checkbox";
  let {
    ref = $bindable(null),
    ...props
  }: Omit<CheckboxHiddenInputProps, "ref"> & { ref?: HTMLInputElement | null } =
    $props();
  const field = useFieldContext();
  const api = useCheckboxContext();
  const description = $derived(
    nativeSelectionFieldDescription(
      props["aria-describedby"],
      field?.(),
      api().getHiddenInputProps()["aria-invalid"],
    ),
  );
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({
          checked: api().checked,
          indeterminate: api().indeterminate,
        }))
      : undefined,
  );
</script>

<Checkbox.HiddenInput
  bind:ref
  {...props}
  aria-describedby={description}
  data-scope="checkbox"
  data-part="hidden-input"
/>
