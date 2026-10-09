<script lang="ts">
  import {
    LoongArkInputRoot,
    LoongArkInputLabel,
    LoongArkInputControl,
    LoongArkInputHelperText,
  } from "@loongark/svelte";
</script>

<LoongArkInputRoot>
  <LoongArkInputLabel>邮箱</LoongArkInputLabel>
  <LoongArkInputControl
    name="email"
    type="email"
    placeholder="name@example.com"
  />
  <LoongArkInputHelperText>用于接收通知。</LoongArkInputHelperText>
</LoongArkInputRoot>
