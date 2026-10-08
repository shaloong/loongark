<script lang="ts">
  import {
    getContext,
    getAllContexts,
    mount,
    unmount,
    tick,
    type Component,
    type Snippet,
  } from "svelte";
  import type { Readable } from "svelte/store";
  import type { LoongArkTheme } from "@loongark/theme";
  let {
    disabled = false,
    container,
    children,
  }: {
    disabled?: boolean;
    container?: HTMLElement;
    children?: Snippet;
  } = $props();
  const theme = getContext<Readable<LoongArkTheme> | undefined>(
      "loongark-theme",
    ),
    context = getAllContexts();
  $effect(() => {
    const target =
        container ??
        (theme ? $theme?.getPortalContainer() : undefined) ??
        globalThis.document?.body,
      content = children;
    if (disabled || !target || !content) return;
    let active = true,
      instance: ReturnType<typeof mount> | undefined;
    tick().then(() => {
      if (active && target.isConnected)
        instance = mount(content as unknown as Component, { target, context });
    });
    return () => {
      active = false;
      if (instance) void unmount(instance);
    };
  });
</script>

{#if disabled && children}{@render children()}{/if}
