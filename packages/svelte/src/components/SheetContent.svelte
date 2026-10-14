<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSheetStyles } from "@shaloong/loongark-primitives/automatic-styles/sheet";
  registerAutomaticStyles(lkAutomaticSheetStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Content {...$$restProps} data-scope="sheet" data-part="content"
  ><slot /></Dialog.Content
>
