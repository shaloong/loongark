<script lang="ts">
  export let active: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {type}
  data-scope="filter-bar"
  data-part="chip"
  data-active={active ? "true" : undefined}
  aria-pressed={active ? "true" : "false"}
  {...$$restProps}
>
  <slot />
</button>
