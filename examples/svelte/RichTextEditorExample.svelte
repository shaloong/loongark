<script lang="ts">
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  import * as L from "@loongark/svelte";
  import { createRichTextEditorDemo } from "../shared/editorDemo";
  let version = $state(0);
  const demo = createRichTextEditorDemo(() => queueMicrotask(() => version++));
  const snapshot = $derived.by(() => {
    version;
    return demo.snapshot();
  });
  const actions = $derived.by(() => {
    snapshot;
    return demo.actions.map((action) => ({
      run: action.run,
      label: action.label(),
    }));
  });
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:760px">
  <svelte:element this="style">{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2">Write and revise</L.LoongArkTypography>
  <L.LoongArkStack orientation="horizontal" gap="sm"
    >{#each actions.slice(0, 3) as action}<L.LoongArkButton
        variant="outline"
        on:click={action.run}>{action.label}</L.LoongArkButton
      >{/each}</L.LoongArkStack
  >
  <details data-groups-demo-controls="">
    <summary
      ><L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />More controls</summary
    ><L.LoongArkStack orientation="horizontal" gap="sm"
      >{#each actions.slice(3) as action}<L.LoongArkButton
          variant="outline"
          on:click={action.run}>{action.label}</L.LoongArkButton
        >{/each}</L.LoongArkStack
    >
  </details>
  <form onsubmit={demo.submit} aria-label="Editor form">
    {#if snapshot.shown}<L.LoongArkRichTextEditor
        {...demo.props(snapshot)}
      />{/if}
    <L.LoongArkStack
      orientation="horizontal"
      gap="sm"
      style="margin-top:var(--lk-space-component-md)"
      ><L.LoongArkButton type="submit">Submit document</L.LoongArkButton
      ><L.LoongArkButton type="reset" variant="outline"
        >Reset form</L.LoongArkButton
      ></L.LoongArkStack
    >
  </form>
  <output aria-label="Editor lifecycle"
    >{snapshot.changes} changes · {snapshot.mounted} mounted · {snapshot.destroyed}
    destroyed · {snapshot.aborted} canceled</output
  >
  <output aria-label="Editor extensions"
    >{snapshot.extensionRuns} shortcuts · {snapshot.pluginMounted} plugins mounted
    · {snapshot.pluginDisposed} plugins destroyed · {snapshot.nodeViewsCleaned} node
    views destroyed</output
  >
  <output
    aria-label="Submitted value"
    style="overflow-wrap:anywhere;white-space:pre-wrap"
    >{snapshot.result}</output
  >
</L.LoongArkStack>
