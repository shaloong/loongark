<script lang="ts">
  import {
    JsonTreeView,
    type JsonTreeViewRootProps,
  } from "@ark-ui/svelte/json-tree-view";
  import { useEnvironmentContext } from "@ark-ui/svelte/environment";
  import { jsonRootAttributes } from "@loongark/kit";
  import { useJsonTreeView } from "./use-json-tree-view.svelte.js";
  let {
    children,
    ref = $bindable(null),
    expandedValue = $bindable<string[]>(),
    selectedValue = $bindable<string[]>(),
    focusedValue = $bindable<string>(),
    checkedValue = $bindable<string[]>(),
    ...props
  }: JsonTreeViewRootProps = $props();
  const providedId = $props.id();
  const environment = useEnvironmentContext();
  const tree = useJsonTreeView(() => ({
    ...props,
    id: props.id ?? providedId,
    expandedValue,
    selectedValue,
    focusedValue,
    checkedValue,
    onExpandedChange(details) {
      props.onExpandedChange?.(details);
      expandedValue = details.expandedValue;
    },
    onSelectionChange(details) {
      props.onSelectionChange?.(details);
      selectedValue = details.selectedValue;
    },
    onFocusChange(details) {
      props.onFocusChange?.(details);
      focusedValue = details.focusedValue;
    },
    onCheckedChange(details) {
      props.onCheckedChange?.(details);
      checkedValue = details.checkedValue;
    },
  }));
  $effect(() => {
    const id = tree().getRootProps().id;
    const root = environment().getRootNode();
    const win = environment().getWindow();
    ref =
      id &&
      (root instanceof win.Document ||
        root instanceof win.ShadowRoot ||
        root instanceof win.Element)
        ? root.querySelector<HTMLElement>(`#${win.CSS.escape(id)}`)
        : null;
    return () => {
      ref = null;
    };
  });
</script>

<JsonTreeView.RootProvider {...jsonRootAttributes(props)} value={tree}
  >{@render children?.()}</JsonTreeView.RootProvider
>
