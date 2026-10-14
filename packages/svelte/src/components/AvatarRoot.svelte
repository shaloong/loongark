<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAvatarStyles } from "@shaloong/loongark-primitives/automatic-styles/avatar";
  registerAutomaticStyles(lkAutomaticAvatarStyles);

  import { Avatar } from "@ark-ui/svelte/avatar";
  import type { AvatarSize } from "@shaloong/loongark-primitives";

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
