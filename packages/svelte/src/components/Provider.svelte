<script lang="ts">
  import { setContext, onDestroy, type Snippet } from "svelte";
  import { writable } from "svelte/store";
  import {
    createLoongArkTheme,
    type CreateThemeOptions,
  } from "@loongark/theme";
  import { bootstrapKit } from "@loongark/kit/bootstrap";
  const scopeId = $props.id();
  let {
    mode = "light",
    brand,
    accent,
    overrides,
    targetId,
    motionPreference = "auto",
    children,
  }: CreateThemeOptions & { children?: Snippet } = $props();
  let scope = $state<HTMLDivElement>();
  const initialTheme = createLoongArkTheme({
    mode,
    brand,
    accent,
    overrides,
    targetId: targetId ?? scopeId,
    motionPreference,
  });
  let theme = $state(initialTheme);
  const store = writable(initialTheme);
  setContext("loongark-theme", store);
  $effect(() => {
    if (!scope) return;
    const next = createLoongArkTheme({
      mode,
      brand,
      accent,
      overrides,
      targetId: targetId ?? scopeId,
      motionPreference,
    });
    theme = next;
    next.mount(scope);
    bootstrapKit(next);
    store.set(next);
    return () => next.unmount();
  });
  onDestroy(() => theme.unmount());
</script>

<div bind:this={scope} data-lk-theme={theme.id} style="display: contents">
  {#if children}{@render children()}{/if}
</div>
