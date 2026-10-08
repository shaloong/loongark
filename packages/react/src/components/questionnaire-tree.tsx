import { createElement, type ReactNode } from "react";
import type {
  QuestionnaireCustomContext,
  QuestionnaireRenderNode,
} from "@loongark/kit";
export type LoongArkQuestionnaireRenderers = Readonly<
  Record<string, (context: QuestionnaireCustomContext) => ReactNode>
>;
export function QuestionnaireTree({
  node,
  renderers,
}: {
  node: QuestionnaireRenderNode;
  renderers: LoongArkQuestionnaireRenderers;
}): ReactNode {
  if (node.kind === "text") return node.text;
  if (node.kind === "html")
    return (
      <div
        data-part="advanced-answer"
        dangerouslySetInnerHTML={{ __html: node.html }}
      />
    );
  if (node.kind === "custom")
    return renderers[node.context.question.customKind!](node.context);
  const attrs = Object.fromEntries(
    Object.entries(node.attrs).map(([key, value]) => [
      key === "tabindex" ? "tabIndex" : key,
      value,
    ]),
  );
  return createElement(
    node.tag,
    attrs,
    ...node.children.map((child) => (
      <QuestionnaireTree key={child.key} node={child} renderers={renderers} />
    )),
  );
}
