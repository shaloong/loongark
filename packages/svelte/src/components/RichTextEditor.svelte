<script lang="ts">
  import { onMount, onDestroy, untrack } from "svelte";
  import { renderRichTextEditorMarkup, mountRichTextEditor, type RichTextEditorProps } from "@loongark/kit";
  let { value = $bindable<RichTextEditorProps["value"]>(undefined), onValueChange, ...rest }: RichTextEditorProps = $props();
  const uid = $props.id();
  const options = (): RichTextEditorProps => ({ ...rest, value, onValueChange(next) {
    if (!onValueChange) value = next;
    onValueChange?.(next);
  } });
  const id = untrack(() => rest.id ?? uid), markup = untrack(() => renderRichTextEditorMarkup(options(), id));
  let root: HTMLDivElement, controller: ReturnType<typeof mountRichTextEditor> | undefined;
  onMount(() => { controller = mountRichTextEditor(root, options); });
  $effect(() => { options(); controller?.sync(); });
  onDestroy(() => { controller?.destroy(); controller = undefined; });
</script>
<div bind:this={root} {id} data-scope="editor" data-kind="rich" dir={rest.dir}>{@html markup}</div>
