import type { Question, QuestionnaireValue } from "@loongark/kit";
export const workspaceQuestions: readonly Question[] = [
  {
    id: "account",
    label: "Choose a workspace",
    type: "single",
    required: true,
    options: [
      { value: "team", label: "Team project" },
      { value: "personal", label: "Personal project" },
    ],
  },
  {
    id: "teamName",
    label: "Team name",
    description: "Use a specific name for your team.",
    type: "text",
    required: true,
    minLength: 3,
    when: (value) => value.account === "team",
    validate: (answer) =>
      typeof answer === "string" && answer.trim().toLowerCase() === "team"
        ? "Use a specific team name."
        : undefined,
  },
  {
    id: "email",
    label: "Contact email",
    type: "text",
    required: true,
    validate: (answer) =>
      typeof answer === "string" && /^\S+@\S+\.\S+$/.test(answer.trim())
        ? undefined
        : "Enter a valid email address.",
  },
  {
    id: "confirmEmail",
    label: "Confirm email",
    description: "Repeat your contact email to confirm it.",
    type: "text",
    required: true,
    validate: (answer, value) =>
      typeof answer === "string" &&
      typeof value.email === "string" &&
      answer.trim().toLowerCase() === value.email.trim().toLowerCase()
        ? undefined
        : "Email addresses must match.",
  },
];
export function workspaceDefaults(): QuestionnaireValue {
  return { account: "team", teamName: "Shaloong", email: "", confirmEmail: "" };
}
export function workspaceSummary(value?: QuestionnaireValue) {
  return value
    ? [
        value.account === "team" ? "Team" : "Personal",
        value.teamName,
        value.email,
      ]
        .filter(Boolean)
        .join(" · ")
    : "No answers saved yet";
}
