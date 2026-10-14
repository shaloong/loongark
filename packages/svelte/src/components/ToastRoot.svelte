<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticToastStyles } from "@shaloong/loongark-primitives/automatic-styles/toast";
  registerAutomaticStyles(lkAutomaticToastStyles);

  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.Root data-scope="toast" data-part="root" {...$$restProps}>
  <slot />
</Toast.Root>
