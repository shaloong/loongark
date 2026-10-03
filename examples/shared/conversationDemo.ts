import type { Question } from "@loongark/kit";
export const feedbackQuestions: readonly Question[] = [
  {
    id: "role",
    label: "How do you use LoongArk?",
    description: "Choose the role that fits your daily work.",
    type: "single",
    required: true,
    options: [
      { value: "design", label: "Design interfaces" },
      { value: "build", label: "Build products" },
      { value: "other", label: "Other", disabled: true },
    ],
  },
  {
    id: "features",
    label: "What matters to you?",
    type: "multiple",
    required: true,
    options: [
      { value: "accessibility", label: "Accessible interactions" },
      { value: "consistency", label: "Consistent across frameworks" },
      { value: "visuals", label: "Thoughtful visual details" },
    ],
  },
  {
    id: "notes",
    label: "Anything we should improve?",
    description: "Share a concrete example. At least 5 characters.",
    type: "text",
    required: true,
    minLength: 5,
    maxLength: 500,
  },
];
