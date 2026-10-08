import {
  useEffect,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
} from "react";
import { mountNativeSelection } from "@loongark/kit";
type State = {
  getRootProps?: () => { "aria-readonly"?: unknown };
  checked?: boolean;
  indeterminate?: boolean;
  value?: unknown;
  valueAsString?: string;
};
export function useNativeSelection(
  api: State,
  kind: "checkbox" | "radio" | "tags",
  ref: ForwardedRef<HTMLInputElement>,
) {
  const input = useRef<HTMLInputElement | null>(null),
    latest = useRef(api);
  latest.current = api;
  useImperativeHandle(ref, () => input.current!);
  useEffect(() => {
    if (!input.current) return;
    return mountNativeSelection(input.current, () =>
      kind === "tags"
        ? {
            formValue: latest.current.valueAsString ?? "",
          }
        : kind === "radio"
          ? {
              radioValue: latest.current.value as string | null | undefined,
              readOnly:
                String(latest.current.getRootProps?.()["aria-readonly"]) ===
                "true",
            }
          : latest.current,
    );
  }, [kind]);
  return input;
}
