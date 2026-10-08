import { controlIcons } from "@loongark/kit";
import type {
  Question,
  QuestionAnswer,
  QuestionnaireValue,
} from "@loongark/kit";
const initial = (): QuestionnaireValue => ({
  contacts: [
    {
      id: "alpha",
      value: {
        name: "Alex Chen",
        channel: "email",
        address: "alex@example.com",
        notes: "Retained private note",
        availability: { mornings: ["mon"], afternoons: ["tue"] },
        priorities: ["clarity", "speed", "quality"],
        backups: [],
        updates: ["email"],
      },
    },
    {
      id: "beta",
      value: {
        name: "Morgan Lee",
        channel: "phone",
        address: "555 0102",
        notes: "",
        availability: { mornings: ["tue"], afternoons: ["mon"] },
        priorities: ["quality", "clarity", "speed"],
        backups: [],
        updates: ["email"],
      },
    },
  ],
});
export function createQuestionnaireGroupsDemo(notify: () => void) {
  let value = initial(),
    saved: QuestionnaireValue | undefined;
  const state = {
    reject: false,
    disabled: false,
    shown: true,
    advanced: false,
    longLabels: false,
    controlled: true,
    revision: 0,
    callbacks: 0,
    async: false,
    strict: false,
    minimum: 1,
  };
  const name: Question = {
    id: "name",
    label: "Contact name",
    type: "text",
    required: true,
    minLength: 2,
    validateAsync: async (answer, _value, { signal }) => {
      if (!state.async) return;
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          signal.removeEventListener("abort", cancel);
          resolve();
        }, 300);
        const cancel = () => {
          clearTimeout(timer);
          signal.removeEventListener("abort", cancel);
          reject(new DOMException("Cancelled", "AbortError"));
        };
        signal.addEventListener("abort", cancel, { once: true });
        if (signal.aborted) cancel();
      });
      return typeof answer === "string" &&
        answer.trim().toLowerCase() === "reserved"
        ? "Choose another contact name."
        : undefined;
    },
  };
  const definitions = (): readonly Question[] => [
    {
      id: "contacts",
      label: "Contacts",
      type: "group",
      required: true,
      minGroups: 1,
      maxGroups: 3,
      groupLabels: {
        add: "Add contact",
        remove: "Remove contact",
        instance: "Contact",
      },
      questions: [
        name,
        {
          id: "channel",
          label: "Preferred channel",
          type: "select",
          required: true,
          options: [
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone" },
            { value: "other", label: "Other" },
          ],
        },
        {
          id: "address",
          label: "Contact address",
          type: "text",
          required: true,
          minLength: 3,
          when: (v) => v.channel !== "other",
        },
        {
          id: "notes",
          label: "Other channel details",
          type: "text",
          required: true,
          when: (v) => v.channel === "other",
        },
        ...([
          {
            id: "availability",
            label: "Availability",
            type: "matrix",
            multiple: true,
            required: true,
            minSelections: 1,
            maxSelections: 2,
            rows: [
              { id: "mornings", label: "Mornings" },
              { id: "afternoons", label: "Afternoons" },
            ],
            options: [
              { value: "mon", label: "Monday" },
              { value: "tue", label: "Tuesday" },
              { value: "wed", label: "Wednesday" },
            ],
          },
          {
            id: "priorities",
            label: "Contact priorities",
            type: "ranking",
            options: [
              { value: "clarity", label: "Clarity" },
              { value: "speed", label: "Speed" },
              { value: "quality", label: "Quality" },
            ],
          },
          {
            id: "updates",
            label: "Updates",
            type: "multiple",
            options: [
              { value: "email", label: "Email updates" },
              {
                value: "sms",
                label: "SMS updates (unavailable)",
                disabled: true,
              },
            ],
          },
          {
            id: "backups",
            label: "Backup contacts",
            type: "group",
            maxGroups: 2,
            groupLabels: {
              add: "Add backup",
              remove: "Remove backup",
              instance: "Backup",
            },
            questions: [
              {
                id: "name",
                label: "Backup name",
                type: "text",
                required: true,
              },
              {
                id: "phone",
                label: "Backup phone",
                type: "text",
                required: true,
              },
            ],
          },
        ] satisfies Question[]),
      ],
    },
  ];
  const schema = definitions()[0];
  const strictOrder = (answer: QuestionAnswer) =>
    Array.isArray(answer) && answer[0] === "clarity"
      ? undefined
      : "Put clarity first.";
  const longLabels = (q: Question): Question => ({
    ...q,
    label: `${q.label} — review the details and preferences for this contact before completing your questionnaire`,
    groupLabels: q.groupLabels
      ? {
          ...q.groupLabels,
          instance: `${q.groupLabels.instance} — contact information and communication preferences`,
        }
      : undefined,
    questions: q.questions?.map(longLabels),
    rows: q.rows?.map((row) => ({
      ...row,
      label: `${row.label} — choose the days that work best for your regular schedule`,
    })),
  });
  const questions = (): readonly Question[] => [
    {
      ...schema,
      minGroups: state.minimum,
      questions: schema.questions
        ?.filter((_, index) => index < 4 || state.advanced)
        .map((q, index) =>
          q.id === "priorities"
            ? { ...q, validate: state.strict ? strictOrder : undefined }
            : index === 0 && !state.async
              ? { ...q, validateAsync: undefined }
              : q,
        ),
    },
  ];
  return {
    get snapshot() {
      return {
        ...state,
        value,
        saved,
        questions: state.longLabels ? questions().map(longLabels) : questions(),
      };
    },
    change(details: { value: QuestionnaireValue }) {
      state.callbacks++;
      if (!state.reject) value = details.value;
      saved = undefined;
      notify();
    },
    complete(details: { value: QuestionnaireValue }) {
      saved = details.value;
      notify();
    },
    toggleReject() {
      state.controlled = true;
      state.reject = !state.reject;
      notify();
    },
    toggleDisabled() {
      state.disabled = !state.disabled;
      notify();
    },
    toggleShown() {
      state.shown = !state.shown;
      notify();
    },
    toggleLongLabels() {
      state.longLabels = !state.longLabels;
      notify();
    },
    toggleAdvanced() {
      state.advanced = !state.advanced;
      saved = undefined;
      notify();
    },
    toggleStrict() {
      state.strict = !state.strict;
      saved = undefined;
      notify();
    },
    toggleMinimum() {
      state.minimum = state.minimum === 1 ? 2 : 1;
      saved = undefined;
      notify();
    },
    toggleAsync() {
      state.async = !state.async;
      saved = undefined;
      notify();
    },
    reset() {
      value = initial();
      saved = undefined;
      state.reject = false;
      state.controlled = true;
      notify();
    },
    internal() {
      state.revision++;
      state.controlled = false;
      state.reject = false;
      saved = undefined;
      notify();
    },
  };
}

/** 原生 details 保留键盘/展开语义；统一 SVG，避免平台将标记渲染为彩色 emoji。 */
export const groupsDisclosureIcon = controlIcons.chevronRight;
export const groupsDisclosureCSS = `
[data-groups-demo-controls] > summary {display:flex;align-items:center;gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-md);list-style:none;cursor:pointer;}
[data-groups-demo-controls] > summary::-webkit-details-marker {display:none;}
[data-groups-demo-controls][open] > summary {margin-bottom:var(--lk-space-component-sm);}
[data-groups-demo-controls][open] > summary svg {transform:rotate(90deg);}
[data-groups-demo-controls] > summary:focus-visible {outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth);border-radius:var(--lk-radius-sm);}
`;
