<script lang="ts">
  import { LoongArkDatePickerRoot as Root, LoongArkDatePickerPositioner as Positioner } from "@loongark/svelte";
  const fail = () => { throw Error("SSR must not emit open changes"); };
</script>

<Root defaultOpen positioning={{ strategy: "fixed" }} onOpenChange={fail}>
  <Positioner data-case="default" style="z-index:1234" />
</Root>
<Root defaultOpen positioning={{ strategy: "fixed" }} onOpenChange={fail}>
  <Positioner data-case="custom" style="transform:translate(17px, 23px);z-index:1234" />
</Root>
