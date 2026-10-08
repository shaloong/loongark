import { createUniqueId, createMemo } from "solid-js";
import { useMachine, normalizeProps } from "@zag-js/solid";
import { useEnvironmentContext } from "@ark-ui/solid/environment";
import { useLocaleContext } from "@ark-ui/solid/locale";
import type { UseTocProps, UseTocReturn } from "@ark-ui/solid/toc";
import { createTocMachine, connectToc, definedTocProps } from "@loongark/kit";
export const useToc = (props?: UseTocProps): UseTocReturn => {
  const id = createUniqueId(),
    env = useEnvironmentContext(),
    locale = useLocaleContext();
  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: env().getRootNode,
    scrollBehavior: "auto" as const,
    items: [],
    ...definedTocProps(props ?? {}),
  }));
  const service = useMachine(
    createTocMachine(() => props?.onActiveChange),
    machineProps,
  );
  return createMemo(() => connectToc(service, normalizeProps));
};
