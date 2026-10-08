import { h, type VNodeChild } from "vue";
import type {
  QuestionnaireCustomContext,
  QuestionnaireRenderNode,
} from "@loongark/kit";
export type LoongArkQuestionnaireRenderers = Readonly<
  Record<string, (context: QuestionnaireCustomContext) => VNodeChild>
>;
export function renderQuestionnaireTree(
  node: QuestionnaireRenderNode,
  renderers: LoongArkQuestionnaireRenderers,
): VNodeChild {
  if (node.kind === "text") return node.text;
  if (node.kind === "html")
    return h("div", {
      key: node.key,
      "data-part": "advanced-answer",
      innerHTML: node.html,
    });
  if (node.kind === "custom")
    return renderers[node.context.question.customKind!](node.context);
  return h(
    node.tag,
    { ...node.attrs, key: node.key },
    node.children.map((child) => renderQuestionnaireTree(child, renderers)),
  );
}
