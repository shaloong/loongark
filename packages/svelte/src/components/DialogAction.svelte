<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
  import type { ComponentProps } from "svelte";
  const componentId = $props.id();
  let {
    id = componentId,
    children,
    ...props
  }: ComponentProps<typeof Dialog.CloseTrigger> = $props();
</script>

<Dialog.CloseTrigger
  {...props}
  {id}
  data-scope="button"
  data-part="root"
  data-variant="solid"
  data-size="md"
  >{#if children}{@render children()}{/if}</Dialog.CloseTrigger
>
