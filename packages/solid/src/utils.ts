export const boolAttr = (value?: boolean) => (value ? "true" : undefined);

export const normalizeState = (state?: string) =>
  state && state !== "default" ? state : undefined;
