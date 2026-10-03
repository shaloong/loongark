<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { LoongArkSwitch } from "@loongark/svelte";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled = false;
  export let label = "通知提醒";
  let checked = false;
  const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();
</script>

<LoongArkSwitch.Root
  {size}
  {disabled}
  {checked}
  name="notifications"
  onCheckedChange={(details) => {
    checked = details.checked;
    dispatch("change", details);
  }}
  data-testid="switch-root"
  ><LoongArkSwitch.Control data-testid="switch-control"
    ><LoongArkSwitch.Thumb data-testid="switch-thumb" /></LoongArkSwitch.Control
  ><LoongArkSwitch.Label data-testid="switch-label"
    >{label}</LoongArkSwitch.Label
  ><LoongArkSwitch.HiddenInput /></LoongArkSwitch.Root
>
