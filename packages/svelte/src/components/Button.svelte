<script lang="ts">
  import { ark } from "@ark-ui/svelte";
  import type { ButtonPrimitiveProps } from "@loongark/primitives";

  export let variant: NonNullable<ButtonPrimitiveProps["variant"]> = "solid";
  export let size: NonNullable<ButtonPrimitiveProps["size"]> = "md";
  export let block: boolean = false;
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";

  $: isInteractiveDisabled = disabled || loading;
</script>

<ark.button
  {type}
  disabled={isInteractiveDisabled}
  aria-disabled={isInteractiveDisabled || undefined}
  aria-busy={loading || undefined}
  data-scope="button"
  data-part="root"
  data-variant={variant}
  data-size={size}
  data-block={block || undefined}
  data-loading={loading || undefined}
  data-disabled={isInteractiveDisabled || undefined}
  {...$$restProps}
>
  <slot />
</ark.button>
