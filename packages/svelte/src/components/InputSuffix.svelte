<script lang="ts">
  export let action: "clear" | "button" | "none" | "text" = "none";

  $: isAction = action === "clear" || action === "button";
</script>

{#if isAction}
  <button
    type="button"
    data-scope="input"
    data-part="suffix"
    data-action="clear"
    {...$$restProps}
  >
    <slot />
  </button>
{:else}
  <span data-scope="input" data-part="suffix" {...$$restProps}>
    <slot />
  </span>
{/if}
