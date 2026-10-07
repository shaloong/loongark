<script lang="ts">
  import { onMount } from "svelte";
  import { mountNativeSelection } from "@loongark/kit";
  import { useCheckboxContext } from "@ark-ui/svelte/checkbox";
  export let ref: HTMLInputElement | null = null;
  const api = useCheckboxContext();
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({
          checked: api().checked,
          indeterminate: api().indeterminate,
        }))
      : undefined,
  );
  import { CheckboxHiddenInput } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  $: dataAttrs = getDataAttrs("checkbox", "hidden-input");
</script>

<CheckboxHiddenInput bind:ref {...$$restProps} {...dataAttrs} />
