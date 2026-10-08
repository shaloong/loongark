import { onCleanup, onMount } from "solid-js";
import { mountNativeSelection } from "@loongark/kit";
export function nativeSelectionRef(
  read: Parameters<typeof mountNativeSelection>[1],
  forwarded?: HTMLInputElement | ((input: HTMLInputElement) => void),
) {
  let dispose: (() => void) | undefined;
  let node: HTMLInputElement | undefined;
  let mounted = false;
  const attach = () => {
    dispose?.();
    dispose = node ? mountNativeSelection(node, read) : undefined;
  };
  // ref 发生时属性和父节点可能尚未就绪；挂载后再安装原生行为。
  onMount(() => {
    mounted = true;
    attach();
  });
  onCleanup(() => {
    mounted = false;
    node = undefined;
    dispose?.();
  });
  return (input: HTMLInputElement) => {
    if (typeof forwarded === "function") forwarded(input);
    node = input;
    if (mounted) attach();
  };
}
