<script lang="ts">
  import { onMount, untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    fabAttributes,
    speedDialActions,
    mountSpeedDial,
    type SpeedDialOptions,
  } from "@loongark/kit";
  let {
    label,
    actions,
    direction = "up",
    disabled = false,
    open = $bindable<boolean | undefined>(undefined),
    defaultOpen = false,
    onOpenChange,
    onSelect,
    ...attrs
  }: SpeedDialOptions & HTMLAttributes<HTMLDivElement> = $props();
  const uid = $props.id();
  let root = $state<HTMLDivElement>(),
    internal = $state(untrack(() => defaultOpen));
  const available = $derived(speedDialActions(actions)),
    opened = $derived(!disabled && available.length > 0 && (open ?? internal));
  function change(next: boolean) {
    if (next && (disabled || !available.length)) return;
    if (next === opened) return;
    if (open === undefined) internal = next;
    else open = next;
    onOpenChange?.({ open: next });
  }
  function select(value: string) {
    if (disabled) return;
    onSelect?.({ value });
    change(false);
    root?.querySelector<HTMLButtonElement>("[data-part=trigger]")?.focus();
  }
  onMount(() => (root ? mountSpeedDial(root, change) : undefined));
</script>

<div
  data-scope="speed-dial"
  data-part="root"
  data-state={opened ? "open" : "closed"}
  data-direction={direction}
  {...attrs}
  bind:this={root}
>
  <button
    {...fabAttributes()}
    data-scope="speed-dial"
    data-part="trigger"
    type="button"
    aria-label={label}
    aria-haspopup="menu"
    aria-expanded={opened}
    aria-controls={uid}
    disabled={disabled || !available.length}
    onclick={() => change(!opened)}
    ><span data-scope="speed-dial" data-part="icon" aria-hidden="true">＋</span
    ></button
  >
  <ul
    data-scope="speed-dial"
    data-part="actions"
    id={uid}
    role="menu"
    aria-label={label}
    aria-orientation={direction === "left" || direction === "right"
      ? "horizontal"
      : "vertical"}
    hidden={!opened}
  >
    {#each actions as a (a.value)}<li role="none">
        <button
          data-scope="speed-dial"
          data-part="action"
          role="menuitem"
          type="button"
          tabindex="-1"
          disabled={disabled || a.disabled}
          onclick={() => select(a.value)}
          ><span aria-hidden="true">{a.icon ?? "•"}</span>{a.label}</button
        >
      </li>{/each}
  </ul>
</div>
