<script lang="ts">
  import { Avatar } from "@ark-ui/svelte/avatar";
</script>

<Avatar.Fallback data-scope="avatar" data-part="fallback" {...$$restProps}>
  <slot />
</Avatar.Fallback>
