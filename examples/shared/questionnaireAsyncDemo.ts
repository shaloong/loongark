import type { Question, QuestionnaireValue } from "@loongark/kit";
/** 演示请求由调用方实现；组件不依赖服务地址或账户规则。 */
export function createQuestionnaireAsyncDemo(
  notify: (aborted: number) => void,
) {
  let failNext = false,
    aborted = 0;
  const questions: readonly Question[] = [
    {
      id: "name",
      label: "Workspace name",
      description:
        "Try reserved to see a field error. You can edit or cancel while checking.",
      type: "text",
      required: true,
      minLength: 3,
      async validateAsync(answer, _value, { signal }) {
        const fail = failNext;
        failNext = false;
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(() => {
            signal.removeEventListener("abort", cancel);
            resolve();
          }, 700);
          function cancel() {
            clearTimeout(timer);
            signal.removeEventListener("abort", cancel);
            notify(++aborted);
            reject(new DOMException("Cancelled", "AbortError"));
          }
          if (signal.aborted) cancel();
          else signal.addEventListener("abort", cancel, { once: true });
        });
        if (fail) throw new Error("Demo service unavailable");
        return typeof answer === "string" &&
          answer.trim().toLowerCase() === "reserved"
          ? "This name is already in use."
          : undefined;
      },
    },
    {
      id: "plan",
      label: "How will your workspace collaborate?",
      type: "single",
      required: true,
      options: [
        {
          value: "team",
          label:
            "Build accessible interfaces with a distributed team across platforms and languages",
        },
        {
          value: "personal",
          label: "Explore independently and share progress when ready",
        },
      ],
    },
  ];
  return {
    questions,
    failNext: () => {
      failNext = true;
    },
  };
}
export function asyncSurveyDefaults(): QuestionnaireValue {
  return { name: "Shaloong", plan: "team" };
}
export function asyncSurveySummary(value?: QuestionnaireValue) {
  return value ? `${value.name ?? ""} · ${value.plan}` : "No answers saved yet";
}
