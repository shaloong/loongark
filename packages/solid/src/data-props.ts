import type { JSX } from "solid-js";
const empty: JSX.Element = undefined;
export const dataProps = <T extends object>(props: T) => ({
  children: empty,
  ...props,
});
