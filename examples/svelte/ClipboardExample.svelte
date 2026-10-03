<script lang="ts">
  import {
    LoongArkClipboardRoot,
    LoongArkClipboardLabel,
    LoongArkClipboardControl,
    LoongArkClipboardInput,
    LoongArkClipboardTrigger,
    LoongArkClipboardIndicator,
    LoongArkClipboardValueText,
  } from "@loongark/svelte";
  import type { ClipboardSize } from "@loongark/primitives";

  export let size: ClipboardSize = "md";
  export let disabled = false;

  let value = "https://loongark.dev";

  const handleInput = (event: Event) => {
    value = (event.currentTarget as HTMLInputElement).value;
  };
</script>

<LoongArkClipboardRoot {size} {value}>
  <LoongArkClipboardLabel>Share link</LoongArkClipboardLabel>
  <LoongArkClipboardControl>
    <LoongArkClipboardInput {value} oninput={handleInput} readonly={disabled} />
    <LoongArkClipboardTrigger {disabled}>Copy</LoongArkClipboardTrigger>
  </LoongArkClipboardControl>
  <LoongArkClipboardIndicator>Copied</LoongArkClipboardIndicator>
  <LoongArkClipboardValueText>{value}</LoongArkClipboardValueText>
</LoongArkClipboardRoot>
