import { resolve } from "node:path";
import { build } from "vite";
import { test, expect, type Page } from "@playwright/test";
import { settleMessageLayout } from "./messageScrollerAdvancedChecks";
declare global {
  interface Window {
    messageModelMount: (
      root: HTMLElement,
      changed: (details: { atBottom: boolean }) => void,
    ) => () => void;
    messageModelCleanup: () => void;
    messageModelChanges: boolean[];
  }
}
let browserModule = "";
test.beforeAll(async () => {
  const entry = "loongark-message-model-fixture";
  const result = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [
      {
        name: entry,
        resolveId(id) {
          if (id === entry) return "\0" + entry;
        },
        load(id) {
          if (id === "\0" + entry)
            return `import { mountMessageScroller } from ${JSON.stringify(resolve("packages/kit/dist/message-scroller.js"))};window.messageModelMount=mountMessageScroller;`;
        },
      },
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: { input: entry, output: { format: "iife" } },
    },
  });
  const bundle = Array.isArray(result) ? result[0] : result;
  if (!("output" in bundle)) throw Error("Expected a complete fixture bundle");
  const chunk = bundle.output.find((item) => item.type === "chunk");
  if (!chunk) throw Error("Missing message model fixture chunk");
  browserModule = chunk.code;
});
test("滚动锚定清理保留声明优先级、缺省状态及调用方接管", async ({ page }) => {
  await fixture(page);
  const results = await page.evaluate(() => {
    const root = document.getElementById("root")!;
    const viewport = root.querySelector<HTMLElement>('[data-part="viewport"]')!;
    window.messageModelCleanup();
    return ["important", "absent", "external"].map((scenario) => {
      viewport.style.removeProperty("overflow-anchor");
      if (scenario === "important")
        viewport.style.setProperty("overflow-anchor", "auto", "important");
      const original = viewport.style.cssText;
      const cleanup = window.messageModelMount(root, () => {});
      if (scenario === "external")
        viewport.style.setProperty("overflow-anchor", "none", "important");
      const expected =
        scenario === "external" ? viewport.style.cssText : original;
      cleanup();
      cleanup();
      return { scenario, expected, actual: viewport.style.cssText };
    });
  });
  for (const result of results)
    expect(result.actual, result.scenario).toBe(result.expected);
});
async function fixture(page: Page, overflowAnchor: "auto" | "none" = "auto") {
  await page.setContent(
    `<main><h1>Conversation reading fixture</h1><div id="root" data-at-bottom="original"><div data-part="viewport" tabindex="0" style="height:300px;overflow:auto;overflow-anchor:${overflowAnchor}"><div data-part="content" style="display:flex;flex-direction:column;gap:16px;padding:16px">${Array.from({ length: 12 }, (_, i) => `<article id="m${i}" style="min-height:${i === 11 ? 240 : 80}px;flex-shrink:0"><p style="margin:0">Message ${i}: keep this paragraph in view while other messages change.</p></article>`).join("")}</div></div><button data-part="jump" hidden>Latest</button></div></main>`,
  );
  await page.addScriptTag({
    content:
      browserModule +
      '\nwindow.messageModelChanges=[];window.messageModelCleanup=window.messageModelMount(document.getElementById("root"),d=>window.messageModelChanges.push(d.atBottom));',
  });
  await expect
    .poll(() => page.evaluate(() => typeof window.messageModelCleanup))
    .toBe("function");
  await settleMessageLayout(page);
  await page.locator('[data-part="viewport"]').evaluate((el) => {
    const row = document.getElementById("m4")!;
    el.scrollTop +=
      row.getBoundingClientRect().top -
      el.getBoundingClientRect().top -
      el.clientTop;
  });
  await expect(page.locator("#root")).toHaveAttribute(
    "data-at-bottom",
    "false",
  );
}
const offset = (page: Page, id = "m4") =>
  page.locator("#" + id + " p").evaluate((p) => {
    const viewport = p.closest('[data-part="content"]')!.parentElement!;
    const range = document.createRange();
    range.setStart(p.firstChild!, 0);
    range.setEnd(p.firstChild!, 1);
    return (
      range.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top -
      viewport.clientTop
    );
  });
