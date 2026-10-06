export async function setupQuestionGroupFocusFixture(
  retainPointerFocus: boolean,
) {
  const groupsPath = "/questionnaire-groups.js",
    customPath = "/questionnaire-custom.js";
  const { mountQuestionGroups } = await import(groupsPath);
  const { createQuestionnaireCustomRegistry } = await import(customPath);
  const root = document.createElement("form"),
    outside = document.createElement("button");
  outside.textContent = "Outside";
  document.body.append(root, outside);
  const origin = document.createElement("textarea");
  origin.setAttribute("aria-label", "Retained field");
  const container = document.createElement("div");
  container.dataset.part = "groups";
  container.dataset.groupPath = '["people"]';
  const add = document.createElement("button");
  add.type = "button";
  add.textContent = "Add person";
  add.dataset.questionGroup = "add";
  add.dataset.groupPath = '["people"]';
  // 重现 Safari 鼠标点击保留旧文本控件焦点的合法交互；实际 Safari 仍用原生 runner。
  if (retainPointerFocus)
    add.addEventListener("mousedown", (event) => event.preventDefault());
  container.append(add);
  root.append(origin, container);
  const state: import("@loongark/kit").QuestionnaireCustomState = {
    question: {
      id: "people",
      label: "People",
      type: "group",
      maxGroups: 3,
      questions: [
        {
          id: "rating",
          label: "Rating",
          type: "custom",
          customKind: "rating",
        },
      ],
    },
    value: { people: [] },
    disabled: false,
    pending: false,
    showError: false,
    errors: {},
    labels: {},
    renderers: { rating: () => null },
  };
  let reject = false,
    pending: (() => void) | undefined;
  const change = (value: typeof state.value) => {
    if (reject) return;
    state.value = value;
    for (const instance of value.people as { id: string; value: object }[]) {
      if (container.querySelector(`[data-instance="${instance.id}"]`)) continue;
      const field = document.createElement("div");
      field.dataset.instance = instance.id;
      field.dataset.part = "group-question";
      field.dataset.questionPath = JSON.stringify([
        "people",
        instance.id,
        "rating",
      ]);
      const decoration = document.createElement("button");
      decoration.type = "button";
      decoration.textContent = "Decorative suggestion";
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      const control = document.createElement("button");
      control.type = "button";
      control.textContent = "Custom answer " + instance.id;
      field.append(decoration, hidden, control);
      container.insertBefore(field, add);
      const context = registry.context(
        ["people", instance.id, "rating"],
        "test",
      );
      pending = () => {
        context.registerControl({
          element: control,
          focus: () => control.focus(),
        });
      };
    }
  };
  const registry = createQuestionnaireCustomRegistry(() => state, change);
  const unmountRegistry = registry.mount(root);
  const unmountGroups = mountQuestionGroups(
    root,
    () => ({
      question: state.question,
      value: state.value,
      blocked: state.disabled,
    }),
    change,
    registry,
  );
  Object.assign(window, {
    groupFocusProbe: {
      register: () => pending?.(),
      reject: (value: boolean) => {
        reject = value;
      },
      unmount: () => {
        unmountGroups();
        unmountRegistry();
      },
    },
  });
}
