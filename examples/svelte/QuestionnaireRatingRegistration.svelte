<script lang="ts">
  import { untrack } from "svelte";
  import type { QuestionnaireCustomContext } from "@loongark/kit";
  let {
    context,
    element,
  }: {
    context: QuestionnaireCustomContext;
    element: () => HTMLElement | undefined;
  } = $props();
  $effect(() => {
    const current = context,
      root = element();
    if (!root) return;
    return untrack(() =>
      current.registerControl({
        element: root,
        focus: () =>
          root
            .querySelector<HTMLElement>('[role="radio"][tabindex="0"]')
            ?.focus(),
      }),
    );
  });
</script>
