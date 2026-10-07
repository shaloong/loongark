<script lang="ts">
  import * as L from "@loongark/svelte";
  let agreement = $state<boolean | "indeterminate" | undefined>();
  let notifications = $state<boolean | undefined>();
  let density = $state<string | null | undefined>();
  let frameworks = $state<string[] | undefined>();
</script>

<form aria-label="Fresh selection bindings" style="display:grid;gap:16px">
  <L.LoongArkCheckboxRoot name="fresh-agreement" bind:checked={agreement}>
    <L.LoongArkCheckboxControl
      ><L.LoongArkCheckboxIndicator /></L.LoongArkCheckboxControl
    >
    <L.LoongArkCheckboxLabel>Fresh agreement</L.LoongArkCheckboxLabel>
    <L.LoongArkCheckboxHiddenInput />
  </L.LoongArkCheckboxRoot>
  <L.LoongArkSwitchRoot name="fresh-notifications" bind:checked={notifications}>
    <L.LoongArkSwitchControl><L.LoongArkSwitchThumb /></L.LoongArkSwitchControl>
    <L.LoongArkSwitchLabel>Fresh notifications</L.LoongArkSwitchLabel>
    <L.LoongArkSwitchHiddenInput />
  </L.LoongArkSwitchRoot>
  <L.LoongArkRadioGroupRoot
    name="fresh-density"
    defaultValue="compact"
    bind:value={density}
  >
    <L.LoongArkRadioGroupLabel>Fresh density</L.LoongArkRadioGroupLabel>
    {#each ["compact", "comfortable"] as value}
      <L.LoongArkRadioGroupItem {value}>
        <L.LoongArkRadioGroupItemControl />
        <L.LoongArkRadioGroupItemText>{value}</L.LoongArkRadioGroupItemText>
        <L.LoongArkRadioGroupItemHiddenInput />
      </L.LoongArkRadioGroupItem>
    {/each}
  </L.LoongArkRadioGroupRoot>
  <L.LoongArkTagsInputRoot name="fresh-frameworks" bind:value={frameworks}>
    <L.LoongArkTagsInputLabel>Fresh frameworks</L.LoongArkTagsInputLabel>
    <L.LoongArkTagsInputControl>
      {#each frameworks ?? [] as value, index}
        <L.LoongArkTagsInputItem {value} {index}>
          <L.LoongArkTagsInputItemText>{value}</L.LoongArkTagsInputItemText>
        </L.LoongArkTagsInputItem>
      {/each}
      <L.LoongArkTagsInputInput />
    </L.LoongArkTagsInputControl>
    <L.LoongArkTagsInputHiddenInput />
  </L.LoongArkTagsInputRoot>
</form>

<!-- 父状态观察放在表单外，避免原生 output.reset 覆盖响应式文本。 -->
<output aria-label="Bound fresh selections"
    >{JSON.stringify({ agreement, notifications, density, frameworks })}</output
  >
