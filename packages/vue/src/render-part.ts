import { createVNode, type VNodeTypes, type VNodeChild } from "vue";
type PartSlots = Record<string, ((...args: never[]) => VNodeChild) | undefined>;
export const renderPart = (
  component: VNodeTypes,
  props?: Record<string, unknown>,
  children?: VNodeChild | PartSlots,
) => {
  let forwarded = props;
  if (component && typeof component === "object" && "props" in component) {
    const nativeProps = component.props;
    const declares = (key: string) =>
      Array.isArray(nativeProps)
        ? nativeProps.includes(key)
        : !!nativeProps &&
          typeof nativeProps === "object" &&
          key in nativeProps;
    if (declares("modelValue") && props?.modelValue === undefined) {
      const alias = ["checked", "step", "pressed", "value"].find(
        (key) => !declares(key) && props?.[key] !== undefined,
      );
      if (alias) {
        forwarded = { ...props, modelValue: props![alias] };
        delete forwarded[alias];
      }
    }
  }
  return createVNode(component, forwarded, children);
};
