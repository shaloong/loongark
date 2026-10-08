import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
declare global {
  interface Window {
    stopDataPins: () => void;
  }
}
test("冻结测量取消排队帧、恢复属性并释放观察器", async ({ page }) => {
  await page.setContent(
    '<h1>Frozen lifecycle fixture</h1><div id="region" data-pin-overflow="original" style="width:300px;overflow:auto"><table style="width:700px"><thead><tr><th data-pinned="start" data-pin-edge="original" style="--lk-data-table-pin-offset:7px;width:100px">Project</th><th>Details</th><th data-pinned="end">Revenue</th></tr></thead><tbody><tr><td data-pinned="start">Alpha</td><td>Long release details</td><td data-pinned="end">2400</td></tr></tbody></table></div>',
  );
  const source = await readFile("packages/kit/dist/data-table.js", "utf8");
  await page.addScriptTag({
    type: "module",
    content:
      source.slice(source.indexOf("export function mountDataTablePins")) +
      '\nwindow.stopDataPins=mountDataTablePins(document.getElementById("region"));',
  });
  await expect
    .poll(() => page.evaluate(() => typeof window.stopDataPins))
    .toBe("function");
  await expect(page.locator("th").first()).toHaveCSS(
    "--lk-data-table-pin-offset",
    "0px",
  );
  await page.evaluate(async () => {
    document.querySelector("th")!.textContent = "Changed long column width";
    await Promise.resolve();
    window.stopDataPins();
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  await expect(page.locator("#region")).toHaveAttribute(
    "data-pin-overflow",
    "original",
  );
  await expect(page.locator("th").first()).toHaveAttribute(
    "data-pin-edge",
    "original",
  );
  await expect(page.locator("th").first()).toHaveCSS(
    "--lk-data-table-pin-offset",
    "7px",
  );
  await expect(page.locator("tbody td").first()).not.toHaveAttribute(
    "style",
    /pin-offset/,
  );
  await page.locator("#region").evaluate((el) => {
    el.style.width = "180px";
    el.querySelector("th")!.setAttribute("data-pinned", "end");
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  await expect(page.locator("#region")).toHaveAttribute(
    "data-pin-overflow",
    "original",
  );
  await expect(page.locator("th").first()).toHaveCSS(
    "--lk-data-table-pin-offset",
    "7px",
  );
});

test("冻结测量响应列宽变化和可用空间恢复", async ({ page }) => {
  await page.setContent(
    '<h1>Frozen width fixture</h1><div id="region" style="width:360px;overflow:auto"><table style="width:900px;table-layout:fixed"><thead><tr><th data-pinned="start" style="width:80px">Project</th><th><button type="button" style="width:60px">Details</button></th><th data-pinned="end" style="width:80px">Revenue</th></tr></thead><tbody><tr><td data-pinned="start">Alpha</td><td>Long details</td><td data-pinned="end">2400</td></tr></tbody></table></div>',
  );
  const source = await readFile("packages/kit/dist/data-table.js", "utf8");
  await page.addScriptTag({
    type: "module",
    content:
      source.slice(source.indexOf("export function mountDataTablePins")) +
      '\nwindow.stopDataPins=mountDataTablePins(document.getElementById("region"));',
  });
  await expect
    .poll(() => page.evaluate(() => typeof window.stopDataPins))
    .toBe("function");
  await expect(page.locator("#region")).not.toHaveAttribute(
    "data-pin-overflow",
    "true",
  );
  const freeWidth = await page
    .locator("th")
    .nth(1)
    .evaluate((el) => el.getBoundingClientRect().width);
  await page.addStyleTag({
    content: 'th[aria-sort="ascending"] button { width:260px !important }',
  });
  await page
    .locator("th")
    .nth(1)
    .evaluate((el) => el.setAttribute("aria-sort", "ascending"));
  await expect(page.locator("#region")).toHaveAttribute(
    "data-pin-overflow",
    "true",
  );
  expect(
    Math.abs(
      (await page
        .locator("th")
        .nth(1)
        .evaluate((el) => el.getBoundingClientRect().width)) - freeWidth,
    ),
  ).toBeLessThan(1);
  await page
    .locator("th")
    .nth(1)
    .evaluate((el) => el.removeAttribute("aria-sort"));
  await expect(page.locator("#region")).not.toHaveAttribute(
    "data-pin-overflow",
    "true",
  );
  await page
    .locator("th")
    .first()
    .evaluate((el) => (el.style.width = "240px"));
  await expect(page.locator("#region")).toHaveAttribute(
    "data-pin-overflow",
    "true",
  );
  await page.locator("#region").evaluate((el) => (el.style.width = "800px"));
  await expect(page.locator("#region")).not.toHaveAttribute(
    "data-pin-overflow",
    "true",
  );
  await page.evaluate(() => window.stopDataPins());
});
