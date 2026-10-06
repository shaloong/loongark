<script lang="ts">
  import { onMount, onDestroy, untrack } from "svelte";
  import { renderCodeEditorMarkup, mountCodeEditor, type CodeEditorProps } from "@loongark/kit";
  let { value = $bindable<CodeEditorProps["value"]>(undefined), onValueChange, ...rest }: CodeEditorProps = $props();
  const uid = $props.id();
  const options = (): CodeEditorProps => ({ ...rest, value, onValueChange(next, selection) {
    if (!onValueChange) value = next;
    onValueChange?.(next, selection);
  } });
  const id = untrack(() => rest.id ?? uid), markup = untrack(() => renderCodeEditorMarkup(options(), id));
  let root: HTMLDivElement, controller: ReturnType<typeof mountCodeEditor> | undefined;
  onMount(() => { controller = mountCodeEditor(root, options); });
  $effect(() => { options(); controller?.sync(); });
  onDestroy(() => { controller?.destroy(); controller = undefined; });
</script>
<div bind:this={root} {id} data-scope="editor" data-kind="code" dir={rest.dir}>{@html markup}</div>
