import { defineComponent, h, ref, computed, onBeforeUnmount } from "vue";
import * as L from "@loongark/vue";
import { createQuestionnaireCustomDemo } from "../shared/questionnaireCustomDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { QuestionnaireRatingControl } from "./QuestionnaireRatingControl";
export const QuestionnaireCustomExample = defineComponent({
  setup() {
    const revision = ref(0),
      demo = createQuestionnaireCustomDemo(() => revision.value++),
      snapshot = computed(() => {
        revision.value;
        return demo.snapshot;
      });
    onBeforeUnmount(() => demo.dispose());
    const rating: L.LoongArkQuestionnaireRenderers[string] = (context) =>
      h(QuestionnaireRatingControl, { context, suggest: demo.suggest });
    const renderers = { rating, "compact-rating": rating };
    return () =>
      h(
        L.LoongArkStack,
        { gap: "md", style: { maxWidth: "640px", width: "100%" } },
        {
          default: () => [
            h("style", null, groupsDisclosureCSS),
            h(
              L.LoongArkTypography,
              { as: "h2" },
              { default: () => "Give your experience a rating" },
            ),
            h("details", { "data-groups-demo-controls": "" }, [
              h("summary", null, [
                h(L.LoongArkIcon, { icon: groupsDisclosureIcon, size: "sm" }),
                "More controls",
              ]),
              h(
                L.LoongArkStack,
                { orientation: "horizontal", gap: "sm" },
                {
                  default: () => [
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleReject },
                      {
                        default: () =>
                          snapshot.value.reject
                            ? "Accept updates"
                            : "Reject updates",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleDisabled },
                      {
                        default: () =>
                          snapshot.value.disabled
                            ? "Enable survey"
                            : "Disable survey",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleShown },
                      {
                        default: () =>
                          snapshot.value.shown ? "Hide survey" : "Show survey",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleNested },
                      {
                        default: () =>
                          snapshot.value.nested
                            ? "Use standalone question"
                            : "Use nested questions",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleCompact },
                      {
                        default: () =>
                          snapshot.value.compact
                            ? "Use standard renderer"
                            : "Use compact renderer",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.toggleAsync },
                      {
                        default: () =>
                          snapshot.value.async
                            ? "Use synchronous validation"
                            : "Use async validation",
                      },
                    ),
                    h(
                      L.LoongArkButton,
                      { variant: "outline", onClick: demo.reset },
                      { default: () => "Reset survey" },
                    ),
                  ],
                },
              ),
            ]),
            snapshot.value.shown
              ? h(L.LoongArkQuestionnaire, {
                  key: snapshot.value.revision,
                  label: "Experience review",
                  questions: snapshot.value.questions,
                  value: snapshot.value.value,
                  disabled: snapshot.value.disabled,
                  completed: !!snapshot.value.saved,
                  renderers,
                  onValueChange: demo.change,
                  onComplete: demo.complete,
                })
              : null,
            h(
              "output",
              { "aria-label": "Rating updates" },
              snapshot.value.callbacks + " callbacks",
            ),
            h(
              "output",
              { "aria-label": "Saved rating answers" },
              snapshot.value.saved
                ? JSON.stringify(snapshot.value.saved)
                : "No answers saved",
            ),
          ],
        },
      );
  },
});
