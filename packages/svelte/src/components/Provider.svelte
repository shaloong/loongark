<script lang="ts">
  import { setContext, onDestroy, untrack, type Snippet } from "svelte";
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
    nonce,
    children,
  }: CreateThemeOptions & { children?: Snippet } = $props();
  let scope = $state<HTMLDivElement>();
  // SSR 初值只取一次；后续 props 更新由下面的 effect 管理和清理。
  const initialTheme = untrack(() =>
    createLoongArkTheme({
      mode,
      brand,
      accent,
      overrides,
      targetId: targetId ?? scopeId,
      motionPreference,
      nonce,
    }),
  );
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
      nonce,
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
