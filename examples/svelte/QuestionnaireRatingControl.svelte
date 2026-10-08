<script lang="ts">
  import * as L from "@loongark/svelte";
  import { controlIcons, type QuestionnaireCustomContext } from "@loongark/kit";
  import Registration from "./QuestionnaireRatingRegistration.svelte";
  let {
    context,
    suggest,
  }: {
    context: QuestionnaireCustomContext;
    suggest: (context: QuestionnaireCustomContext) => void;
  } = $props();
  let root: HTMLDivElement | undefined = $state();
</script>

<L.LoongArkStack gap="sm"
  ><div bind:this={root}>
    <L.LoongArkRatingGroupRoot
      value={Number(context.answer) || 0}
      disabled={context.disabled}
      count={5}
      required={context.question.required}
      size={context.question.customKind === "compact-rating" ? "sm" : "md"}
      ids={{ label: context.labelId, control: context.controlId }}
      onValueChange={({ value }) => context.onAnswerChange(String(value))}
    >
      <L.LoongArkRatingGroupControl
        aria-required={context.question.required ? "true" : undefined}
        aria-describedby={context.descriptionId + " " + context.errorId}
        aria-invalid={context.invalid ? "true" : undefined}
      >
        {#each [1, 2, 3, 4, 5] as index}<L.LoongArkRatingGroupItem
            {...Number(context.answer) === 0 && index === 1 && !context.disabled
              ? { tabindex: 0 }
              : {}}
            {index}
            ><L.LoongArkIcon
              icon={controlIcons.star}
              size="lg"
            /></L.LoongArkRatingGroupItem
          >{/each}
      </L.LoongArkRatingGroupControl>
      <Registration {context} element={() => root} />
    </L.LoongArkRatingGroupRoot>
  </div>
  <L.LoongArkButton
    variant="outline"
    size="sm"
    disabled={context.disabled}
    onclick={() => suggest(context)}>Suggest five stars</L.LoongArkButton
  ></L.LoongArkStack
>
