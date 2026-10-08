export const getDataAttrs = (
  scope: string,
  part: string,
  options: Record<string, string | boolean | undefined> = {},
) => ({
  "data-scope": scope,
  "data-part": part,
  ...Object.fromEntries(
    Object.entries(options).map(([key, value]) => [
      `data-${key}`,
      typeof value === "boolean" ? (value ? "true" : undefined) : value,
    ]),
  ),
});
