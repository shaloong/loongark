<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticAvatarStyles } from "@loongark/primitives/automatic-styles/avatar";
  registerAutomaticStyles(lkAutomaticAvatarStyles);

  import { Avatar } from "@ark-ui/svelte/avatar";
  import type { AvatarSize } from "@loongark/primitives";

  export let size: AvatarSize = "md";
</script>

<Avatar.Root
  data-scope="avatar"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Avatar.Root>
