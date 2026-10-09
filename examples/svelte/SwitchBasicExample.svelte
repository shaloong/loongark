<script lang="ts">
  import {
    LoongArkSwitchRoot,
    LoongArkSwitchLabel,
    LoongArkSwitchControl,
    LoongArkSwitchThumb,
    LoongArkSwitchHiddenInput,
  } from "@loongark/svelte";
</script>

<LoongArkSwitchRoot name="notifications">
  <LoongArkSwitchLabel>接收通知</LoongArkSwitchLabel>
  <LoongArkSwitchControl>
    <LoongArkSwitchThumb />
  </LoongArkSwitchControl>
  <LoongArkSwitchHiddenInput />
</LoongArkSwitchRoot>
