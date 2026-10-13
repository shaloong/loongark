<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticToastStyles } from "@loongark/primitives/automatic-styles/toast";
  registerAutomaticStyles(lkAutomaticToastStyles);

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
