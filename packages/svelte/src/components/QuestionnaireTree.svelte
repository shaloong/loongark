<script lang="ts">
  import type { LoongArkQuestionnaireRenderers } from "./questionnaire-custom.types";
  import type { QuestionnaireRenderNode } from "@loongark/kit";
  let {
    node,
    renderers,
  }: {
    node: QuestionnaireRenderNode;
    renderers: LoongArkQuestionnaireRenderers;
  } = $props();
</script>

{#snippet tree(current: QuestionnaireRenderNode)}
  {#if current.kind === "text"}{current.text}
  {:else if current.kind === "html"}<div data-part="advanced-answer">
      {@html current.html}
    </div>
  {:else if current.kind === "custom"}{@render renderers[
      current.context.question.customKind!
    ](current.context)}
  {:else if current.tag === "input"}<input {...current.attrs} />
  {:else}<svelte:element this={current.tag} {...current.attrs}
      >{#each current.children as child (child.key)}{@render tree(
          child,
        )}{/each}</svelte:element
    >{/if}
{/snippet}
{@render tree(node)}
