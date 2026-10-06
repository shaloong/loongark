import { type Page, type TestInfo } from "@playwright/test";

/** 先保留失败时的宽度，再收集几何，避免后续布局读取隐藏首次失败。 */
export async function captureWidthFailure(
  page: Page,
  info: TestInfo,
  measured: number,
  measuredViewport?: number,
) {
  const state = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      viewport: {
        inner: innerWidth,
        client: root.clientWidth,
        scroll: root.scrollWidth,
      },
      overflowing: [...document.querySelectorAll<HTMLElement>("body *")]
        .flatMap((node) => {
          if (!(node instanceof HTMLElement)) return [];
          const rect = node.getBoundingClientRect();
          if (!rect.width || (rect.right <= innerWidth + 1 && rect.left >= -1))
            return [];
          const style = getComputedStyle(node);
          return [
            {
              tag: node.tagName,
              id: node.id,
              className: node.className,
              scope: node.dataset.scope,
              part: node.dataset.part,
              rect: rect.toJSON(),
              minWidth: style.minWidth,
              overflowX: style.overflowX,
              position: style.position,
            },
          ];
        })
        .slice(0, 40),
      nodes: [
        ...document.querySelectorAll(
          'body, main, [data-scope="chart"], [data-scope="chart"] svg, [data-scope="chart"] fieldset, [data-scope="chart"] details, [data-scope="chart"] [data-part="data-region"]',
        ),
      ].map((node) => {
        const style = getComputedStyle(node);
        return {
          tag: node.tagName,
          part: node.getAttribute("data-part"),
          rect: node.getBoundingClientRect().toJSON(),
          width: style.width,
          minWidth: style.minWidth,
          maxWidth: style.maxWidth,
          overflowX: style.overflowX,
          display: style.display,
        };
      }),
    };
  });
  const afterPaint = await page.evaluate(
    () =>
      new Promise<number>((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            resolve(document.documentElement.scrollWidth),
          ),
        ),
      ),
  );
  const body = JSON.stringify(
    { measured, measuredViewport, state, afterPaint },
    null,
    2,
  );
  await info.attach("width-failure-geometry", {
    body,
    contentType: "application/json",
  });
  console.log("width-failure-geometry", body);
}
