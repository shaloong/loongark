import {
  EditorState,
  TextSelection,
  type Plugin,
  type Command,
  type Selection,
} from "prosemirror-state";
import { EditorView, type NodeViewConstructor } from "prosemirror-view";
import {
  baseKeymap,
  toggleMark,
  setBlockType,
  wrapIn,
  chainCommands,
} from "prosemirror-commands";
import { history, undo, redo, undoDepth, redoDepth } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import {
  wrapInList,
  splitListItem,
  sinkListItem,
  liftListItem,
} from "prosemirror-schema-list";
import {
  columnResizing,
  tableEditing,
  addRowBefore,
  addRowAfter,
  deleteRow,
  addColumnBefore,
  addColumnAfter,
  deleteColumn,
  mergeCells,
  splitCell,
  deleteTable,
  toggleHeaderRow,
  goToNextCell,
} from "prosemirror-tables";
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  undoInputRule,
  type InputRule,
} from "prosemirror-inputrules";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link,
  Undo2,
  Redo2,
  Table,
  Rows3,
  Columns3,
  Trash2,
  Combine,
  Split,
  PanelTop,
  ChevronRight,
} from "lucide";
import {
  richTextSchema as schema,
  richTextBlockCommand,
  richTextNode,
  richTextDocument,
  richTextLinkUrl,
  richTextEmpty,
  type RichTextDocument,
} from "./rich-text";
import {
  mountEditorForm,
  mountEditorToolbar,
  syncEditorToolbar,
  escapeEditorText as escape,
  type EditorFormOptions,
} from "./editor-form";
import {
  renderEditorMarkup,
  syncEditorMarkup,
  editorIcon,
  type EditorToolbarAction,
} from "./editor-markup";

export type RichTextAction =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "heading"
  | "bulletList"
  | "orderedList"
  | "quote"
  | "link"
  | "undo"
  | "redo"
  | "table"
  | "rowBefore"
  | "rowAfter"
  | "deleteRow"
  | "columnBefore"
  | "columnAfter"
  | "deleteColumn"
  | "mergeCells"
  | "splitCell"
  | "headerRow"
  | "deleteTable";
export interface RichTextEditorHandle {
  view: EditorView;
  focus(): void;
  run(action: RichTextAction): boolean;
  setLink(href: string | null): boolean;
  insertTable(options?: {
    rows?: number;
    columns?: number;
    headerRow?: boolean;
  }): boolean;
}
export interface RichTextEditorProps extends EditorFormOptions {
  value?: RichTextDocument;
  defaultValue?: RichTextDocument;
  onValueChange?: (value: RichTextDocument) => void;
  plugins?: readonly Plugin[];
  nodeViews?: Record<string, NodeViewConstructor>;
  tableResizable?: boolean;
  inputRules?: false | readonly InputRule[];
  onReady?: (handle: RichTextEditorHandle) => void | (() => void);
  labels?: Partial<Record<RichTextAction, string>> & {
    keyboardHint?: string;
    tableTools?: string;
    linkUrl?: string;
    applyLink?: string;
    removeLink?: string;
    cancel?: string;
    invalidLink?: string;
    documentChanged?: string;
  };
}
const names: Record<RichTextAction, string> = {
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  strike: "Strikethrough",
  code: "Inline code",
  heading: "Heading",
  bulletList: "Bullet list",
  orderedList: "Numbered list",
  quote: "Block quote",
  link: "Link",
  undo: "Undo",
  redo: "Redo",
  table: "Insert table",
  rowBefore: "Insert row above",
  rowAfter: "Insert row below",
  deleteRow: "Delete row",
  columnBefore: "Insert column before",
  columnAfter: "Insert column after",
  deleteColumn: "Delete column",
  mergeCells: "Merge cells",
  splitCell: "Split cell",
  headerRow: "Toggle header row",
  deleteTable: "Delete table",
};
const icons = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strike: Strikethrough,
  code: Code,
  heading: Heading2,
  bulletList: List,
  orderedList: ListOrdered,
  quote: Quote,
  link: Link,
  undo: Undo2,
  redo: Redo2,
  table: Table,
  rowBefore: Rows3,
  rowAfter: Rows3,
  deleteRow: Trash2,
  columnBefore: Columns3,
  columnAfter: Columns3,
  deleteColumn: Trash2,
  mergeCells: Combine,
  splitCell: Split,
  headerRow: PanelTop,
  deleteTable: Trash2,
};
const primary: readonly RichTextAction[] = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "heading",
  "bulletList",
  "orderedList",
  "quote",
  "link",
  "undo",
  "redo",
  "table",
];
const tableActions: readonly RichTextAction[] = [
  "rowBefore",
  "rowAfter",
  "deleteRow",
  "columnBefore",
  "columnAfter",
  "deleteColumn",
  "mergeCells",
  "splitCell",
  "headerRow",
  "deleteTable",
];
const label = (props: RichTextEditorProps, action: RichTextAction) =>
  props.labels?.[action] ?? names[action];

