<script lang="ts">
  import {
    LoongArkAvatarRoot,
    LoongArkAvatarImage,
    LoongArkAvatarFallback,
  } from "@loongark/svelte";
  import type { AvatarSize } from "@loongark/primitives";

  const DEFAULT_AVATAR_SRC =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='%23D6E4FF'/><circle cx='40' cy='30' r='18' fill='%233A5BCC'/><rect x='16' y='52' width='48' height='18' rx='9' fill='%233A5BCC'/></svg>";

  const getInitials = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "LA";
    }

    return trimmed
      .split(/\s+/)
      .slice(0, 2)
      .map((segment) => segment.charAt(0))
      .join("")
      .toUpperCase();
  };

  export let size: AvatarSize = "md";
  export let name = "Loong Ark";
  export let src: string | undefined = DEFAULT_AVATAR_SRC;

  $: initials = getInitials(name);
</script>

<LoongArkAvatarRoot {size} data-testid="avatar-root">
  {#if src}
    <LoongArkAvatarImage {src} alt={name} data-testid="avatar-image" />
  {/if}
  <LoongArkAvatarFallback data-testid="avatar-fallback">
    {initials}
  </LoongArkAvatarFallback>
</LoongArkAvatarRoot>
