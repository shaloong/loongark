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
export const LoongArkCodeEditor = makeEditor<CodeEditorProps>(
  "code",
  renderCodeEditorMarkup,
  mountCodeEditor,
);
export const LoongArkRichTextEditor = makeEditor<RichTextEditorProps>(
  "rich",
  renderRichTextEditorMarkup,
  mountRichTextEditor,
);
