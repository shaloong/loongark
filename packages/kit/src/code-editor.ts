import { Compartment, EditorState, type Extension } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  placeholder,
  drawSelection,
  rectangularSelection,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  undo,
  redo,
  undoDepth,
  redoDepth,
} from "@codemirror/commands";
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
  HighlightStyle,
} from "@codemirror/language";
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import { searchKeymap, openSearchPanel } from "@codemirror/search";
import {
  loadCodeLanguage,
  type CodeEditorLanguage,
  type CodeEditorLanguageLoader,
} from "./code-language";
import { tags } from "@lezer/highlight";
import { controlIcons } from "./icon";
import { Undo2, Redo2, Search } from "lucide";
import {
  renderEditorMarkup,
  syncEditorMarkup,
  editorIcon,
} from "./editor-markup";
import { mountEditorToolbar, syncEditorToolbar } from "./editor-form";
import { mountEditorForm, type EditorFormOptions } from "./editor-form";

export interface CodeEditorHandle {
  view: EditorView;
  focus(): void;
  replaceSelection(text: string): void;
  undo(): boolean;
  redo(): boolean;
  search(): boolean;
}
export interface CodeEditorProps extends EditorFormOptions {
  value?: string;
  defaultValue?: string;
  onValueChange?: (
    value: string,
    selection: { anchor: number; head: number },
  ) => void;
  language?: CodeEditorLanguage | CodeEditorLanguageLoader;
  onLanguageError?: (error: Error) => void;
  placeholder?: string;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  tabSize?: number;
  extensions?: readonly Extension[];
  phrases?: Readonly<Record<string, string>>;
  onReady?: (handle: CodeEditorHandle) => void | (() => void);
  labels?: Partial<CodeEditorLabels>;
}

export interface CodeEditorLabels {
  undo: string;
  redo: string;
  search: string;
  keyboardHint: string;
  loadingLanguage: string;
  languageError: string;
}
const codeLabels = (props: CodeEditorProps): CodeEditorLabels => ({
  undo: props.labels?.undo ?? "Undo",
  redo: props.labels?.redo ?? "Redo",
  search: props.labels?.search ?? "Find",
  keyboardHint:
    props.labels?.keyboardHint ??
    "Tab indents. Press Escape, then Tab to leave the editor.",
  loadingLanguage: props.labels?.loadingLanguage ?? "Loading syntax",
  languageError:
    props.labels?.languageError ??
    "Syntax unavailable; plain text editing remains available",
});
export function renderCodeEditorMarkup(
  props: CodeEditorProps,
  id: string,
): string {
  const labels = codeLabels(props);
  return renderEditorMarkup(
    props,
    id,
    "code",
    props.value ?? props.defaultValue ?? "",
    "",
    [
      { key: "undo", label: labels.undo, icon: Undo2 },
      { key: "redo", label: labels.redo, icon: Redo2 },
      { key: "search", label: labels.search, icon: Search },
    ],
    labels.keyboardHint,
  );
}


