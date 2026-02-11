<script lang="ts">
  import { ark } from "@ark-ui/svelte";

  export let dense: boolean = false;
  export let align: "start" | "center" = "start";
</script>

<ark.div
  data-scope="filter-bar"
  data-part="root"
  data-dense={dense ? "true" : undefined}
  data-align={align === "center" ? "center" : undefined}
  {...$$restProps}
>
  <slot />
</ark.div>
