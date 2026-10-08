import { useId, useRef } from "react";
import { useMachine, normalizeProps } from "@zag-js/react";
import { useEnvironmentContext } from "@ark-ui/react/environment";
import { useLocaleContext } from "@ark-ui/react/locale";
import type { UseTocProps, UseTocReturn } from "@ark-ui/react/toc";
import { createTocMachine, connectToc, definedTocProps } from "@loongark/kit";
export const useToc = (props: UseTocProps): UseTocReturn => {
  const id = useId(),
    env = useEnvironmentContext(),
    locale = useLocaleContext();
  const callback = useRef(props.onActiveChange);
  callback.current = props.onActiveChange;
  const service = useMachine(
    createTocMachine(() => callback.current),
    {
      id,
      dir: locale.dir,
      getRootNode: env.getRootNode,
      scrollBehavior: "auto",
      ...definedTocProps(props ?? {}),
    },
  );
  return connectToc(service, normalizeProps);
};
