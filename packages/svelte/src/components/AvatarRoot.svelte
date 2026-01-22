<script lang="ts">
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
