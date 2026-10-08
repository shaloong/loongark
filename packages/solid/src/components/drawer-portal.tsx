import { Show } from "solid-js";
import { usePresenceContext } from "@ark-ui/solid/presence";
import { LoongArkPortal } from "./portal";
// Solid Portal 会创建包装元素；仅在浮层 Presence 有内容时挂载，避免空包装被外层模态隐藏。
export const DrawerPortal = (props: Parameters<typeof LoongArkPortal>[0]) => {
  const presence = usePresenceContext();
  return (
    <Show when={!presence().unmounted}>
      <LoongArkPortal {...props} />
    </Show>
  );
};
