import { expect, type Page } from "@playwright/test";
export async function checkIcons(page: Page) {
  const root = page.locator("[data-scope=icon]");
  await expect(root.first()).toBeVisible();
  expect(await root.count()).toBeGreaterThan(5);
  expect(
    await root.evaluateAll((nodes) =>
      nodes.every((node) =>
        Array.from(node.children).every(
          (child) => child.namespaceURI === "http://www.w3.org/2000/svg",
        ),
      ),
    ),
  ).toBe(true);
  const dynamic = page.getByTestId("dynamic-icon");
  const before = await dynamic.innerHTML();
  await expect(dynamic).toHaveAttribute("aria-label", "Search illustration");
  expect(await dynamic.evaluate((e) => e.getBoundingClientRect().width)).toBe(
    16,
  );
  const toggle = page.getByRole("button", { name: "切换图标" });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toBeFocused();
  await expect(dynamic).toHaveAttribute("aria-label", "Ready illustration");
  await expect(dynamic).toHaveAttribute("stroke-width", "1.5");
  expect(await dynamic.evaluate((e) => e.getBoundingClientRect().width)).toBe(
    32,
  );
  expect(await dynamic.innerHTML()).not.toBe(before);
  await toggle.click();
  await expect(dynamic).toHaveAttribute("aria-label", "Search illustration");
  expect(await dynamic.innerHTML()).toBe(before);
  const search = page.getByRole("button", { name: "Search", exact: true });
  await expect(search.locator("svg")).toHaveAttribute("aria-hidden", "true");
  await expect(search.locator("svg")).toHaveAttribute("focusable", "false");
  expect(
    await page
      .getByTestId("rtl-arrow")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe("matrix(-1, 0, 0, 1, 0, 0)");
  expect(
    await page
      .getByTestId("ltr-arrow")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe("none");
  expect(
    await page
      .getByTestId("rtl-search")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe("none");
  await expect(
    page.getByRole("img", { name: "Fixed stroke search" }).locator("circle"),
  ).toHaveAttribute("vector-effect", "non-scaling-stroke");
  const centers = [];
  for (const name of [
    "Small search",
    "Medium search",
    "Large search",
    "Fixed stroke search",
  ])
    centers.push(
      await page.getByRole("img", { name, exact: true }).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.y + rect.height / 2;
      }),
    );
  expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(0.5);
  const sizes = [];
  for (const name of ["Small search", "Medium search", "Large search"])
    sizes.push(
      await page
        .getByRole("img", { name, exact: true })
        .evaluate((e) => e.getBoundingClientRect().width),
    );
  expect(sizes[0]).toBeLessThan(sizes[1]);
  expect(sizes[1]).toBeLessThan(sizes[2]);
  expect(
    await search.locator("svg").evaluate((e) => getComputedStyle(e).color),
  ).toBe(await search.evaluate((e) => getComputedStyle(e).color));
}
