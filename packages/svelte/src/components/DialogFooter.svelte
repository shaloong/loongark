<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

</script>

<footer data-scope="dialog" data-part="footer" {...$$restProps}>
  <slot />
</footer>
