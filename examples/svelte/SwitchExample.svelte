<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    loongArkSwitchRoot,
    loongArkSwitchControl,
    loongArkSwitchThumb,
    loongArkSwitchLabel,
  } from "@loongark/svelte";

  export let size: "sm" | "md" | "lg" = "md";
  export let disabled = false;
  export let label = "通知提醒";
  const dispatch = createEventDispatcher();
  let checked = false;

  const handleChange = (event: CustomEvent<{ checked: boolean }>) => {
    checked = event.detail.checked;
    dispatch("change", { checked });
  };
</script>

<div
  use:loongArkSwitchRoot={{ size, disabled }}
  data-testid="switch-root"
  aria-disabled={disabled}
>
  <button
    type="button"
    use:loongArkSwitchControl={{ size, disabled }}
    aria-pressed={checked}
    on:checkedChange={handleChange}
    data-testid="switch-control"
  >
    <span use:loongArkSwitchThumb={{ size }} data-testid="switch-thumb" />
  </button>
  <span use:loongArkSwitchLabel={{ disabled }} data-testid="switch-label">{label}</span>
  <input type="hidden" value={checked ? "on" : "off"} />
</div>
