<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { useFieldContext } from "@ark-ui/svelte/field";
  import { inputSuffixDisabled } from "@loongark/kit";
  let {
    disabled,
    action = "none",
    children,
    ...props
  }: HTMLAttributes<HTMLSpanElement> & {
    disabled?: boolean;
    action?: "clear" | "button" | "none" | "text";
    children?: Snippet;
  } = $props();
  const field = useFieldContext();
  const isAction = $derived(action === "clear" || action === "button");
  const isDisabled = $derived(inputSuffixDisabled(action, disabled, field?.()));
</script>

{#if isAction}
  <button
    type="button"
    data-scope="input"
    data-part="suffix"
    data-action={action}
    {...props}
    disabled={isDisabled}
  >
    {@render children?.()}
  </button>
{:else}
  <span data-scope="input" data-part="suffix" {...props}>
    {@render children?.()}
  </span>
{/if}
