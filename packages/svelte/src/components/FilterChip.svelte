<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticFilterChipStyles } from "@loongark/primitives/automatic-styles/filter-chip";
  registerAutomaticStyles(lkAutomaticFilterChipStyles);

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