function richFallback(node: ReturnType<typeof richTextNode>): string {
  if (node.isText) {
    let value = escape(node.text ?? "");
    for (const mark of node.marks) {
      if (mark.type.name === "link")
        value = `<a href="${escape(String(mark.attrs.href))}" rel="noopener noreferrer">${value}</a>`;
      else {
        const tag = {
          strong: "strong",
          em: "em",
          code: "code",
          underline: "u",
          strike: "s",
        }[mark.type.name];
        if (tag) value = `<${tag}>${value}</${tag}>`;
      }
    }
    return value;
  }
  let content = "";
  node.forEach((child) => {
    content += richFallback(child);
  });
  switch (node.type.name) {
    case "doc":
      return content;
    case "paragraph":
      return `<p>${content || "<br>"}</p>`;
    case "heading":
      return `<h${node.attrs.level}>${content}</h${node.attrs.level}>`;
    case "blockquote":
      return `<blockquote>${content}</blockquote>`;
    case "bullet_list":
      return `<ul>${content}</ul>`;
    case "ordered_list":
      return `<ol start="${Number(node.attrs.order)}">${content}</ol>`;
    case "list_item":
      return `<li>${content}</li>`;
    case "code_block":
      return `<pre><code>${content}</code></pre>`;
    case "hard_break":
      return "<br>";
    case "horizontal_rule":
      return "<hr>";
    case "table":
      return `<table><tbody>${content}</tbody></table>`;
    case "table_row":
      return `<tr>${content}</tr>`;
    case "table_header":
      return `<th colspan="${node.attrs.colspan}" rowspan="${node.attrs.rowspan}">${content}</th>`;
    case "table_cell":
      return `<td colspan="${node.attrs.colspan}" rowspan="${node.attrs.rowspan}">${content}</td>`;
    default:
      throw new TypeError("Unsupported rich text node");
  }
}
export function renderRichTextEditorMarkup(
  props: RichTextEditorProps,
  id: string,
): string {
  const doc = richTextNode(props.value ?? props.defaultValue);
  const actions: EditorToolbarAction[] = primary.map((key) => ({
    key,
    label: label(props, key),
    icon: icons[key],
  }));
  const tableTools = `<details data-part="table-tools"><summary>${editorIcon(ChevronRight)}<span data-part="table-tools-label">${escape(props.labels?.tableTools ?? "Table options")}</span></summary><div role="toolbar" data-part="table-toolbar" aria-label="${escape(props.labels?.tableTools ?? "Table options")}">${tableActions.map((key, index) => `<button type="button" data-action="${key}" aria-label="${escape(label(props, key))}" title="${escape(label(props, key))}" tabindex="${index === 0 ? 0 : -1}" disabled>${editorIcon(icons[key])}<span>${escape(label(props, key))}</span></button>`).join("")}</div></details>`;
  const links = `<fieldset data-part="link-editor" hidden><legend>${escape(label(props, "link"))}</legend><label for="${escape(id)}-link">${escape(props.labels?.linkUrl ?? "Link URL")}</label><input id="${escape(id)}-link" type="text" inputmode="url" data-part="link-url" aria-describedby="${escape(id)}-link-error"><p data-part="link-error" id="${escape(id)}-link-error" role="alert" hidden></p><div data-part="link-actions"><button type="button" data-link="apply">${escape(props.labels?.applyLink ?? "Apply link")}</button><button type="button" data-link="remove">${escape(props.labels?.removeLink ?? "Remove link")}</button><button type="button" data-link="cancel">${escape(props.labels?.cancel ?? "Cancel")}</button></div></fieldset>`;
  return renderEditorMarkup(
    props,
    id,
    "rich",
    JSON.stringify(richTextDocument(doc)),
    richFallback(doc),
    actions,
    props.labels?.keyboardHint ??
      "Use Ctrl/⌘ B or I for formatting; Ctrl/⌘ Z to undo.",
    tableTools + links,
  );
}
function tableDocument(rows: number, columns: number, header: boolean) {
  if (
    !Number.isInteger(rows) ||
    !Number.isInteger(columns) ||
    rows < 1 ||
    columns < 1 ||
    rows > 100 ||
    columns > 100 ||
    rows * columns > 1000
  )
    throw new RangeError("Table size must be1..100 and at most1000cells");
  return schema.nodes.table.create(
    null,
    Array.from({ length: rows }, (_, row) =>
      schema.nodes.table_row.create(
        null,
        Array.from({ length: columns }, () =>
          (header && row === 0
            ? schema.nodes.table_header
            : schema.nodes.table_cell
          ).createAndFill()!,
        ),
      ),
    ),
  );
}
export function mountRichTextEditor(
  root: HTMLElement,
  get: () => RichTextEditorProps,
) {
  const win = root.ownerDocument.defaultView,
    host = root.querySelector<HTMLElement>('[data-part="engine"]');
  if (!win || !host) throw new Error("Rich text editor mount missing");
  let disposed = false,
    frame = 0,
    before: EditorState | undefined,
    plugins = get().plugins,
    resizable = get().tableResizable,
    rules = get().inputRules;
  let linkSelection: Selection | undefined,
    linkDocument: ReturnType<typeof richTextNode> | undefined;
  const listCommand =
    (name: "bullet_list" | "ordered_list"): Command =>
    (state, dispatch, activeView) => {
      const from = state.selection.$from;
      for (let depth = from.depth; depth > 0; depth--) {
        const current = from.node(depth);
        if (
          current.type !== schema.nodes.bullet_list &&
          current.type !== schema.nodes.ordered_list
        )
          continue;
        if (current.type === schema.nodes[name])
          return liftListItem(schema.nodes.list_item)(
            state,
            dispatch,
            activeView,
          );
        if (dispatch)
          dispatch(
            state.tr
              .setNodeMarkup(from.before(depth), schema.nodes[name])
              .scrollIntoView(),
          );
        return true;
      }
      return wrapInList(schema.nodes[name])(state, dispatch, activeView);
    };
  const commands: Partial<Record<RichTextAction, Command>> = {
    bold: toggleMark(schema.marks.strong),
    italic: toggleMark(schema.marks.em),
    underline: toggleMark(schema.marks.underline),
    strike: toggleMark(schema.marks.strike),
    code: toggleMark(schema.marks.code),
    heading: richTextBlockCommand((state, dispatch) =>
      setBlockType(
        schema.nodes[
          state.selection.$from.parent.type.name === "heading"
            ? "paragraph"
            : "heading"
        ],
        { level: 2 },
      )(state, dispatch),
    ),
    bulletList: richTextBlockCommand(listCommand("bullet_list"), true),
    orderedList: richTextBlockCommand(listCommand("ordered_list"), true),
    quote: richTextBlockCommand(wrapIn(schema.nodes.blockquote)),
    undo,
    redo,
    rowBefore: addRowBefore,
    rowAfter: addRowAfter,
    deleteRow,
    columnBefore: addColumnBefore,
    columnAfter: addColumnAfter,
    deleteColumn,
    mergeCells,
    splitCell,
    headerRow: toggleHeaderRow,
    deleteTable,
  };
  const editingOnly =
    (command: Command): Command =>
    (state, dispatch, activeView) =>
      !get().disabled &&
      !get().readOnly &&
      command(state, dispatch, activeView);
  const guardedKeys = (keys: Record<string, Command>) =>
    Object.fromEntries(
      Object.entries(keys).map(([key, command]) => [
        key,
        key === "Mod-a" ? command : editingOnly(command),
      ]),
    );
  const standardRules = [
    wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
    wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list),
    wrappingInputRule(
      /^(\d+)\.\s$/,
      schema.nodes.ordered_list,
      (match) => ({ order: Number(match[1]) }),
      (match, node) => node.childCount + node.attrs.order === Number(match[1]),
    ),
    textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, (match) => ({
      level: match[1].length,
    })),
    textblockTypeInputRule(/^```$/, schema.nodes.code_block),
  ];
  const basicPlugins = (): Plugin[] => [
    ...(get().inputRules === false
      ? []
      : [inputRules({ rules: [...(get().inputRules || standardRules)] })]),
    history(),
    keymap(
      guardedKeys({
        "Mod-b": commands.bold!,
        "Mod-i": commands.italic!,
        "Mod-u": commands.underline!,
        "Mod-`": commands.code!,
        "Mod-z": undo,
        "Mod-Shift-z": redo,
        "Mod-y": redo,
        Backspace: chainCommands(undoInputRule, baseKeymap.Backspace!),
        Enter: chainCommands(
          splitListItem(schema.nodes.list_item),
          baseKeymap.Enter!,
        ),
        Tab: chainCommands(
          goToNextCell(1),
          sinkListItem(schema.nodes.list_item),
        ),
        "Shift-Tab": chainCommands(
          goToNextCell(-1),
          liftListItem(schema.nodes.list_item),
        ),
      }),
    ),
    keymap(guardedKeys(baseKeymap)),
    ...(get().tableResizable === false ? [] : [columnResizing()]),
    tableEditing(),
    ...(get().plugins ?? []),
  ];
  const create = (doc: ReturnType<typeof richTextNode>) =>
    EditorState.create({ doc, plugins: basicPlugins() });
  const schedule = () => {
    if (disposed) return;
    win.cancelAnimationFrame(frame);
    // DOM 观察产生的输入回调可能晚于当前帧；先让框架提交新值再确认拒绝。
    frame = win.requestAnimationFrame(() => {
      frame = win.requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    });
  };
  const view = new EditorView(host, {
    state: create(richTextNode(get().value ?? get().defaultValue)),
    editable: () => !get().disabled && !get().readOnly,
    nodeViews: get().nodeViews,
    dispatchTransaction(transaction) {
      if (disposed) return;
      const previous = view.state;
      view.updateState(view.state.apply(transaction));
      if (!previous.doc.eq(view.state.doc)) {
        before ??= previous;
        try {
          get().onValueChange?.(richTextDocument(view.state.doc));
        } finally {
          schedule();
        }
      } else schedule();
    },
  });
  const form = mountEditorForm(
    root,
    get,
    () => view.focus(),
    () => {
      before ??= view.state;
      view.updateState(create(richTextNode(get().defaultValue)));
      get().onValueChange?.(richTextDocument(view.state.doc));
      schedule();
    },
  );
  const linkEditor = root.querySelector<HTMLFieldSetElement>(
      '[data-part="link-editor"]',
    )!,
    linkUrl = linkEditor.querySelector<HTMLInputElement>(
      '[data-part="link-url"]',
    )!,
    linkError = linkEditor.querySelector<HTMLElement>(
      '[data-part="link-error"]',
    )!;
  const closeLink = () => {
    linkEditor.hidden = true;
    linkError.hidden = true;
    linkSelection = undefined;
    linkDocument = undefined;
    view.focus();
  };
  const openLink = () => {
    if (get().disabled || get().readOnly) return;
    linkSelection = view.state.selection;
    linkDocument = view.state.doc;
    const mark = (
      view.state.storedMarks ?? view.state.selection.$from.marks()
    ).find((mark) => mark.type === schema.marks.link);
    linkUrl.value = mark?.attrs.href ?? "";
    linkUrl.removeAttribute("aria-invalid");
    linkError.hidden = true;
    linkEditor.hidden = false;
    linkUrl.focus();
  };
  const handle: RichTextEditorHandle = {
    view,
    focus: () => {
      if (!disposed && !get().disabled) view.focus();
    },
    run(action) {
      if (disposed || get().disabled || get().readOnly) return false;
      if (action === "link") {
        openLink();
        return true;
      }
      if (action === "table") return handle.insertTable();
      const command = commands[action];
      return command ? command(view.state, view.dispatch, view) : false;
    },
    setLink(href) {
      if (disposed || get().disabled || get().readOnly) return false;
      const url = href === null ? null : richTextLinkUrl(href);
      if (url === undefined) return false;
      const { from, to, empty } = view.state.selection,
        mark = schema.marks.link;
      let tr = view.state.tr;
      if (empty)
        tr =
          url === null
            ? tr.removeStoredMark(mark)
            : tr.addStoredMark(mark.create({ href: url }));
      else {
        tr.removeMark(from, to, mark);
        if (url !== null) tr.addMark(from, to, mark.create({ href: url }));
      }
      view.dispatch(tr);
      return true;
    },
    insertTable(options = {}) {
      if (disposed || get().disabled || get().readOnly) return false;
      const table = tableDocument(
          options.rows ?? 3,
          options.columns ?? 3,
          options.headerRow ?? true,
        ),
        tr = view.state.tr.replaceSelectionWith(table);
      tr.doc.descendants((node, pos) => {
        if (node === table)
          tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 4)));
      });
      view.dispatch(tr.scrollIntoView());
      return true;
    },
  };
  const applyLink = (remove = false) => {
    if (view.state.doc !== linkDocument) {
      linkError.textContent =
        get().labels?.documentChanged ??
        "Document changed; select the text again";
      linkError.hidden = false;
      return;
    }
    if (!remove && !richTextLinkUrl(linkUrl.value)) {
      linkUrl.setAttribute("aria-invalid", "true");
      linkError.textContent =
        get().labels?.invalidLink ??
        "Enter an HTTP, mail, phone or relative link";
      linkError.hidden = false;
      linkUrl.focus();
      return;
    }
    if (linkSelection) view.dispatch(view.state.tr.setSelection(linkSelection));
    if (handle.setLink(remove ? null : linkUrl.value)) closeLink();
  };
  const click = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button");
    if (!button || !root.contains(button) || button.disabled) return;
    if (button.dataset.link) {
      if (button.dataset.link === "cancel") closeLink();
      else applyLink(button.dataset.link === "remove");
      return;
    }
    const key = button.dataset.action;
    if (!key || !(key in names)) return;
    const action =
      primary.find((action) => action === key) ??
      tableActions.find((action) => action === key);
    if (!action) return;
    handle.run(action);
    if (action !== "link") view.focus();
    schedule();
  };
  const linkKeys = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLink();
    } else if (event.key === "Enter" && event.target === linkUrl) {
      event.preventDefault();
      applyLink();
    }
  };
  const press = (event: MouseEvent) => {
    if (
      event.button === 0 &&
      event.target instanceof win.Element &&
      event.target.closest("button[data-action]")
    )
      event.preventDefault();
  };
  root.addEventListener("click", click);
  root.addEventListener("mousedown", press);
  linkEditor.addEventListener("keydown", linkKeys);
  const toolbars = Array.from(
      root.querySelectorAll<HTMLElement>('[role="toolbar"]'),
    ),
    toolbarStops = toolbars.map(mountEditorToolbar);
  root.dataset.mounted = "true";
  const field = root.querySelector<HTMLTextAreaElement>(
    'textarea[data-part="form-value"]',
  )!;
  field.tabIndex = -1;
  field.setAttribute("aria-hidden", "true");
  let viewSettings:
    | {
        disabled: boolean;
        readOnly: boolean;
        required: boolean;
        invalid: boolean;
        nodeViews: RichTextEditorProps["nodeViews"];
      }
    | undefined;
  const sync = () => {
    if (disposed) return;
    const props = get();
    if (view.composing) {
      schedule();
      return;
    }
    syncEditorMarkup(root, props, "Rich text editor");
    const external =
      props.value === undefined ? undefined : richTextNode(props.value);
    if (external && !external.eq(view.state.doc))
      view.updateState(before?.doc.eq(external) ? before : create(external));
    before = undefined;
    if (
      plugins !== props.plugins ||
      resizable !== props.tableResizable ||
      rules !== props.inputRules
    ) {
      plugins = props.plugins;
      resizable = props.tableResizable;
      rules = props.inputRules;
      view.updateState(view.state.reconfigure({ plugins: basicPlugins() }));
    }
    const settings = {
      disabled: !!props.disabled,
      readOnly: !!props.readOnly,
      required: !!props.required,
      invalid: !!props.error,
      nodeViews: props.nodeViews,
    };
    // 重复 setProps 会在 Firefox 原生输入的 DOM 提交期间触发引擎重绘。
    if (
      !viewSettings ||
      settings.disabled !== viewSettings.disabled ||
      settings.readOnly !== viewSettings.readOnly ||
      settings.required !== viewSettings.required ||
      settings.invalid !== viewSettings.invalid ||
      settings.nodeViews !== viewSettings.nodeViews
    ) {
      viewSettings = settings;
      view.setProps({
        editable: () => !get().disabled && !get().readOnly,
        nodeViews: props.nodeViews,
        attributes: {
          role: "textbox",
          "aria-multiline": "true",
          "aria-labelledby": root.id + "-label",
          "aria-describedby": ["description", "error", "keyboard"]
            .map((part) => root.id + "-" + part)
            .join(" "),
          "aria-required": String(!!props.required),
          "aria-invalid": String(!!props.error),
          "aria-readonly": String(!!props.readOnly),
          "aria-disabled": String(!!props.disabled),
          tabindex: props.disabled ? "-1" : "0",
        },
      });
    }
    form.sync(
      JSON.stringify(richTextDocument(view.state.doc)),
      richTextEmpty(view.state.doc),
      props.requiredMessage ?? "Enter content",
    );
    for (const button of Array.from(
      root.querySelectorAll<HTMLButtonElement>("button[data-action]"),
    )) {
      const action =
        primary.find((action) => action === button.dataset.action) ??
        tableActions.find((action) => action === button.dataset.action);
      if (!action) continue;
      button.disabled =
        !!props.disabled ||
        !!props.readOnly ||
        (action === "undo"
          ? undoDepth(view.state) === 0
          : action === "redo"
            ? redoDepth(view.state) === 0
            : commands[action]
              ? !commands[action]!(view.state)
              : false);
      button.setAttribute("aria-label", label(props, action));
      button.title = label(props, action);
      const text = button.querySelector("span");
      if (text) text.textContent = label(props, action);
      const mark =
        action === "bold"
          ? schema.marks.strong
          : action === "italic"
            ? schema.marks.em
            : action === "underline"
              ? schema.marks.underline
              : action === "strike"
                ? schema.marks.strike
                : action === "code"
                  ? schema.marks.code
                  : action === "link"
                    ? schema.marks.link
                    : undefined;
      if (mark)
        button.setAttribute(
          "aria-pressed",
          String(
            view.state.selection.empty
              ? !!mark.isInSet(
                  view.state.storedMarks ?? view.state.selection.$from.marks(),
                )
              : view.state.doc.rangeHasMark(
                  view.state.selection.from,
                  view.state.selection.to,
                  mark,
                ),
          ),
        );
    }
    const hint = root.querySelector<HTMLElement>('[data-part="keyboard-hint"]');
    if (hint)
      hint.textContent =
        props.labels?.keyboardHint ??
        "Use Ctrl/⌘ B or I for formatting; Ctrl/⌘ Z to undo.";
    const tableTools = root.querySelector<HTMLElement>(
      '[data-part="table-tools-label"]',
    );
    if (tableTools)
      tableTools.textContent = props.labels?.tableTools ?? "Table options";
    root
      .querySelector('[data-part="table-toolbar"]')
      ?.setAttribute("aria-label", props.labels?.tableTools ?? "Table options");
    const legend = linkEditor.querySelector("legend");
    if (legend) legend.textContent = label(props, "link");
    const urlLabel = linkEditor.querySelector("label");
    if (urlLabel) urlLabel.textContent = props.labels?.linkUrl ?? "Link URL";
    for (const [key, value] of [
      ["apply", props.labels?.applyLink ?? "Apply link"],
      ["remove", props.labels?.removeLink ?? "Remove link"],
      ["cancel", props.labels?.cancel ?? "Cancel"],
    ] as const) {
      const button = linkEditor.querySelector<HTMLButtonElement>(
        `[data-link="${key}"]`,
      );
      if (button) button.textContent = value;
    }
    toolbars.forEach(syncEditorToolbar);
    if ((props.disabled || props.readOnly) && !linkEditor.hidden) {
      linkEditor.hidden = true;
      linkSelection = undefined;
      linkDocument = undefined;
    }
  };
  const focus = () => {
    if (disposed) return;
    if (!before && !view.composing) sync();
    // 外部文档替换后，原生 focus 也应使用引擎选择，避免光标落在段落之外。
    view.focus();
  };
  view.dom.addEventListener("focus", focus);
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
    win?.cancelAnimationFrame(frame);
    view.dom.removeEventListener("focus", focus);
    root.removeEventListener("click", click);
    root.removeEventListener("mousedown", press);
    linkEditor.removeEventListener("keydown", linkKeys);
    toolbarStops.forEach((stop) => stop());
    try {
      readyStop?.();
    } finally {
      form.destroy();
      view.destroy();
      delete root.dataset.mounted;
      field.removeAttribute("aria-hidden");
      field.removeAttribute("tabindex");
    }
  }
  // 合并框架配置更新，保留原生输入期间的待确认值。
  return { sync: schedule, handle, destroy };
}
