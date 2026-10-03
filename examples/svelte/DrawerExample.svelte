<script lang="ts">
  import * as L from "@loongark/svelte";
  import DrawerPanel from "./DrawerPanel.svelte";
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px"
  ><L.LoongArkTypography as="h2">An interactive drawer</L.LoongArkTypography
  ><L.LoongArkTypography variant="muted"
    >Drag the handle between two snap points, or down to dismiss. Escape
    restores focus to the trigger.</L.LoongArkTypography
  >
  <L.LoongArkDrawerStack><DrawerPanel /></L.LoongArkDrawerStack>
</L.LoongArkStack>
