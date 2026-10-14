<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticToastStyles } from "@shaloong/loongark-primitives/automatic-styles/toast";
  registerAutomaticStyles(lkAutomaticToastStyles);

  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.Description data-scope="toast" data-part="description" {...$$restProps}>
  <slot />
</Toast.Description>
