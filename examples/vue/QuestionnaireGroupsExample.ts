import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  groupsDisclosureIcon,
  groupsDisclosureCSS,
  createQuestionnaireGroupsDemo,
} from "../shared/questionnaireGroupsDemo";
export const QuestionnaireGroupsExample = defineComponent({
  setup() {
    const revision = ref(0),
      demo = createQuestionnaireGroupsDemo(() => revision.value++);
    return () => {
      revision.value;
      const snapshot = demo.snapshot;
      const button = (label: string, onClick: () => void) =>
        h(L.LoongArkButton, { variant: "outline", onClick }, () => label);
      return h(
        L.LoongArkStack,
        { gap: "md", style: { maxWidth: "640px", width: "100%" } },
        () => [
          h("style", {}, groupsDisclosureCSS),
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Keep your contacts together",
          ),
          h("details", { "data-groups-demo-controls": "" }, [
            h("summary", {}, [
              h(L.LoongArkIcon, { icon: groupsDisclosureIcon, size: "sm" }),
              "More controls",
            ]),
            h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
              button(
                snapshot.reject ? "Accept updates" : "Reject updates",
                demo.toggleReject,
              ),
              button(
                snapshot.disabled ? "Enable survey" : "Disable survey",
                demo.toggleDisabled,
              ),
              button(
                snapshot.shown ? "Hide survey" : "Show survey",
                demo.toggleShown,
              ),
              button("Reset survey", demo.reset),
              button(
                snapshot.advanced
                  ? "Hide advanced questions"
                  : "Show advanced questions",
                demo.toggleAdvanced,
              ),
              button(
                snapshot.async
                  ? "Use synchronous validation"
                  : "Use async validation",
                demo.toggleAsync,
              ),
              button("Restart internal answers", demo.internal),
              button(
                snapshot.strict
                  ? "Allow any priority order"
                  : "Require clarity first",
                demo.toggleStrict,
              ),
              button(
                snapshot.minimum === 2
                  ? "Require one contact"
                  : "Require two contacts",
                demo.toggleMinimum,
              ),
            ]),
          ]),
          snapshot.shown &&
            h(L.LoongArkQuestionnaire, {
              label: "Contact review",
              questions: snapshot.questions,
              key: snapshot.revision,
              value: snapshot.controlled ? snapshot.value : undefined,
              defaultValue: snapshot.value,
              disabled: snapshot.disabled,
              completed: !!snapshot.saved,
              onValueChange: demo.change,
              onComplete: demo.complete,
            }),
          h(
            "output",
            { "aria-label": "Contact updates" },
            `${snapshot.callbacks} callbacks`,
          ),
          h(
            "output",
            {
              "aria-label": "Saved contact answers",
              style: {
                minWidth: 0,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              },
            },
            snapshot.saved
              ? JSON.stringify(snapshot.saved)
              : "No answers saved",
          ),
        ],
      );
    };
  },
});
