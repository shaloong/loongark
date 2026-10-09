<script lang="ts">
  import { LoongArkFieldset, LoongArkField } from "@loongark/svelte";
</script>

<LoongArkFieldset.Root>
  <LoongArkFieldset.Legend>联系方式</LoongArkFieldset.Legend>
  <LoongArkFieldset.HelperText>请填写联系信息。</LoongArkFieldset.HelperText>
  <LoongArkField.Root>
    <LoongArkField.Label>姓名</LoongArkField.Label>
    <LoongArkField.Input name="name" />
  </LoongArkField.Root>
</LoongArkFieldset.Root>
