
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticCodeEditorStyles } from "@loongark/primitives/automatic-styles/code-editor";
import { styles as lkAutomaticRichTextEditorStyles } from "@loongark/primitives/automatic-styles/rich-text-editor";
import {
  createUniqueId,
  createEffect,
  onMount,
  onCleanup,
  untrack,
} from "solid-js";
import {
  renderCodeEditorMarkup,
  mountCodeEditor,
  renderRichTextEditorMarkup,
  mountRichTextEditor,
  type CodeEditorProps,
  type RichTextEditorProps,
  type EditorFormOptions,
} from "@loongark/kit";
function makeEditor<P extends EditorFormOptions>(
  kind: "code" | "rich",
  render: (props: P, id: string) => string,
  mount: (root: HTMLElement, get: () => P) => { sync(): void; destroy(): void },
) {
  return (props: P) => {
    const uid = createUniqueId(),
      id = untrack(() => props.id ?? uid),
      markup = untrack(() => render(props, id));
    let root!: HTMLDivElement, controller: ReturnType<typeof mount> | undefined;
    onMount(() => {
      controller = untrack(() => mount(root, () => props));
      onCleanup(() => {
        controller?.destroy();
        controller = undefined;
      });
    });
    createEffect(() => {
      Object.values(props);
      controller?.sync();
    });
    return (
      <div
        ref={root}
        id={id}
        data-scope="editor"
        data-kind={kind}
        dir={props.dir}
        innerHTML={markup}
      />
    );
  };
}
export const LoongArkCodeEditor = /* @__PURE__ */ /*#__PURE__*/ withAutomaticStyles(makeEditor<CodeEditorProps>(
  "code",
  renderCodeEditorMarkup,
  mountCodeEditor,
), lkAutomaticCodeEditorStyles);
export const LoongArkRichTextEditor = /* @__PURE__ */ /*#__PURE__*/ withAutomaticStyles(makeEditor<RichTextEditorProps>(
  "rich",
  renderRichTextEditorMarkup,
  mountRichTextEditor,
), lkAutomaticRichTextEditorStyles);
