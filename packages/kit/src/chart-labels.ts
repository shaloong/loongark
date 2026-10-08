/** SVG 的 SSR 估算不能反映用户字号；挂载后只缩短实际越界的轴文字，保留完整 title。 */
export function mountChartAxisLabels(root: HTMLElement) {
  const win = root.ownerDocument.defaultView!;
  const originals = new WeakMap<Text, string>();
  let frame = 0,
    disposed = false;
  const shorten = (label: SVGTextElement, available: number) => {
    const text = Array.from(label.childNodes).find(
      (node): node is Text => node.nodeType === 3,
    );
    if (!text) return;
    if (!originals.has(text)) originals.set(text, text.data);
    const original = originals.get(text)!;
    text.data = original;
    if (label.getComputedTextLength() <= available) return;
    const characters = Array.from(
      new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
        original.replace(/…$/, ""),
      ),
      (part) => part.segment,
    );
    let low = 0,
      high = characters.length;
    text.data = "…";
    if (label.getComputedTextLength() > available) {
      text.data = "";
      return;
    }
    while (low < high) {
      const length = Math.ceil((low + high) / 2);
      text.data = characters.slice(0, length).join("") + "…";
      if (label.getComputedTextLength() <= available) low = length;
      else high = length - 1;
    }
    text.data = characters.slice(0, low).join("") + "…";
  };
  const fit = () => {
    frame = 0;
    if (disposed || !root.isConnected) return;
    const labels = Array.from(
      root.querySelectorAll<SVGTextElement>(
        'svg > text[data-part="category-label"]',
      ),
    );
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i],
        svg = label.ownerSVGElement;
      if (!svg) continue;
      const x = Number(label.getAttribute("x"));
      const previous = i ? Number(labels[i - 1].getAttribute("x")) : undefined;
      const next =
        i + 1 < labels.length
          ? Number(labels[i + 1].getAttribute("x"))
          : undefined;
      const left = previous === undefined ? 4 : (previous + x) / 2 + 4;
      const right =
        next === undefined ? svg.viewBox.baseVal.width - 4 : (next + x) / 2 - 4;
      const anchor = label.getAttribute("text-anchor");
      const available = Math.max(
        0,
        anchor === "start"
          ? right - x
          : anchor === "end"
            ? x - left
            : 2 * Math.min(x - left, right - x),
      );
      shorten(label, available);
    }
    for (const label of Array.from(
      root.querySelectorAll<SVGTextElement>(
        'svg > text[data-part="value-label"]',
      ),
    )) {
      shorten(label, Math.max(0, Number(label.getAttribute("x")) - 4));
    }
  };
  const schedule = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(fit);
  };
  const resize = new win.ResizeObserver(schedule);
  const refresh = () => {
    resize.disconnect();
    resize.observe(root);
    root
      .querySelectorAll(
        'svg > text:is([data-part="category-label"],[data-part="value-label"])',
      )
      .forEach((label) => resize.observe(label));
    schedule();
  };
  refresh();
  void root.ownerDocument.fonts.ready.then(schedule);
  return {
    refresh,
    dispose() {
      disposed = true;
      win.cancelAnimationFrame(frame);
      resize.disconnect();
    },
  };
}
