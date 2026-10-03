<script lang="ts">
  export let dense: boolean = false;
  export let align: "start" | "center" = "start";
</script>

<div
  data-scope="filter-bar"
  data-part="root"
  data-dense={dense ? "true" : undefined}
  data-align={align === "center" ? "center" : undefined}
  {...$$restProps}
>
  <slot />
</div>
