<script lang="ts">
  import { onMount } from "svelte";
  import { mountNativeSelection } from "@loongark/kit";
  import { Switch, useSwitchContext } from "@ark-ui/svelte/switch";
  export let ref: HTMLInputElement | null = null;
  const api = useSwitchContext();
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({ checked: api().checked }))
      : undefined,
  );
</script>

<Switch.HiddenInput bind:ref {...$$restProps} />
