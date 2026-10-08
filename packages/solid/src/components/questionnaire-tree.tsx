import { createMemo, For, Show, Switch, Match, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type {
  QuestionnaireCustomContext,
  QuestionnaireRenderNode,
} from "@loongark/kit";
export type LoongArkQuestionnaireRenderers = Readonly<
  Record<string, (context: QuestionnaireCustomContext) => JSX.Element>
>;
export function QuestionnaireTree(props: {
  node: () => QuestionnaireRenderNode;
  renderers: LoongArkQuestionnaireRenderers;
}): JSX.Element {
  const element = createMemo(() => {
    const n = props.node();
    return n.kind === "element" ? n : undefined;
  });
  const custom = createMemo(() => {
    const n = props.node();
    return n.kind === "custom" ? n.context : undefined;
  });
  const keys = createMemo(() => element()?.children.map((n) => n.key) ?? []);
  return (
    <Switch>
      <Match when={props.node().kind === "text"}>
        {(() => {
          const n = props.node();
          return n.kind === "text" ? n.text : "";
        })()}
      </Match>
      <Match when={props.node().kind === "html"}>
        <div
          data-part="advanced-answer"
          innerHTML={(() => {
            const n = props.node();
            return n.kind === "html" ? n.html : "";
          })()}
        />
      </Match>
      <Match when={props.node().kind === "custom"}>
        <Show when={custom()} keyed>
          {(context) => props.renderers[context.question.customKind!](context)}
        </Show>
      </Match>
      <Match when={props.node().kind === "element"}>
        <Dynamic component={element()?.tag} {...element()?.attrs}>
          <For each={keys()}>
            {(key) => (
              <QuestionnaireTree
                node={() => element()!.children.find((n) => n.key === key)!}
                renderers={props.renderers}
              />
            )}
          </For>
        </Dynamic>
      </Match>
    </Switch>
  );
}
