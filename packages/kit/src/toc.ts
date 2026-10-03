/** Root 与 Nav 同时存在时保持导航 ID 独立，状态机仍以 Root 为定位参考。 */
export function tocNavId(rootId: unknown) {
  return typeof rootId === "string" ? rootId + "-nav" : undefined;
}
