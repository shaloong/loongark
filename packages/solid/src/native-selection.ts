import { onCleanup } from "solid-js";
import { mountNativeSelection } from "@loongark/kit";
export function nativeSelectionRef(
  read: Parameters<typeof mountNativeSelection>[1],
  forwarded?: HTMLInputElement | ((input: HTMLInputElement) => void),
) {
  let dispose: (() => void) | undefined;
  onCleanup(() => dispose?.());
  return (input: HTMLInputElement) => {
    if (typeof forwarded === "function") forwarded(input);
    dispose?.();
    dispose = mountNativeSelection(input, read);
  };
}
