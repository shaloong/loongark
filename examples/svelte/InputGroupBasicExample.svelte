<script lang="ts">
  import {
    LoongArkInputRoot,
    LoongArkInputLabel,
    LoongArkInputGroup,
    LoongArkInputPrefix,
    LoongArkInputControl,
  } from "@shaloong/loongark-svelte";
</script>

<LoongArkInputRoot>
  <LoongArkInputLabel>网站</LoongArkInputLabel>
  <LoongArkInputGroup>
    <LoongArkInputPrefix>https://</LoongArkInputPrefix>
    <LoongArkInputControl name="website" placeholder="example.com" />
  </LoongArkInputGroup>
</LoongArkInputRoot>
