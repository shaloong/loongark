import type { Snippet } from "svelte";
import type { QuestionnaireCustomContext } from "@shaloong/loongark-kit";
export type LoongArkQuestionnaireRenderers = Readonly<
  Record<string, Snippet<[QuestionnaireCustomContext]>>
>;
