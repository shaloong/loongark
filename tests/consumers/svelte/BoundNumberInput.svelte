<script lang="ts">
  import * as L from "@loongark/svelte";
  let value = $state<string | undefined>(undefined),
    ref = $state<HTMLInputElement | null>(null),
    mounted = $state(true),
    readOnly = $state(false);
</script>

<form
  aria-label="Fresh number binding"
  style="display:grid;gap:var(--lk-space-component-md)"
>
  {#if mounted}<L.LoongArkFieldRoot {readOnly}>
      <L.LoongArkNumberInputRoot
        name="fresh-amount"
        defaultValue="3"
        bind:value
      >
        <L.LoongArkNumberInputLabel>Bound quantity</L.LoongArkNumberInputLabel>
        <L.LoongArkNumberInputControl
          ><L.LoongArkNumberInputInput
            bind:ref
          /><L.LoongArkNumberInputIncrementTrigger
          /></L.LoongArkNumberInputControl
        >
      </L.LoongArkNumberInputRoot>
    </L.LoongArkFieldRoot>{/if}
  <L.LoongArkButton type="button" variant="outline" onclick={() => (value = "")}
    >Clear bound quantity</L.LoongArkButton
  >
  <L.LoongArkButton
    type="button"
    variant="outline"
    onclick={() => (readOnly = !readOnly)}
    >Read only bound quantity</L.LoongArkButton
  >
  <L.LoongArkButton type="button" variant="outline" onclick={() => ref?.focus()}
    >Focus bound quantity</L.LoongArkButton
  >
  <L.LoongArkButton
    type="button"
    variant="outline"
    onclick={() => (mounted = !mounted)}>Mount bound quantity</L.LoongArkButton
  >
  <output aria-label="Bound number state"
    >{JSON.stringify({ value, refReady: !!ref?.isConnected })}</output
  >
</form>
