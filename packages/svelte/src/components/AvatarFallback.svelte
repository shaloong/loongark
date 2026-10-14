<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAvatarStyles } from "@shaloong/loongark-primitives/automatic-styles/avatar";
  registerAutomaticStyles(lkAutomaticAvatarStyles);

  import { Avatar } from "@ark-ui/svelte/avatar";
</script>

<Avatar.Fallback data-scope="avatar" data-part="fallback" {...$$restProps}>
  <slot />
</Avatar.Fallback>
