export const dataProps = <T extends object>(props: T) => ({
  key: undefined,
  ...props,
});
