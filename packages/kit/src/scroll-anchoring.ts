/** 临时关闭浏览器锚定；仅恢复自己仍持有的内联声明。 */
export function suspendScrollAnchoring(viewport: HTMLElement) {
  const property = "overflow-anchor";
  const style = viewport.style;
  const previous = style.getPropertyValue(property);
  const priority = style.getPropertyPriority(property);
  style.setProperty(property, "none");
  let restored = false;
  return () => {
    if (restored) return;
    restored = true;
    // 不支持该声明的引擎不会接受 none；调用方后续覆盖也不归我们清理。
    if (
      style.getPropertyValue(property) !== "none" ||
      style.getPropertyPriority(property)
    )
      return;
    if (previous) style.setProperty(property, previous, priority);
    else style.removeProperty(property);
  };
}
