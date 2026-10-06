import React, { useId, useRef, useState, useEffect } from "react";
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
  return function Editor(props: P) {
    const uid = useId(),
      [id] = useState(() => props.id ?? uid);
    const root = useRef<HTMLDivElement>(null),
      latest = useRef(props),
      controller = useRef<ReturnType<typeof mount>>(undefined);
    latest.current = props;
    const [markup] = useState(() => ({ __html: render(props, id) }));
    useEffect(() => {
      if (!root.current) return;
      const current = mount(root.current, () => latest.current);
      controller.current = current;
      return () => {
        controller.current = undefined;
        current.destroy();
      };
    }, []);
    useEffect(() => controller.current?.sync());
    return (
      <div
        ref={root}
        id={id}
        data-scope="editor"
        data-kind={kind}
        dir={props.dir}
        dangerouslySetInnerHTML={markup}
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
