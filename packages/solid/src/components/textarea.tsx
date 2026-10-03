import {
  splitProps,
  onMount,
  onCleanup,
  createEffect,
  type JSX,
} from "solid-js";
import {
  layoutAttributes,
  mountTextareaAutosize,
  textareaRows,
  type TextareaAutosizeOptions,
} from "@loongark/kit";
export type LoongArkTextareaProps =
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaAutosizeOptions;
export const LoongArkTextarea = (props: LoongArkTextareaProps) => {
  const [local, rest] = splitProps(props, [
    "value",
    "children",
    "readOnly",
    "ref",
    "autoSize",
    "minRows",
    "maxRows",
    "rows",
  ]);
  let element!: HTMLTextAreaElement,
    controller: ReturnType<typeof mountTextareaAutosize> | undefined;
  onMount(() => {
    controller = mountTextareaAutosize(element, () => local);
  });
  createEffect(() => {
    local.value;
    local.autoSize;
    local.minRows;
    local.maxRows;
    queueMicrotask(() => controller?.update());
  });
  onCleanup(() => controller?.destroy());
  return (
    <textarea
      {...layoutAttributes("Textarea")}
      {...rest}
      readOnly={local.readOnly}
      value={local.value}
      data-autosize={local.autoSize ? "true" : undefined}
      rows={local.autoSize ? textareaRows(local).min : local.rows}
      ref={(el) => {
        element = el;
        if (typeof local.ref === "function") local.ref(el);
      }}
    >
      {local.value ?? local.children}
    </textarea>
  );
};
