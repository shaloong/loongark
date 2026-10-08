import type { Snippet } from "svelte";
import type { QuestionnaireCustomContext } from "@loongark/kit";
export type LoongArkQuestionnaireRenderers = Readonly<
  Record<string, Snippet<[QuestionnaireCustomContext]>>
>;
