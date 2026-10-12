<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticAvatarStyles } from "@loongark/primitives/automatic-styles/avatar";
  registerAutomaticStyles(lkAutomaticAvatarStyles);

  import { Avatar } from "@ark-ui/svelte/avatar";
</script>

<Avatar.Fallback data-scope="avatar" data-part="fallback" {...$$restProps}>
  <slot />
</Avatar.Fallback>
