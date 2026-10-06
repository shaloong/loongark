import { useEffect, useRef } from "react";
import * as L from "@loongark/react";
import { controlIcons, type QuestionnaireCustomContext } from "@loongark/kit";
function Registration({
  context,
  element,
}: {
  context: QuestionnaireCustomContext;
  element: () => HTMLElement | null;
}) {
  useEffect(() => {
    const root = element();
    if (!root) return;
    return context.registerControl({
      element: root,
      focus: () =>
        root
          .querySelector<HTMLElement>('[role="radio"][tabindex="0"]')
          ?.focus(),
    });
  }, [context, element]);
  return null;
}
export function QuestionnaireRatingControl({
  context,
  suggest,
}: {
  context: QuestionnaireCustomContext;
  suggest: (context: QuestionnaireCustomContext) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  return (
    <L.LoongArkStack gap="sm">
      <div ref={root}>
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
            {[1, 2, 3, 4, 5].map((index) => (
              <L.LoongArkRatingGroupItem
                {...(Number(context.answer) === 0 &&
                index === 1 &&
                !context.disabled
                  ? { tabIndex: 0 }
                  : {})}
                index={index}
                key={index}
              >
                <L.LoongArkIcon icon={controlIcons.star} size="lg" />
              </L.LoongArkRatingGroupItem>
            ))}
          </L.LoongArkRatingGroupControl>
          <Registration context={context} element={() => root.current} />
        </L.LoongArkRatingGroupRoot>
      </div>
      <L.LoongArkButton
        variant="outline"
        size="sm"
        disabled={context.disabled}
        onClick={() => suggest(context)}
      >
        Suggest five stars
      </L.LoongArkButton>
    </L.LoongArkStack>
  );
}
