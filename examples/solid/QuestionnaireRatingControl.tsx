/** @jsxImportSource solid-js */
import { onMount, onCleanup } from "solid-js";
import * as L from "@loongark/solid";
import { controlIcons, type QuestionnaireCustomContext } from "@loongark/kit";
function Registration(props: {
  context: QuestionnaireCustomContext;
  element: () => HTMLElement;
}) {
  onMount(() =>
    onCleanup(
      props.context.registerControl({
        element: props.element(),
        focus: () =>
          props
            .element()
            .querySelector<HTMLElement>('[role="radio"][tabindex="0"]')
            ?.focus(),
      }),
    ),
  );
  return null;
}
export function QuestionnaireRatingControl(props: {
  context: QuestionnaireCustomContext;
  suggest: (context: QuestionnaireCustomContext) => void;
}) {
  let root!: HTMLDivElement;
  return (
    <L.LoongArkStack gap="sm">
      <div ref={root}>
        <L.LoongArkRatingGroupRoot
          value={Number(props.context.answer) || 0}
          disabled={props.context.disabled}
          count={5}
          required={props.context.question.required}
          size={
            props.context.question.customKind === "compact-rating" ? "sm" : "md"
          }
          ids={{
            label: props.context.labelId,
            control: props.context.controlId,
          }}
          onValueChange={({ value }) =>
            props.context.onAnswerChange(String(value))
          }
        >
          <L.LoongArkRatingGroupControl
            aria-required={props.context.question.required ? "true" : undefined}
            aria-describedby={
              props.context.descriptionId + " " + props.context.errorId
            }
            aria-invalid={props.context.invalid ? "true" : undefined}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <L.LoongArkRatingGroupItem
                {...(Number(props.context.answer) === 0 &&
                index === 1 &&
                !props.context.disabled
                  ? { tabIndex: 0 }
                  : {})}
                index={index}
              >
                <L.LoongArkIcon icon={controlIcons.star} size="lg" />
              </L.LoongArkRatingGroupItem>
            ))}
          </L.LoongArkRatingGroupControl>
          <Registration context={props.context} element={() => root} />
        </L.LoongArkRatingGroupRoot>
      </div>
      <L.LoongArkButton
        variant="outline"
        size="sm"
        disabled={props.context.disabled}
        onClick={() => props.suggest(props.context)}
      >
        Suggest five stars
      </L.LoongArkButton>
    </L.LoongArkStack>
  );
}
