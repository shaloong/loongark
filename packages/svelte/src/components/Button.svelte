<script lang="ts">
  import type { ButtonPrimitiveProps } from "@loongark/primitives";

  export let variant: NonNullable<ButtonPrimitiveProps["variant"]> = "solid";
  export let size: NonNullable<ButtonPrimitiveProps["size"]> = "md";
  export let block: boolean = false;
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";

  $: isInteractiveDisabled = disabled || loading;
</script>

<button
  on:click
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
</button>
