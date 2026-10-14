<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticToastStyles } from "@shaloong/loongark-primitives/automatic-styles/toast";
  registerAutomaticStyles(lkAutomaticToastStyles);

  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.CloseTrigger
  data-scope="toast"
  data-part="close-trigger"
  {...$$restProps}
>
  <slot />
</Toast.CloseTrigger>
