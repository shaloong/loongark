<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticFilterDividerStyles } from "@shaloong/loongark-primitives/automatic-styles/filter-divider";
  registerAutomaticStyles(lkAutomaticFilterDividerStyles);

</script>

<span
  role="presentation"
  aria-hidden="true"
  data-scope="filter-bar"
  data-part="divider"
  {...$$restProps}
></span>
