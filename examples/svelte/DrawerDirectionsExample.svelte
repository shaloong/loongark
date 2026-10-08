<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    drawerDirections,
    drawerDirectionsCSS,
  } from "../shared/drawerDirectionsDemo";
  import DrawerDirectionsPanel from "./DrawerDirectionsPanel.svelte";
</script>

<svelte:element this={"style"}>{drawerDirectionsCSS}</svelte:element>
<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">Drawers from every edge</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Logical start and end mirror in right-to-left layouts. Native drag, snap
    points and keyboard focus share one contract.</L.LoongArkTypography
  >
  {#each ["ltr", "rtl"] as const as dir}
    <L.LoongArkLocaleProvider locale={dir === "rtl" ? "ar-EG" : "en-US"}>
      <section {dir} aria-label={dir.toUpperCase()}>
        <L.LoongArkStack gap="md"
          ><L.LoongArkTypography as="h3"
            >{dir.toUpperCase()}</L.LoongArkTypography
          >
          <L.LoongArkDrawerStack
            ><div
              style="display:flex;gap:var(--lk-space-component-sm);flex-wrap:wrap"
            >
              {#each drawerDirections as direction}<DrawerDirectionsPanel
                  {direction}
                  {dir}
                />{/each}
            </div></L.LoongArkDrawerStack
          >
        </L.LoongArkStack>
      </section>
    </L.LoongArkLocaleProvider>
  {/each}
</L.LoongArkStack>
