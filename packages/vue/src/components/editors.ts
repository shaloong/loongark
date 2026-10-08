import {
  defineComponent,
  h,
  ref,
  useId,
  onMounted,
  onBeforeUnmount,
  watchPostEffect,
  type PropType,
} from "vue";
import {
  renderCodeEditorMarkup,
  mountCodeEditor,
  renderRichTextEditorMarkup,
  mountRichTextEditor,
  type CodeEditorProps,
  type RichTextEditorProps,
  type EditorFormOptions,
} from "@loongark/kit";
const flag = { type: Boolean, default: undefined };
const common = {
  id: String,
  dir: String as PropType<"ltr" | "rtl">,
  minRows: Number,
  name: String,
  form: String,
  required: flag,
  disabled: flag,
  readOnly: flag,
  label: String,
  description: String,
  error: String,
  requiredMessage: String,
};
function useEditor<P extends EditorFormOptions>(
  get: () => P,
  kind: "code" | "rich",
  render: (props: P, id: string) => string,
  mount: (root: HTMLElement, get: () => P) => { sync(): void; destroy(): void },
  attrs: Record<string, unknown>,
) {
  const root = ref<HTMLDivElement>(),
    id = get().id ?? useId(),
    markup = render(get(), id);
  let controller: ReturnType<typeof mount> | undefined;
  onMounted(() => {
    if (root.value) controller = mount(root.value, get);
  });
  watchPostEffect(() => {
    get();
    controller?.sync();
  });
  onBeforeUnmount(() => {
    controller?.destroy();
    controller = undefined;
  });
  return () =>
    h("div", {
      ...attrs,
      ref: root,
      id,
      "data-scope": "editor",
      "data-kind": kind,
      dir: get().dir,
      innerHTML: markup,
    });
}
export const LoongArkCodeEditor = /* @__PURE__ */ defineComponent({
  name: "LoongArkCodeEditor",
  inheritAttrs: false,
  props: {
    ...common,
    value: String,
    defaultValue: String,
    language: [String, Function] as PropType<CodeEditorProps["language"]>,
    placeholder: String,
    lineNumbers: flag,
    lineWrapping: flag,
    tabSize: Number,
    extensions: Array as PropType<CodeEditorProps["extensions"]>,
    phrases: Object as PropType<CodeEditorProps["phrases"]>,
    labels: Object as PropType<CodeEditorProps["labels"]>,
    onReady: Function as PropType<CodeEditorProps["onReady"]>,
    onLanguageError: Function as PropType<CodeEditorProps["onLanguageError"]>,
    onValueChange: Function as PropType<CodeEditorProps["onValueChange"]>,
  },
  emits: {
    "update:value": (value: string) => typeof value === "string",
    valueChange: (value: string, selection: { anchor: number; head: number }) =>
      typeof value === "string" && Number.isFinite(selection.head),
  },
  setup(props, { attrs, emit }) {
    const options = (): CodeEditorProps => ({
      ...props,
      onValueChange(value, selection) {
        emit("update:value", value);
        emit("valueChange", value, selection);
      },
    });
    return useEditor(
      options,
      "code",
      renderCodeEditorMarkup,
      mountCodeEditor,
      attrs,
    );
  },
});
export const LoongArkRichTextEditor = /* @__PURE__ */ defineComponent({
  name: "LoongArkRichTextEditor",
  inheritAttrs: false,
  props: {
    ...common,
    value: Object as PropType<RichTextEditorProps["value"]>,
    defaultValue: Object as PropType<RichTextEditorProps["defaultValue"]>,
    plugins: Array as PropType<RichTextEditorProps["plugins"]>,
    nodeViews: Object as PropType<RichTextEditorProps["nodeViews"]>,
    tableResizable: flag,
    inputRules: {type:[Array,Boolean] as PropType<RichTextEditorProps["inputRules"]>,default:undefined},
    labels: Object as PropType<RichTextEditorProps["labels"]>,
    onReady: Function as PropType<RichTextEditorProps["onReady"]>,
    onValueChange: Function as PropType<RichTextEditorProps["onValueChange"]>,
  },
  emits: {
    "update:value": (value: NonNullable<RichTextEditorProps["value"]>) =>
      value.type === "doc",
    valueChange: (value: NonNullable<RichTextEditorProps["value"]>) =>
      value.type === "doc",
  },
  setup(props, { attrs, emit }) {
    const options = (): RichTextEditorProps => ({
      ...props,
      onValueChange(value) {
        emit("update:value", value);
        emit("valueChange", value);
      },
    });
    return useEditor(
      options,
      "rich",
      renderRichTextEditorMarkup,
      mountRichTextEditor,
      attrs,
    );
  },
});
