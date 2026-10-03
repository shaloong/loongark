<script lang="ts">
  import type { ToasterProps } from "@ark-ui/svelte/toast";
  export let toaster: ToasterProps["toaster"];
  export let children: ToasterProps["children"];
  import { Toaster } from "@ark-ui/svelte/toast";
</script>

<Toaster
  {toaster}
  {children}
  data-scope="toast"
  data-part="group"
  {...$$restProps}
/>
