import { useId, computed, toValue, type MaybeRef } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import {
  useEnvironmentContext,
  DEFAULT_ENVIRONMENT,
} from "@ark-ui/vue/environment";
import { useLocaleContext, DEFAULT_LOCALE } from "@ark-ui/vue/locale";
import type {
  useToc as nativeUseToc,
  UseTocProps,
  UseTocReturn,
} from "@ark-ui/vue/toc";
import { createTocMachine, connectToc, definedTocProps } from "@loongark/kit";
export const useToc = (
  props: MaybeRef<UseTocProps>,
  emits?: Parameters<typeof nativeUseToc>[1],
): UseTocReturn => {
  const id = useId(),
    env = useEnvironmentContext(DEFAULT_ENVIRONMENT),
    locale = useLocaleContext(DEFAULT_LOCALE);
  const machineProps = computed(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env.value.getRootNode,
    scrollBehavior: "auto" as const,
    ...definedTocProps(toValue(props)),
  }));
  const service = useMachine(
    createTocMachine(() => (details) => {
      toValue(props).onActiveChange?.(details);
      emits?.("activeChange", details);
    }),
    machineProps,
  );
  return computed(() => connectToc(service, normalizeProps));
};
