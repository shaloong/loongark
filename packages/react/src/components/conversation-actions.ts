import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  createConversationActionController,
  type ConversationActionState,
  type ConversationAction,
  type ConversationActionLabels,
} from "@loongark/kit";
const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
/** StrictMode 的二次挂载创建新控制器，避免复用已销毁实例。 */
export function useConversationActions(actionKey?: string | number) {
  const [state, setState] = useState<ConversationActionState>({});
  const controller = useRef<
    ReturnType<typeof createConversationActionController> | undefined
  >(undefined);
  useClientLayoutEffect(() => {
    const current = createConversationActionController(setState);
    controller.current = current;
    setState({});
    return () => {
      current.dispose();
      if (controller.current === current) controller.current = undefined;
    };
  }, [actionKey]);
  return {
    state,
    run: (action: ConversationAction, labels?: ConversationActionLabels) => {
      void controller.current?.run(action, labels);
    },
  };
}
