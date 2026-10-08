import {
  Schema,
  type Node as ProseMirrorNode,
  type Mark,
} from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { tableNodes, TableMap } from "prosemirror-tables";
import { Mapping } from "prosemirror-transform";
import {
  EditorState,
  TextSelection,
  AllSelection,
  type Command,
} from "prosemirror-state";

/** 全选包含块边界；块格式命令使用真实文本端点，合并归一化和格式为一个事务。 */
export function richTextBlockCommand(
  command: Command,
  paragraph = false,
): Command {
  return (state, dispatch, view) => {
    const tr = state.tr;
    if (state.selection instanceof AllSelection) {
      const first = TextSelection.near(state.doc.resolve(0), 1);
      const last = TextSelection.near(
        state.doc.resolve(state.doc.content.size),
        -1,
      );
      if (first instanceof TextSelection && last instanceof TextSelection)
        tr.setSelection(TextSelection.create(tr.doc, first.from, last.to));
    }
    if (paragraph)
      tr.setBlockType(
        tr.selection.from,
        tr.selection.to,
        state.schema.nodes.paragraph,
      );
    const candidate = EditorState.create({
      doc: tr.doc,
      selection: tr.selection,
    });
    return command(
      candidate,
      dispatch
        ? (result) => {
            for (const step of result.steps) tr.step(step);
            tr.setSelection(result.selection.map(tr.doc, new Mapping()));
            dispatch(tr.scrollIntoView());
          }
        : undefined,
      view,
    );
  };
}

export type RichTextAttribute =
  | string
  | number
  | boolean
  | null
  | readonly RichTextAttribute[]
  | { readonly [key: string]: RichTextAttribute };

export interface RichTextMark {
  type: string;
  attrs?: Readonly<Record<string, RichTextAttribute>>;
}
export interface RichTextDocument {
  type: string;
  attrs?: Readonly<Record<string, RichTextAttribute>>;
  text?: string;
  marks?: readonly RichTextMark[];
  content?: readonly RichTextDocument[];
}

/** 仅允许可导航协议；上传和地址重写由调用方承担。 */
export function richTextLinkUrl(value: string): string | undefined {
  const url = value.trim();
  if (!url || /[\u0000-\u0020\u007f]/u.test(url)) return;
  if (/^(https?:|mailto:|tel:)/iu.test(url)) return url;
  if (/^(\/[^/]|#|\.\.?\/)/u.test(url)) return url;
}
const safeLink = {
  ...basicSchema.spec.marks.get("link"),
  attrs: { href: {}, title: { default: null } },
  inclusive: false,
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: (element: HTMLElement) => {
        const href = richTextLinkUrl(element.getAttribute("href") ?? "");
        return href ? { href, title: element.getAttribute("title") } : false;
      },
    },
  ],
  toDOM: (mark: Mark) =>
    [
      "a",
      {
        href: richTextLinkUrl(String(mark.attrs.href)) ?? "#",
        title: mark.attrs.title,
        rel: "noopener noreferrer",
      },
      0,
    ] as const,
};
// 图片加载/上传属于外部契约，基础结构不接受未知 DOM 或节点。
// Schema 构造只产生本地对象，不修改外部注册表；未消费编辑器时可消除。
export const richTextSchema: Schema = /* @__PURE__ */ (() => {
const nodes = addListNodes(
  basicSchema.spec.nodes.remove("image"),
  "paragraph block*",
  "block",
).append(
  tableNodes({
    tableGroup: "block",
    cellContent: "block+",
    cellAttributes: {},
  }),
);
return new Schema({
  nodes,
  marks: basicSchema.spec.marks.update("link", safeLink).append({
    underline: { parseDOM: [{ tag: "u" }], toDOM: () => ["u", 0] },
    strike: {
      parseDOM: [{ tag: "s" }, { tag: "del" }],
      toDOM: () => ["s", 0],
    },
  }),
});
})();
export const emptyRichTextDocument: RichTextDocument = /* @__PURE__ */ Object.freeze({
  type: "doc",
  content: /* @__PURE__ */ Object.freeze([/* @__PURE__ */ Object.freeze({ type: "paragraph" })]),
});

