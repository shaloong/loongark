import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  watchPostEffect,
  type PropType,
} from "vue";
import {
  layoutAttributes,
  mountTextareaAutosize,
  textareaRows,
} from "@loongark/kit";
export const LoongArkTextarea = defineComponent({
  name: "LoongArkTextarea",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    autoSize: { type: Boolean, default: false },
    minRows: Number,
    maxRows: Number,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, expose }) {
    const element = ref<HTMLTextAreaElement>(),
      controller = ref<ReturnType<typeof mountTextareaAutosize>>();
    onMounted(() => {
      if (element.value)
        controller.value = mountTextareaAutosize(element.value, () => props);
    });
    onBeforeUnmount(() => controller.value?.destroy());
    watchPostEffect(() => {
      props.modelValue;
      props.autoSize;
      props.minRows;
      props.maxRows;
      attrs.value;
      controller.value?.update();
    });
    expose({ element, focus: () => element.value?.focus() });
    return () =>
      h("textarea", {
        ...layoutAttributes("Textarea"),
        ...attrs,
        ref: element,
        "data-autosize": props.autoSize ? "true" : undefined,
        rows: props.autoSize ? textareaRows(props).min : attrs.rows,
        ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
        onInput: (event: Event) => {
          emit(
            "update:modelValue",
            (event.target as HTMLTextAreaElement).value,
          );
          const handlers = attrs.onInput;
          if (Array.isArray(handlers))
            handlers.forEach((handler) => handler(event));
          else if (typeof handlers === "function") handlers(event);
        },
      });
  },
});
