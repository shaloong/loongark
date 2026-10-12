<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticFilterDividerStyles } from "@loongark/primitives/automatic-styles/filter-divider";
  registerAutomaticStyles(lkAutomaticFilterDividerStyles);

</script>

<span
  role="presentation"
  aria-hidden="true"
  data-scope="filter-bar"
  data-part="divider"
  {...$$restProps}
></span>