export function richTextNode(
  document: RichTextDocument = emptyRichTextDocument,
): ProseMirrorNode {
  let count = 0,
    characters = 0;
  const visit = (node: RichTextDocument, depth: number): void => {
    if (++count > 10000 || depth > 100)
      throw new RangeError("Rich text document is too large");
    if (!richTextSchema.nodes[node.type])
      throw new TypeError(`Unsupported rich text node: ${node.type}`);
    if (
      node.type === "heading" &&
      (!Number.isInteger(node.attrs?.level ?? 1) ||
        Number(node.attrs?.level ?? 1) < 1 ||
        Number(node.attrs?.level ?? 1) > 6)
    )
      throw new TypeError("Invalid heading level");
    if (node.type === "table_cell" || node.type === "table_header") {
      for (const key of ["colspan", "rowspan"]) {
        const value = node.attrs?.[key] ?? 1;
        if (
          typeof value !== "number" ||
          !Number.isInteger(value) ||
          value < 1 ||
          value > 1000
        )
          throw new TypeError("Invalid table span");
      }
      const widths = node.attrs?.colwidth;
      if (
        widths !== undefined &&
        widths !== null &&
        (!Array.isArray(widths) ||
          widths.length !== (node.attrs?.colspan ?? 1) ||
          widths.some(
            (width) =>
              typeof width !== "number" ||
              !Number.isFinite(width) ||
              width < 0 ||
              width > 10000,
          ))
      )
        throw new TypeError("Invalid table column width");
    }
    if (
      node.type === "ordered_list" &&
      (!Number.isInteger(node.attrs?.order ?? 1) ||
        Number(node.attrs?.order ?? 1) < 1 ||
        Number(node.attrs?.order ?? 1) > 1000000)
    )
      throw new TypeError("Invalid list order");
    characters += node.text?.length ?? 0;
    if (characters > 1048576)
      throw new RangeError("Rich text document is too large");
    for (const mark of node.marks ?? []) {
      if (!richTextSchema.marks[mark.type])
        throw new TypeError(`Unsupported rich text mark: ${mark.type}`);
      if (
        mark.type === "link" &&
        !richTextLinkUrl(String(mark.attrs?.href ?? ""))
      )
        throw new TypeError("Invalid rich text link");
    }
    for (const child of node.content ?? []) visit(child, depth + 1);
  };
  visit(document, 0);
  if (document.type !== "doc")
    throw new TypeError("Rich text root must be doc");
  const parsed = richTextSchema.nodeFromJSON(structuredClone(document));
  parsed.check();
  parsed.descendants((node) => {
    if (node.type.name === "table" && TableMap.get(node).problems?.length)
      throw new TypeError("Invalid table geometry");
  });
  return parsed;
}
export function richTextDocument(node: ProseMirrorNode): RichTextDocument {
  const attrs = Object.keys(node.attrs).length
    ? structuredClone(node.attrs)
    : undefined;
  const marks = node.marks.map((mark) => ({
    type: mark.type.name,
    ...(Object.keys(mark.attrs).length
      ? { attrs: structuredClone(mark.attrs) }
      : {}),
  }));
  const content: RichTextDocument[] = [];
  node.forEach((child) => content.push(richTextDocument(child)));
  return {
    type: node.type.name,
    ...(attrs ? { attrs } : {}),
    ...(node.isText ? { text: node.text ?? "" } : {}),
    ...(marks.length ? { marks } : {}),
    ...(content.length ? { content } : {}),
  };
}
export function richTextEmpty(node: ProseMirrorNode): boolean {
  return node.textContent.trim().length === 0;
}
