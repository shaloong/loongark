import {
  createElement,
  forwardRef,
  useRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  type TextareaHTMLAttributes,
} from "react";
import {
  layoutAttributes,
  mountTextareaAutosize,
  textareaRows,
  type TextareaAutosizeOptions,
} from "@loongark/kit";
export type LoongArkTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaAutosizeOptions;
export const LoongArkTextarea = forwardRef<
  HTMLTextAreaElement,
  LoongArkTextareaProps
>(({ autoSize = false, minRows, maxRows, ...props }, ref) => {
  const element = useRef<HTMLTextAreaElement>(null),
    controller = useRef<ReturnType<typeof mountTextareaAutosize> | undefined>(
      undefined,
    );
  const options = useRef({ autoSize, minRows, maxRows });
  options.current = { autoSize, minRows, maxRows };
  useImperativeHandle(ref, () => element.current!);
  useEffect(() => {
    if (!element.current) return;
    controller.current = mountTextareaAutosize(
      element.current,
      () => options.current,
    );
    return () => controller.current?.destroy();
  }, []);
  useLayoutEffect(() => {
    controller.current?.update();
  }, [props.value, props.defaultValue, autoSize, minRows, maxRows, props.rows]);
  return createElement("textarea", {
    ...layoutAttributes("Textarea"),
    ...props,
    ref: element,
    "data-autosize": autoSize ? "true" : undefined,
    rows: autoSize ? textareaRows({ minRows, maxRows }).min : props.rows,
  });
});
LoongArkTextarea.displayName = "LoongArkTextarea";
