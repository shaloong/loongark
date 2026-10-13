<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticToastStyles } from "@loongark/primitives/automatic-styles/toast";
  registerAutomaticStyles(lkAutomaticToastStyles);

  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.ActionTrigger
  data-scope="toast"
  data-part="action-trigger"
  {...$$restProps}
>
  <slot />
</Toast.ActionTrigger>
