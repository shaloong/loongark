import { onMounted, onBeforeUnmount } from "vue";
import { mountNativeSelection } from "@loongark/kit";
export function nativeSelectionRef(
  read: Parameters<typeof mountNativeSelection>[1],
) {
  let input: HTMLInputElement | undefined,
    dispose: (() => void) | undefined,
    mounted = false;
  const mount = () => {
    dispose?.();
    dispose = input ? mountNativeSelection(input, read) : undefined;
  };
  onMounted(() => {
    mounted = true;
    mount();
  });
  onBeforeUnmount(() => {
    mounted = false;
    dispose?.();
  });
  return (value: unknown) => {
    const node =
      value && typeof value === "object" && "$el" in value ? value.$el : value;
    const next =
      node &&
      typeof node === "object" &&
      "tagName" in node &&
      node.tagName === "INPUT"
        ? (node as HTMLInputElement)
        : undefined;
    if (next === input) return;
    input = next;
    if (mounted) mount();
  };
}
