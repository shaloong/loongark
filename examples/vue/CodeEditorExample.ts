import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { createCodeEditorDemo } from "../shared/editorDemo";
export const CodeEditorExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createCodeEditorDemo(() => version.value++);
    return () => {
      version.value;
      const state = demo.snapshot();
      const buttons = (start: number, end?: number) =>
        h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () =>
          demo.actions
            .slice(start, end)
            .map((action) =>
              h(
                L.LoongArkButton,
                { variant: "outline", onClick: action.run },
                () => action.label(),
              ),
            ),
        );
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "760px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Code workspace"),
          buttons(0, 3),
          h("details", [h("summary", "More controls"), buttons(3)]),
          h("form", { onSubmit: demo.submit, "aria-label": "Editor form" }, [
            state.shown ? h(L.LoongArkCodeEditor, demo.props(state)) : null,
            h(
              L.LoongArkStack,
              {
                orientation: "horizontal",
                gap: "sm",
                style: { marginTop: "var(--lk-space-component-md)" },
              },
              () => [
                h(
                  L.LoongArkButton,
                  { type: "submit" },
                  () => "Submit document",
                ),
                h(
                  L.LoongArkButton,
                  { type: "reset", variant: "outline" },
                  () => "Reset form",
                ),
              ],
            ),
          ]),
          h(
            "output",
            { "aria-label": "Editor lifecycle" },
            `${state.changes} changes · ${state.mounted} mounted · ${state.destroyed} destroyed · ${state.aborted} canceled`,
          ),
          h(
            "output",
            { "aria-label": "Editor extensions" },
            `${state.extensionRuns} shortcuts · ${state.pluginMounted} plugins mounted · ${state.pluginDisposed} plugins destroyed · ${state.nodeViewsCleaned} node views destroyed`,
          ),
          h(
            "output",
            {
              "aria-label": "Submitted value",
              style: { overflowWrap: "anywhere", whiteSpace: "pre-wrap" },
            },
            state.result,
          ),
        ],
      );
    };
  },
});
