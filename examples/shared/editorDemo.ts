import { keymap as codeKeymap } from "@codemirror/view";
import { Plugin } from "prosemirror-state";
import type {
  CodeEditorHandle,
  CodeEditorProps,
  RichTextEditorHandle,
  RichTextEditorProps,
  RichTextDocument,
  CodeEditorLanguageLoader,
} from "@loongark/kit";
export const initialCode =
  'function greet(name: string) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("LoongArk"));';
export const initialRich: RichTextDocument = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "A clear starting point" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Write, format and revise your ideas. " },
        {
          type: "text",
          text: "Keep the details readable.",
          marks: [{ type: "strong" }],
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Built for keyboard editing" }],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Share a structured document" }],
            },
          ],
        },
      ],
    },
  ],
};
function base(notify: () => void) {
  const state = {
    controlled: false,
    reject: false,
    rtl: false,
    readOnly: false,
    disabled: false,
    shown: true,
    changes: 0,
    mounted: 0,
    destroyed: 0,
    aborted: 0,
    result: "Not submitted",
    custom: false,
    extensionRuns: 0,
    pluginMounted: 0,
    pluginDisposed: 0,
    nodeViewsCleaned: 0,
  };
  const action = (run: () => void, label: () => string) => ({
    run: () => {
      run();
      notify();
    },
    label,
  });
  return { state, action, notify };
}
export function createCodeEditorDemo(notify: () => void) {
  const { state, action } = base(notify);
  let code = initialCode,
    handle: CodeEditorHandle | undefined,
    syntax: CodeEditorProps["language"] = "typescript";
  const customExtensions = [
    codeKeymap.of([
      {
        key: "Alt-Enter",
        run(view) {
          if (view.state.readOnly) return false;
          view.dispatch(
            view.state.replaceSelection("/* extension inserted */"),
          );
          state.extensionRuns++;
          notify();
          return true;
        },
      },
    ]),
  ];
  const slow: CodeEditorLanguageLoader = (signal) =>
    new Promise((resolve, reject) => {
      let settled = false;
      const cancel = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        state.aborted++;
        notify();
        reject(new DOMException("Canceled", "AbortError"));
      };
      const timer = setTimeout(() => {
        settled = true;
        signal.removeEventListener("abort", cancel);
        resolve([]);
      }, 600);
      signal.addEventListener("abort", cancel, { once: true });
    });
  const failing: CodeEditorLanguageLoader = () =>
    Promise.reject(new Error("Example syntax unavailable"));
  const props = (snapshot = state): CodeEditorProps => ({
    label: "Source code",
    description:
      "Edit TypeScript, find text or replace the selection through the public handle.",
    name: "source",
    required: true,
    defaultValue: initialCode,
    value: snapshot.controlled ? code : undefined,
    onValueChange(value) {
      state.changes++;
      if (state.reject) return;
      code = value;
      notify();
    },
    language: syntax,
    dir: snapshot.rtl ? "rtl" : "ltr",
    readOnly: snapshot.readOnly,
    disabled: snapshot.disabled,
    lineWrapping: true,
    extensions: snapshot.custom ? customExtensions : undefined,
    onReady(view) {
      handle = view;
      state.mounted++;
      notify();
      return () => {
        handle = undefined;
        state.destroyed++;
        notify();
      };
    },
  });
  const actions = [
    action(
      () => (state.controlled = !state.controlled),
      () => (state.controlled ? "Use internal value" : "Use controlled value"),
    ),
    action(
      () => (state.rtl = !state.rtl),
      () => (state.rtl ? "Use LTR" : "Use RTL"),
    ),
    action(
      () => (state.readOnly = !state.readOnly),
      () => (state.readOnly ? "Allow editing" : "Read only"),
    ),
    action(
      () => (state.reject = !state.reject),
      () => (state.reject ? "Accept updates" : "Reject updates"),
    ),
    action(
      () => (state.disabled = !state.disabled),
      () => (state.disabled ? "Enable editor" : "Disable editor"),
    ),
    action(
      () => (state.shown = !state.shown),
      () => (state.shown ? "Hide editor" : "Show editor"),
    ),
    action(
      () => {
        code = 'const external = "Updated from outside";';
        state.controlled = true;
      },
      () => "Set external value",
    ),
    action(
      () => {
        code = "";
        state.controlled = true;
      },
      () => "Clear required value",
    ),
    action(
      () => handle?.replaceSelection("/* inserted through API */"),
      () => "Insert through handle",
    ),
    action(
      () => {
        syntax = failing;
      },
      () => "Fail syntax load",
    ),
    action(
      () => {
        syntax = slow;
      },
      () => "Load slow syntax",
    ),
    action(
      () => {
        syntax = "json";
      },
      () => "Use JSON syntax",
    ),
    action(
      () => (state.custom = !state.custom),
      () => (state.custom ? "Disable extension" : "Enable extension"),
    ),
  ];
  const submit = (event: {
    preventDefault(): void;
    currentTarget: EventTarget | null;
  }) => {
    event.preventDefault();
    const target = event.currentTarget;
    if (target instanceof HTMLFormElement) {
      state.result = String(new FormData(target).get("source"));
      notify();
    }
  };
  return { snapshot: () => ({ ...state, code }), props, actions, submit };
}
export function createRichTextEditorDemo(notify: () => void) {
  const { state, action } = base(notify);
  let doc = initialRich,
    handle: RichTextEditorHandle | undefined;
  const customPlugins = [
    new Plugin({
      view() {
        state.pluginMounted++;
        notify();
        return {
          destroy() {
            state.pluginDisposed++;
            notify();
          },
        };
      },
    }),
  ];
  const customNodes: RichTextEditorProps["nodeViews"] = {
    paragraph(node, view) {
      const dom = view.dom.ownerDocument.createElement("p");
      dom.dataset.customParagraph = "true";
      return {
        dom,
        contentDOM: dom,
        update(next) {
          return next.type === node.type;
        },
        destroy() {
          state.nodeViewsCleaned++;
          notify();
        },
      };
    },
  };

  const props = (snapshot = state): RichTextEditorProps => ({
    label: "Document",
    description:
      "Format text, add a safe link or edit a table. The form submits structured JSON.",
    name: "document",
    plugins: snapshot.custom ? customPlugins : undefined,
    nodeViews: snapshot.custom ? customNodes : undefined,
    required: true,
    defaultValue: initialRich,
    value: snapshot.controlled ? doc : undefined,
    onValueChange(value) {
      state.changes++;
      if (state.reject) return;
      doc = value;
      notify();
    },
    dir: snapshot.rtl ? "rtl" : "ltr",
    readOnly: snapshot.readOnly,
    disabled: snapshot.disabled,
    onReady(view) {
      handle = view;
      state.mounted++;
      notify();
      return () => {
        handle = undefined;
        state.destroyed++;
        notify();
      };
    },
  });
  const actions = [
    action(
      () => (state.controlled = !state.controlled),
      () => (state.controlled ? "Use internal value" : "Use controlled value"),
    ),
    action(
      () => (state.rtl = !state.rtl),
      () => (state.rtl ? "Use LTR" : "Use RTL"),
    ),
    action(
      () => (state.readOnly = !state.readOnly),
      () => (state.readOnly ? "Allow editing" : "Read only"),
    ),
    action(
      () => (state.reject = !state.reject),
      () => (state.reject ? "Accept updates" : "Reject updates"),
    ),
    action(
      () => (state.disabled = !state.disabled),
      () => (state.disabled ? "Enable editor" : "Disable editor"),
    ),
    action(
      () => (state.shown = !state.shown),
      () => (state.shown ? "Hide editor" : "Show editor"),
    ),
    action(
      () => {
        doc = {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "External structured document" }],
            },
          ],
        };
        state.controlled = true;
      },
      () => "Set external value",
    ),
    action(
      () => {
        doc = { type: "doc", content: [{ type: "paragraph" }] };
        state.controlled = true;
      },
      () => "Clear required value",
    ),
    action(
      () => {
        handle?.insertTable({ rows: 2, columns: 3, headerRow: true });
      },
      () => "Insert table through handle",
    ),
    action(
      () => (state.custom = !state.custom),
      () =>
        state.custom ? "Disable custom rendering" : "Enable custom rendering",
    ),
  ];
  const submit = (event: {
    preventDefault(): void;
    currentTarget: EventTarget | null;
  }) => {
    event.preventDefault();
    const target = event.currentTarget;
    if (target instanceof HTMLFormElement) {
      state.result = String(new FormData(target).get("document"));
      notify();
    }
  };
  return { snapshot: () => ({ ...state, doc }), props, actions, submit };
}