test("阅读锚点处理等总高度重排、同条消息媒体、同时前后插入及用户主动滚动", async ({
  page,
}) => {
  await fixture(page);
  const before = await offset(page),
    height = await page
      .locator('[data-part="viewport"]')
      .evaluate((el) => el.scrollHeight);
  await page.evaluate(() => {
    document.getElementById("m0")!.style.minHeight = "240px";
    document.getElementById("m11")!.style.minHeight = "80px";
  });
  await settleMessageLayout(page);
  expect(
    await page
      .locator('[data-part="viewport"]')
      .evaluate((el) => el.scrollHeight),
  ).toBe(height);
  expect(Math.abs((await offset(page)) - before)).toBeLessThan(1);
  await page.evaluate(() => {
    const img = document.createElement("img");
    img.src =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="240"><rect width="200" height="240" fill="#F2F2F2"/></svg>',
      );
    img.style.cssText = "display:block;width:200px;height:auto";
    document.getElementById("m4")!.prepend(img);
  });
  await expect
    .poll(() =>
      page
        .locator("#m4 img")
        .evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalHeight > 0,
        ),
    )
    .toBe(true);
  await settleMessageLayout(page);
  expect(Math.abs((await offset(page)) - before)).toBeLessThan(1);
  await page.evaluate(() => {
    const content = document.querySelector('[data-part="content"]')!;
    const earlier = document.createElement("article"),
      later = document.createElement("article");
    earlier.style.height = "120px";
    earlier.textContent = "Earlier history";
    later.style.height = "360px";
    later.textContent = "Later reply";
    content.prepend(earlier);
    content.append(later);
  });
  await settleMessageLayout(page);
  expect(Math.abs((await offset(page)) - before)).toBeLessThan(1);
  await page.locator('[data-part="viewport"]').evaluate((el) => {
    const row = document.getElementById("m7")!;
    el.scrollTop +=
      row.getBoundingClientRect().top -
      el.getBoundingClientRect().top -
      el.clientTop;
  });
  await settleMessageLayout(page);
  const moved = await offset(page, "m7");
  await page.locator("#m0").evaluate((el) => {
    el.style.minHeight = "320px";
  });
  await settleMessageLayout(page);
  expect(Math.abs((await offset(page, "m7")) - moved)).toBeLessThan(1);
  await page.locator("#m7").evaluate((el) => el.remove());
  await settleMessageLayout(page);
  await page
    .getByRole("button", { name: "Latest", exact: true })
    .press("Enter");
  await expect(page.locator('[data-part="viewport"]')).toBeFocused();
  await expect(page.locator("#root")).toHaveAttribute("data-at-bottom", "true");
});
test("卸载取消已排队的锚点恢复，恢复原样式并保留调用方后续覆盖", async ({
  page,
}) => {
  const supportsAnchoring = await page.evaluate(() =>
    CSS.supports("overflow-anchor", "none"),
  );
  await fixture(page, "none");
  const top = await page
      .locator('[data-part="viewport"]')
      .evaluate((el) => el.scrollTop),
    calls = await page.evaluate(() => window.messageModelChanges.length);
  await page.evaluate(async () => {
    document.getElementById("m0")!.style.minHeight = "240px";
    document.getElementById("m0")!.append("New text");
    await Promise.resolve();
    window.messageModelCleanup();
  });
  await settleMessageLayout(page);
  expect(
    await page.locator('[data-part="viewport"]').evaluate((el) => el.scrollTop),
  ).toBe(top);
  expect(await page.evaluate(() => window.messageModelChanges.length)).toBe(
    calls,
  );
  expect(
    await page
      .locator('[data-part="viewport"]')
      .evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("overflow-anchor"),
      ),
  ).toBe(supportsAnchoring ? "none" : "");
  await expect(page.locator("#root")).toHaveAttribute(
    "data-at-bottom",
    "original",
  );
  await expect(
    page.getByRole("button", { name: "Latest", exact: true }),
  ).toBeHidden();
  // 独立验证 auto 恢复；恢复后原生浏览器可以重新调整滚动位置。
  await fixture(page);
  await page.evaluate(() => window.messageModelCleanup());
  expect(
    await page
      .locator('[data-part="viewport"]')
      .evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("overflow-anchor"),
      ),
  ).toBe(supportsAnchoring ? "auto" : "");
  // 外部从 none 改为 auto 时，清理不能覆盖新设置。
  await fixture(page, "none");
  await page.evaluate(() => {
    const viewport = document.querySelector<HTMLElement>(
      '[data-part="viewport"]',
    )!;
    viewport.style.setProperty("overflow-anchor", "auto");
    document.getElementById("root")!.dataset.atBottom = "external";
    window.messageModelCleanup();
  });
  await expect(page.locator("#root")).toHaveAttribute(
    "data-at-bottom",
    "external",
  );
  expect(
    await page
      .locator('[data-part="viewport"]')
      .evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("overflow-anchor"),
      ),
  ).toBe(supportsAnchoring ? "auto" : "");
});
