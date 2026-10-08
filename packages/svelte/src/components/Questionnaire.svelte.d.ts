import type { Component } from "svelte";
import type { HTMLFormAttributes } from "svelte/elements";
import type { QuestionnaireOptions } from "@loongark/kit";
import type { LoongArkQuestionnaireRenderers } from "./questionnaire-custom.types";
declare const component: Component<
  QuestionnaireOptions & HTMLFormAttributes & { renderers?: LoongArkQuestionnaireRenderers },
  {},
  "value"
>;
export default component;
