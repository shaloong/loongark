<script lang="ts">
  import {
    LoongArkRadioGroupRoot,
    LoongArkRadioGroupLabel,
    LoongArkRadioGroupItem,
    LoongArkRadioGroupItemControl,
    LoongArkRadioGroupItemText,
    LoongArkRadioGroupItemHiddenInput,
  } from "@shaloong/loongark-svelte";
</script>

<LoongArkRadioGroupRoot name="plan" defaultValue="basic">
  <LoongArkRadioGroupLabel>方案</LoongArkRadioGroupLabel>
  <LoongArkRadioGroupItem value="basic">
    <LoongArkRadioGroupItemControl />
    <LoongArkRadioGroupItemText>基础</LoongArkRadioGroupItemText>
    <LoongArkRadioGroupItemHiddenInput />
  </LoongArkRadioGroupItem>
  <LoongArkRadioGroupItem value="pro">
    <LoongArkRadioGroupItemControl />
    <LoongArkRadioGroupItemText>专业</LoongArkRadioGroupItemText>
    <LoongArkRadioGroupItemHiddenInput />
  </LoongArkRadioGroupItem>
</LoongArkRadioGroupRoot>
