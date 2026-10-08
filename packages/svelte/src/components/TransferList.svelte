<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import {
    transferView,
    moveTransferItems,
    toggleTransferSelection,
    toggleTransferSide,
    focusTransferredItem,
    type TransferItem,
    type TransferListOptions,
  } from "@loongark/kit";
  export let items: readonly TransferItem[] = [];
  export let value: readonly string[] | undefined = undefined;
  export let defaultValue: readonly string[] = [];
  export let disabled = false;
  export let name: string | undefined = undefined;
  export let leftLabel = "Available";
  export let rightLabel = "Selected";
  export let emptyLabel = "No items";
  export let onValueChange: TransferListOptions["onValueChange"] = undefined;
  let internal: readonly string[] = defaultValue,
    selection: string[] = [],
    status = "",
    root: HTMLDivElement;
  $: view = transferView(items, value ?? internal, selection);
  $: panels = [
    {
      side: "left",
      label: leftLabel,
      rows: view.left,
      selected: view.leftSelected,
    },
    {
      side: "right",
      label: rightLabel,
      rows: view.right,
      selected: view.rightSelected,
    },
  ];
  function move(direction: "left" | "right") {
    const details = moveTransferItems(items, view.value, selection, direction);
    if (!details.moved.length || disabled) return;
    if (value === undefined) internal = details.value;
    else value = details.value;
    selection = selection.filter((key) => !details.moved.includes(key));
    onValueChange?.(details);
    status =
      details.moved.length +
      " item(s) moved to " +
      (direction === "right" ? rightLabel : leftLabel);
    focusTransferredItem(root, details);
  }
</script>

<div
  data-scope="transfer-list"
  data-part="root"
  {...$$restProps}
  bind:this={root}
>
  {#each panels as panel}
    {@const all =
      panel.rows.some((item) => !item.disabled) &&
      panel.selected.length ===
        panel.rows.filter((item) => !item.disabled).length}
    {#if panel.side === "right"}<div
        data-scope="transfer-list"
        data-part="actions"
      >
        <button
          data-scope="transfer-list"
          data-part="move"
          type="button"
          aria-label={"Move selected to " + rightLabel}
          disabled={disabled || !view.leftSelected.length}
          on:click={() => move("right")}
          ><Icon icon={controlIcons.arrowRight} mirrorInRtl /></button
        ><button
          data-scope="transfer-list"
          data-part="move"
          type="button"
          aria-label={"Move selected to " + leftLabel}
          disabled={disabled || !view.rightSelected.length}
          on:click={() => move("left")}
          ><Icon icon={controlIcons.arrowLeft} mirrorInRtl /></button
        >
      </div>{/if}
    <fieldset
      data-scope="transfer-list"
      data-part="panel"
      data-side={panel.side}
      {disabled}
    >
      <legend data-scope="transfer-list" data-part="legend"
        >{panel.label}</legend
      >
      <div data-scope="transfer-list" data-part="toolbar">
        <span
          >{panel.selected.length} / {panel.rows.filter(
            (item) => !item.disabled,
          ).length} selected</span
        ><button
          data-scope="transfer-list"
          data-part="select-all"
          type="button"
          disabled={disabled || !panel.rows.some((item) => !item.disabled)}
          aria-label={(all ? "Clear selection in " : "Select all in ") +
            panel.label}
          on:click={() =>
            (selection = toggleTransferSide(selection, panel.rows))}
          >{all ? "Clear" : "Select all"}</button
        >
      </div>
      <ul data-scope="transfer-list" data-part="list">
        {#each panel.rows as item (item.value)}<li>
            <label
              data-scope="transfer-list"
              data-part="item"
              data-selected={selection.includes(item.value)
                ? "true"
                : undefined}
              data-disabled={disabled || item.disabled ? "true" : undefined}
              ><input
                type="checkbox"
                value={item.value}
                checked={selection.includes(item.value)}
                disabled={disabled || item.disabled}
                on:change={() =>
                  (selection = toggleTransferSelection(selection, item.value))}
              /><span data-scope="transfer-list" data-part="item-text"
                ><span>{item.label}</span>{#if item.description}<span
                    data-scope="transfer-list"
                    data-part="description">{item.description}</span
                  >{/if}</span
              ></label
            >
          </li>{:else}<li data-scope="transfer-list" data-part="empty">
            {emptyLabel}
          </li>{/each}
      </ul>
    </fieldset>
  {/each}
  {#if name}{#each view.value as key (key)}<input
        type="hidden"
        {name}
        value={key}
        {disabled}
      />{/each}{/if}
  <div
    data-scope="transfer-list"
    data-part="status"
    role="status"
    aria-live="polite"
  >
    {status}
  </div>
</div>