export function mountCodeEditor(root: HTMLElement, get: () => CodeEditorProps) {
  const codeHighlight = HighlightStyle.define([
    {
      tag: tags.keyword,
      color: "var(--lk-color-semantic-foreground)",
      fontWeight: "var(--lk-typography-fontweight-semibold)",
    },
    {
      tag: [tags.string, tags.number, tags.bool],
      color: "var(--lk-color-semantic-foreground)",
      fontStyle: "italic",
    },
    {
      tag: [tags.comment, tags.meta],
      color: "var(--lk-color-semantic-mutedforeground)",
    },
    {
      tag: tags.invalid,
      color: "var(--lk-color-semantic-destructive)",
      textDecoration: "underline",
    },
  ]);
  const win = root.ownerDocument.defaultView;
  const host = root.querySelector<HTMLElement>('[data-part="engine"]');
  if (!win || !host) throw new Error("Code editor mount missing");
  const initialValue = get().value ?? get().defaultValue ?? "";
  const languageSlot = new Compartment(),
    optionsSlot = new Compartment(),
    customSlot = new Compartment();
  let disposed = false,
    internal = false,
    frame = 0,
    before: EditorState | undefined;
  let language: CodeEditorProps["language"],
    languageAbort: AbortController | undefined;
  let loadedLanguage: Extension = [];
  let configuredExtensions = get().extensions;
  let configuredReadOnly = !!get().readOnly,
    configuredDisabled = !!get().disabled;
  const options = (): Extension => {
    const props = get(),
      description = [
        root.id + "-description",
        root.id + "-error",
        root.id + "-keyboard",
      ].join(" ");
    return [
      EditorState.readOnly.of(!!(props.readOnly || props.disabled)),
      EditorView.editable.of(!props.disabled),
      EditorView.contentAttributes.of({
        role: "textbox",
        "aria-multiline": "true",
        "aria-labelledby": root.id + "-label",
        "aria-describedby": description,
        "aria-required": String(!!props.required),
        "aria-invalid": String(!!props.error),
        "aria-readonly": String(!!props.readOnly),
        "aria-disabled": String(!!props.disabled),
        tabindex: props.disabled ? "-1" : "0",
        spellcheck: "false",
      }),
      EditorState.tabSize.of(
        Math.max(
          1,
          Math.min(
            16,
            Math.trunc(Number.isFinite(props.tabSize) ? props.tabSize! : 2),
          ),
        ),
      ),
      props.lineNumbers === false
        ? []
        : [lineNumbers(), highlightActiveLineGutter()],
      props.lineWrapping ? EditorView.lineWrapping : [],
      placeholder(props.placeholder ?? ""),
      EditorState.phrases.of(props.phrases ?? {}),
    ];
  };
  const schedule = () => {
    if (!disposed && !frame)
      frame = win.requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
  };
  const notify = EditorView.updateListener.of((update) => {
    if (!update.docChanged || internal || disposed) return;
    before ??= update.startState;
    const { anchor, head } = update.state.selection.main;
    try {
      get().onValueChange?.(update.state.doc.toString(), { anchor, head });
    } finally {
      schedule();
    }
  });
  const base = (): Extension => [
    history(),
    drawSelection(),
    rectangularSelection(),
    highlightActiveLine(),
    bracketMatching(),
    foldGutter({
      markerDOM(open) {
        const marker = root.ownerDocument.createElement("span");
        marker.innerHTML = editorIcon(
          open ? controlIcons.chevronDown : controlIcons.chevronRight,
        );
        marker.querySelector("svg")?.setAttribute("data-mirror-rtl", "true");
        return marker;
      },
    }),
    indentOnInput(),
    closeBrackets(),
    autocompletion(),
    syntaxHighlighting(codeHighlight, { fallback: true }),
    keymap.of([
      {
        key: "Escape",
        run: (view) => {
          view.setTabFocusMode(2000);
          return false;
        },
      },
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...historyKeymap,
      ...searchKeymap,
      ...foldKeymap,
      ...completionKeymap,
      indentWithTab,
    ]),
    languageSlot.of(loadedLanguage),
    optionsSlot.of(options()),
    customSlot.of(get().extensions ?? []),
    notify,
  ];
  const create = (doc: string) =>
    EditorState.create({ doc, extensions: base() });
  const view = new EditorView({ state: create(initialValue), parent: host });
  // 原生输入不能等待下一帧的配置更新；文档协调仍保留在 RAF，保护组合输入。
  const refreshNativeState = () => {
    if (disposed || internal || view.composing) return;
    const props = get(),
      extensions = props.extensions,
      readOnly = !!props.readOnly,
      disabled = !!props.disabled;
    if (
      extensions === configuredExtensions &&
      readOnly === configuredReadOnly &&
      disabled === configuredDisabled
    )
      return;
    internal = true;
    try {
      view.dispatch({
        effects: [
          customSlot.reconfigure(extensions ?? []),
          optionsSlot.reconfigure(options()),
        ],
      });
      configuredExtensions = extensions;
      configuredReadOnly = readOnly;
      configuredDisabled = disabled;
    } finally {
      internal = false;
    }
  };
  const bridge = mountEditorForm(
    root,
    get,
    () => view.focus(),
    () => {
      before ??= view.state;
      internal = true;
      try {
        view.setState(create(get().defaultValue ?? ""));
      } finally {
        internal = false;
      }
      get().onValueChange?.(view.state.doc.toString(), {
        anchor: view.state.selection.main.anchor,
        head: view.state.selection.main.head,
      });
      schedule();
    },
  );
  const sync = () => {
    if (disposed) return;
    const props = get(),
      controlled = props.value;
    syncEditorMarkup(root, props, "Code editor");
    if (view.composing) {
      schedule();
      return;
    }
    internal = true;
    try {
      if (
        controlled !== undefined &&
        controlled !== view.state.doc.toString()
      ) {
        if (before?.doc.toString() === controlled) view.setState(before);
        else view.setState(create(controlled));
      }
      before = undefined;
      view.dispatch({
        effects: [
          optionsSlot.reconfigure(options()),
          customSlot.reconfigure(props.extensions ?? []),
        ],
      });
      configuredExtensions = props.extensions;
      configuredReadOnly = !!props.readOnly;
      configuredDisabled = !!props.disabled;
    } finally {
      internal = false;
    }
    bridge.sync(
      view.state.doc.toString(),
      !view.state.doc.toString().trim(),
      props.requiredMessage ?? "Enter code",
    );
    const labels = codeLabels(props);
    const hint = root.querySelector<HTMLElement>('[data-part="keyboard-hint"]');
    if (hint) hint.textContent = labels.keyboardHint;
    for (const [action, label, enabled] of [
      ["undo", labels.undo, undoDepth(view.state) > 0],
      ["redo", labels.redo, redoDepth(view.state) > 0],
      ["search", labels.search, true],
    ] as const) {
      const button = root.querySelector<HTMLButtonElement>(
        `[data-action="${action}"]`,
      );
      if (button) {
        button.disabled =
          !!props.disabled ||
          (action !== "search" && !!props.readOnly) ||
          !enabled;
        button.setAttribute("aria-label", label);
        button.title = label;
      }
    }
    syncEditorToolbar(
      root.querySelector<HTMLElement>('[data-part="toolbar"]')!,
    );
    const next = props.language ?? "plain";
    if (next !== language) {
      language = next;
      languageAbort?.abort();
      const controller = new AbortController();
      languageAbort = controller;
      root.setAttribute("aria-busy", "true");
      const status = root.querySelector<HTMLElement>('[data-part="status"]');
      if (status) status.textContent = labels.loadingLanguage;
      void loadCodeLanguage(next, controller.signal).then(
        (extension) => {
          if (disposed || controller.signal.aborted) return;
          loadedLanguage = extension;
          view.dispatch({ effects: languageSlot.reconfigure(extension) });
          root.removeAttribute("aria-busy");
          if (status) status.textContent = "";
        },
        (error) => {
          if (disposed || controller.signal.aborted) return;
          loadedLanguage = [];
          view.dispatch({ effects: languageSlot.reconfigure([]) });
          root.removeAttribute("aria-busy");
          if (status) status.textContent = codeLabels(get()).languageError;
          get().onLanguageError?.(
            error instanceof Error ? error : new Error(String(error)),
          );
        },
      );
    }
  };
  root.dataset.mounted = "true";
  const field = root.querySelector<HTMLTextAreaElement>(
    'textarea[data-part="form-value"]',
  )!;
  field.tabIndex = -1;
  field.setAttribute("aria-hidden", "true");
  const toolbar = root.querySelector<HTMLElement>('[data-part="toolbar"]')!;
  const toolbarStop = mountEditorToolbar(toolbar);
  const click = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest<HTMLButtonElement>(
      "button[data-action]",
    );
    if (!button || button.disabled || !toolbar.contains(button)) return;
    if (button.dataset.action === "undo") handle.undo();
    else if (button.dataset.action === "redo") handle.redo();
    else if (button.dataset.action === "search") {
      handle.search();
      schedule();
      return;
    }
    view.focus();
    schedule();
  };
  const press = (event: MouseEvent) => {
    if (event.button === 0) event.preventDefault();
  };
  for (const event of ["keydown", "beforeinput", "paste"])
    root.addEventListener(event, refreshNativeState, true);
  toolbar.addEventListener("click", click);
  toolbar.addEventListener("mousedown", press);
  const handle: CodeEditorHandle = {
    view,
    focus: () => {
      if (!disposed && !get().disabled) view.focus();
    },
    replaceSelection: (text) => {
      if (!disposed && !get().disabled && !get().readOnly)
        view.dispatch(view.state.replaceSelection(text));
    },
    undo: () => !disposed && !get().disabled && !get().readOnly && undo(view),
    redo: () => !disposed && !get().disabled && !get().readOnly && redo(view),
    search: () => !disposed && !get().disabled && openSearchPanel(view),
  };
  sync();
  let readyStop: void | (() => void);
  try {
    readyStop = get().onReady?.(handle);
  } catch (error) {
    destroy();
    throw error;
  }
  function destroy() {
    if (disposed) return;
    disposed = true;
    languageAbort?.abort();
    win?.cancelAnimationFrame(frame);
    for (const event of ["keydown", "beforeinput", "paste"])
      root.removeEventListener(event, refreshNativeState, true);
    toolbarStop();
    toolbar.removeEventListener("click", click);
    toolbar.removeEventListener("mousedown", press);
    try {
      readyStop?.();
    } finally {
      bridge.destroy();
      view.destroy();
      delete root.dataset.mounted;
      field.removeAttribute("aria-hidden");
      field.removeAttribute("tabindex");
    }
  }
  // 框架响应更新与原生输入共用一帧，避免同步重配置打断组合输入。
  return { sync: schedule, handle, destroy };
}
