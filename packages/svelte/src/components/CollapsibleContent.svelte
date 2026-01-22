<script lang="ts">
  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Content
  data-scope="collapsible"
  data-part="content"
  {...$$restProps}
>
  <slot />
</Collapsible.Content>
