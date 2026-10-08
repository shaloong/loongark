import { useMachine, normalizeProps } from "@zag-js/svelte";
import { useEnvironmentContext } from "@ark-ui/svelte/environment";
import { useLocaleContext } from "@ark-ui/svelte/locale";
import type { UseTocProps, UseTocReturn } from "@ark-ui/svelte/toc";
import { createTocMachine, connectToc, definedTocProps } from "@loongark/kit";
export const useToc = (
  props?: UseTocProps | (() => UseTocProps),
): UseTocReturn => {
  const env = useEnvironmentContext(),
    locale = useLocaleContext();
  const resolve = (): UseTocProps =>
    (typeof props === "function" ? props() : props) ?? { items: [] };
  const machineProps = $derived({
    dir: locale().dir,
    getRootNode: env().getRootNode,
    scrollBehavior: "auto" as const,
    ...definedTocProps(resolve()),
  });
  const service = useMachine(
    createTocMachine(() => resolve().onActiveChange),
    () => machineProps,
  );
  const api = $derived(connectToc(service, normalizeProps));
  return () => api;
};
