"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticCodeEditorStyles } from "@shaloong/loongark-primitives/automatic-styles/code-editor";
import { styles as lkAutomaticRichTextEditorStyles } from "@shaloong/loongark-primitives/automatic-styles/rich-text-editor";


import React, { useId, useRef, useState, useEffect } from "react";
import {
  renderCodeEditorMarkup,
  mountCodeEditor,
  renderRichTextEditorMarkup,
  mountRichTextEditor,
  type CodeEditorProps,
  type RichTextEditorProps,
  type EditorFormOptions,
} from "@shaloong/loongark-kit";

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
