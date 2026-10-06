import { machine, connect } from "@zag-js/rating-group";
import type { Props } from "@zag-js/rating-group";
/** 去掉未提供的值，保留环境/Field 默认属性。 */
export function definedRatingGroupProps(props: Partial<Props>): Partial<Props> {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  );
}
const hoverState = machine.states?.hover,
  focusState = machine.states?.focus;
if (!hoverState || !focusState)
  throw Error("Unsupported RatingGroup machine contract");
/** 点击使用当前条目；半星只采用当前条目内的悬停值，程序化设置不受悬停影响。 */
export const ratingGroupMachine: typeof machine = {
  ...machine,
  watch(params) {
    machine.watch?.(params);
    params.track([() => params.context.get("value")], () => {
      const control = params.scope.getById<HTMLElement>(
        params.prop("ids")?.control ?? `rating:${params.prop("id")}:control`,
      );
      // 受控值可能在首次 RAF 后才被接受；只同步仍属于该控件的焦点。
      if (control?.contains(params.scope.getActiveElement()))
        params.action(["focusActiveRadio"]);
    });
  },
  states: {
    ...machine.states,
    focus: {
      ...focusState,
      on: {
        ...focusState.on,
        FOCUS: { actions: ["clearHoveredValue"] },
        ARROW_LEFT: {
          actions: ["clearHoveredValue", "setPrevValue", "focusActiveRadio"],
        },
        ARROW_RIGHT: {
          actions: ["clearHoveredValue", "setNextValue", "focusActiveRadio"],
        },
        HOME: {
          actions: ["clearHoveredValue", "setValueToMin", "focusActiveRadio"],
        },
        END: {
          actions: ["clearHoveredValue", "setValueToMax", "focusActiveRadio"],
        },
        SPACE: {
          guard: "isValueEmpty",
          actions: ["clearHoveredValue", "setValue"],
        },
      },
    },
    hover: {
      ...hoverState,
      on: {
        ...hoverState.on,
        FOCUS: { target: "focus", actions: ["clearHoveredValue"] },
      },
    },
  },
  implementations: {
    ...machine.implementations,
    actions: {
      ...machine.implementations?.actions,
      focusActiveRadio({ scope, context, prop, event }) {
        const control = scope.getById<HTMLElement>(
          prop("ids")?.control ?? `rating:${prop("id")}:control`,
        );
        const owned = scope.getActiveElement();
        // 框架可能异步处理按键；在动作开始前已离开控件时也不得重新获取焦点。
        if (event.type !== "CLICK" && !control?.contains(owned)) return;
        scope.getWin().requestAnimationFrame(() => {
          const active = scope.getActiveElement();
          if (
            !control?.isConnected ||
            (active !== owned && !control.contains(active))
          )
            return;
          const index = Math.max(1, Math.ceil(context.get("value")));
          control
            .querySelector<HTMLElement>(
              `[role="radio"][aria-posinset="${index}"]`,
            )
            ?.focus({ preventScroll: true });
        });
      },
      setValue({ context, event, prop }) {
        const hovered = context.get("hoveredValue");
        const useHalf =
          event.type === "CLICK" &&
          prop("allowHalf") &&
          hovered > 0 &&
          Math.ceil(hovered) === event.value;
        context.set("value", useHalf ? hovered : event.value);
      },
    },
  },
};
/** 预览继续使用原生 highlighted；选中语义和键盘入口只反映已接受值。 */
export const connectRatingGroup: typeof connect = (service, normalize) => {
  const value = service.context.get("value");
  const checked = (index: number): boolean =>
    value > 0 && Math.ceil(value) === index;
  const element: typeof normalize.element = (props) => {
    if (props.role !== "radio") return normalize.element(props);
    const index = Number(props["aria-posinset"]),
      selected = checked(index);
    return normalize.element({
      ...props,
      "aria-checked": selected,
      "data-checked": selected ? "" : undefined,
      tabIndex: service.computed("isDisabled")
        ? undefined
        : selected || (value <= 0 && index === 1)
          ? 0
          : -1,
    });
  };
  // NormalizeProps 本身是 Proxy；保留 input/label 等原生分支，不能用对象展开复制。
  const adapter = new Proxy(normalize, {
    get(target, key, receiver) {
      return key === "element" ? element : Reflect.get(target, key, receiver);
    },
  });
  const api = connect(service, adapter);
  return {
    ...api,
    getItemState(props) {
      return { ...api.getItemState(props), checked: checked(props.index) };
    },
  };
};
