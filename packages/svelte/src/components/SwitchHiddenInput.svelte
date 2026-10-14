<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSwitchStyles } from "@shaloong/loongark-primitives/automatic-styles/switch";
  registerAutomaticStyles(lkAutomaticSwitchStyles);

  import { onMount } from "svelte";
  import { useFieldContext } from "@ark-ui/svelte/field";
  import {
    mountNativeSelection,
    nativeSelectionFieldDescription,
  } from "@shaloong/loongark-kit";
  import {
    Switch,
    useSwitchContext,
    type SwitchHiddenInputProps,
  } from "@ark-ui/svelte/switch";
  let {
    ref = $bindable(null),
    ...props
  }: Omit<SwitchHiddenInputProps, "ref"> & { ref?: HTMLInputElement | null } =
    $props();
  const field = useFieldContext();
  const api = useSwitchContext();
  const description = $derived(
    nativeSelectionFieldDescription(
      props["aria-describedby"],
      field?.(),
      api().getHiddenInputProps()["aria-invalid"],
    ),
  );
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({ checked: api().checked }))
      : undefined,
  );
</script>

<Switch.HiddenInput bind:ref {...props} aria-describedby={description} />
