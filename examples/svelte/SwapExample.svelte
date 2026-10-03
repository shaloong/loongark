<script lang="ts">
  import * as L from "@loongark/svelte";
  let expanded = $state(false),
    mounted = $state(true);
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px"
  ><L.LoongArkTypography as="h2"
    >Change a control indicator</L.LoongArkTypography
  ><L.LoongArkTypography variant="muted"
    >Two indicators share the same slot. Hidden content stays out of keyboard
    navigation.</L.LoongArkTypography
  ><L.LoongArkButton variant="outline" onclick={() => (mounted = !mounted)}
    >{mounted ? "Unmount control" : "Mount control"}</L.LoongArkButton
  >
  {#if mounted}<L.LoongArkButton
      aria-expanded={expanded}
      aria-controls="swap-details"
      onclick={() => (expanded = !expanded)}
      ><L.LoongArkSwapRoot swap={expanded} lazyMount unmountOnExit
        ><L.LoongArkSwapIndicator type="off"
          >Show details</L.LoongArkSwapIndicator
        ><L.LoongArkSwapIndicator type="on"
          >Hide details</L.LoongArkSwapIndicator
        ></L.LoongArkSwapRoot
      ></L.LoongArkButton
    ><L.LoongArkPresence present={expanded} lazyMount unmountOnExit
      ><section id="swap-details" aria-label="Details">
        <p>One control, one accessible name, and a consistent layout.</p>
        <L.LoongArkButton variant="outline">Details action</L.LoongArkButton>
      </section></L.LoongArkPresence
    >{/if}
</L.LoongArkStack>
