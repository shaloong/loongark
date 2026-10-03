<script lang="ts">
  import { onMount, tick } from "svelte";
  import {
    layoutAttributes,
    mountTextareaAutosize,
    textareaRows,
  } from "@loongark/kit";
  export let value: string | undefined = undefined;
  export let autoSize = false;
  export let minRows: number | undefined = undefined;
  export let maxRows: number | undefined = undefined;
  let element: HTMLTextAreaElement;
  let controller: ReturnType<typeof mountTextareaAutosize> | undefined;
  onMount(() => {
    controller = mountTextareaAutosize(element, () => ({
      autoSize,
      minRows,
      maxRows,
    }));
    return () => controller?.destroy();
  });
  $: {
    value;
    autoSize;
    minRows;
    maxRows;
    tick().then(() => controller?.update());
  }
</script>

<textarea
  {...layoutAttributes("Textarea")}
  {...$$restProps}
  bind:this={element}
  bind:value
  data-autosize={autoSize ? "true" : undefined}
  rows={autoSize ? textareaRows({ minRows, maxRows }).min : $$restProps.rows}
  on:input
  on:change
  on:focus
  on:blur></textarea>
