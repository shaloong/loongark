import {
  defineComponent,
  h,
  shallowRef,
  watchEffect,
  onBeforeUnmount,
  provide,
  inject,
  useId,
  type PropType,
} from "vue";
import {
  createLoongArkTheme,
  type LoongArkTheme,
  type CreateThemeOptions,
} from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit/bootstrap";
export const themeKey = "loongark-theme-scope";
export const LoongArkProvider = defineComponent<CreateThemeOptions>({
  name: "LoongArkProvider",
  props: {
    mode: {
      type: String as PropType<CreateThemeOptions["mode"]>,
      default: "light",
    },
    brand: { type: String as PropType<string | undefined> },
    accent: { type: String as PropType<string | undefined> },
    overrides: { type: Object as PropType<CreateThemeOptions["overrides"]> },
    targetId: String,
    motionPreference: {
      type: String as PropType<CreateThemeOptions["motionPreference"]>,
      default: "auto",
    },
  },
  setup(props, { slots }) {
    const scope = shallowRef<HTMLElement>();
    const scopeId = useId();
    const theme = shallowRef(
      createLoongArkTheme({ ...props, targetId: props.targetId ?? scopeId }),
    );
    provide(themeKey, theme);
    watchEffect((cleanup) => {
      const instance = createLoongArkTheme({
        mode: props.mode,
        brand: props.brand,
        accent: props.accent,
        overrides: props.overrides,
        targetId: props.targetId ?? scopeId,
        motionPreference: props.motionPreference,
      });
      theme.value = instance;
      if (scope.value) {
        instance.mount(scope.value);
        bootstrapKit(instance);
      }
      cleanup(() => instance.unmount());
    });
    onBeforeUnmount(() => theme.value.unmount());
    return () =>
      h(
        "div",
        {
          ref: scope,
          "data-lk-theme": theme.value.id,
          style: { display: "contents" },
        },
        slots.default?.(),
      );
  },
});
export const useOptionalTheme = () => {
  const scope = inject<{ value: LoongArkTheme }>(themeKey);
  const global = inject<LoongArkTheme>("loongark-theme");
  return () => scope?.value ?? global;
};
export const useLoongArkTheme = () => useOptionalTheme()();
