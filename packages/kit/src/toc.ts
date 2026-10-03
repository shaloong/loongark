/** Root 与 Nav 同时存在时保持导航 ID 独立，状态机仍以 Root 为定位参考。 */
export function tocNavId(rootId: unknown) {
  return typeof rootId === "string" ? rootId + "-nav" : undefined;
}

import { machine, connect, props as nativeProps } from "@zag-js/toc";
import type { Props } from "@zag-js/toc";
/** 忽略未提供的控制值，保留生成 ID 与默认值；false、空数组与 null 不被过滤。 */
export function definedTocProps(props: Partial<Props>): Partial<Props> {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  );
}
/** 通过 bindable 的新值通知业务；原生观察器中的旧值回调在属性层禁用。 */
export function createTocMachine(
  callback: () => Props["onActiveChange"],
): typeof machine {
  const nativeContext = machine.context;
  const nativeDefaults = machine.props;
  if (!nativeContext || !nativeDefaults)
    throw new Error("Unsupported Toc machine contract");
  return {
    ...machine,
    props(params) {
      return {
        ...nativeDefaults({
          ...params,
          props: definedTocProps(params.props),
        }),
        onActiveChange: undefined,
      };
    },
    context(params) {
      return {
        ...nativeContext(params),
        activeIds: params.bindable(() => ({
          defaultValue: params.prop("defaultActiveIds") ?? [],
          value: params.prop("activeIds"),
          onChange(activeIds) {
            callback()?.({
              activeIds,
              activeItems: params
                .prop("items")
                .filter((item) => activeIds.includes(item.value)),
            });
          },
        })),
      };
    },
  };
}
export const connectToc: typeof connect = connect;
export const tocControlKeys = nativeProps.filter(
  (key) => key !== "dir" && key !== "getRootNode",
);
