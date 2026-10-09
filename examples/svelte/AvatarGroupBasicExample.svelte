<script lang="ts">
  import {
    LoongArkAvatarGroup,
    LoongArkAvatarRoot,
    LoongArkAvatarFallback,
    LoongArkAvatarGroupOverflow,
  } from "@loongark/svelte";
</script>

<LoongArkAvatarGroup aria-label="项目成员">
  <LoongArkAvatarRoot>
    <LoongArkAvatarFallback>LA</LoongArkAvatarFallback>
  </LoongArkAvatarRoot>
  <LoongArkAvatarRoot>
    <LoongArkAvatarFallback>JL</LoongArkAvatarFallback>
  </LoongArkAvatarRoot>
  <LoongArkAvatarGroupOverflow>+3</LoongArkAvatarGroupOverflow>
</LoongArkAvatarGroup>
