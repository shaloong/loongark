import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkDateTime(page: Page, screenshot: string) {
  const root = page.locator('[data-scope="date-input"][data-part="root"]');
  const current = page.getByLabel("Current appointment", { exact: true });
  const text = page.getByRole("textbox", {
    name: "Localized date",
    exact: true,
  });
  const button = (name: string) =>
    page.getByRole("button", { name, exact: true });
  const segment = (type: string) =>
    root.locator('[data-part="segment"][data-type="' + type + '"]');
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: screenshot + "-" + name + ".png",
      fullPage: true,
    });
  };
  await expect(current).toHaveText("2026-10-06T14:35:20");
  for (const type of ["year", "month", "day", "hour", "minute", "second"])
    await expect(segment(type)).toHaveAttribute("role", "spinbutton");
  await capture("default");
  await text.fill("February 29, 2026");
  await text.press("Enter");
  await expect(text).toHaveAttribute("aria-invalid", "true");
  await expect(
    page.getByText("Enter a complete date using the selected locale."),
  ).toBeVisible();
  await expect(current).toHaveText("2026-10-06T14:35:20");
  await capture("error");
  await text.fill("February 29, 2028");
  await text.press("Enter");
  await expect(current).toHaveText("2028-02-29T14:35:20");
  await expect(text).not.toHaveAttribute("aria-invalid", "true");
  await button("en-GB").click();
  await text.fill("6/10/2026");
  await text.press("Enter");
  await expect(current).toHaveText("2026-10-06T14:35:20");
  await segment("hour").focus();
  await segment("hour").press("ArrowUp");
  await expect(segment("hour")).toBeFocused();
  await expect(current).toHaveText("2026-10-06T15:35:20");
  await segment("minute").focus();
  await segment("minute").press("ArrowDown");
  await expect(current).toHaveText("2026-10-06T15:34:20");
  await segment("second").focus();
  await segment("second").press("ArrowUp");
  await expect(current).toHaveText("2026-10-06T15:34:21");
  await button("Use Shanghai time").click();
  await expect(current).toHaveText("2026-10-06T15:34:21+08:00[Asia/Shanghai]");
  await button("Submit appointment").click();
  await expect(root.locator('input[name="appointment"]')).toHaveValue(
    "2026-10-06T15:34:21+08:00[Asia/Shanghai]",
  );
  const serialized = await root
    .locator('input[name="appointment"]')
    .inputValue();
  expect(serialized).toContain("15");
  expect(serialized).toContain("34");
  await expect(
    page.getByLabel("Submitted appointment", { exact: true }),
  ).toHaveText(serialized);
  await button("ar-EG").click();
  await text.fill("٧/١٠/٢٠٢٦");
  await text.press("Enter");
  await expect(current).toHaveText("2026-10-07T15:34:21+08:00[Asia/Shanghai]");
  await expect(root).toHaveAttribute("dir", "rtl");
  await expect(root.locator('[data-part="control"]')).toHaveAttribute(
    "dir",
    "rtl",
  );
  await expect(root.locator('[data-part="segment-group"]')).toHaveAttribute(
    "dir",
    "rtl",
  );
  await segment("day").focus();
  await segment("day").press("ArrowLeft");
  await expect(segment("month")).toBeFocused();
  await segment("month").press("ArrowRight");
  await expect(segment("day")).toBeFocused();
  const rtlAlignment = await root.evaluate((node) => {
    const group = node.querySelector('[data-part="segment-group"]')!;
    return Math.abs(
      group.getBoundingClientRect().right - node.getBoundingClientRect().right,
    );
  });
  expect(rtlAlignment).toBeLessThanOrEqual(1);
  await text.focus();
  await capture("localized");
  await button("Make read only").click();
  await expect(text).toHaveAttribute("readonly", "");
  const readOnlyText = await text.inputValue();
  await text.focus();
  await text.press("1");
  await expect(text).toHaveValue(readOnlyText);
  await segment("hour").focus();
  await segment("hour").press("ArrowUp");
  await expect(current).toHaveText("2026-10-07T15:34:21+08:00[Asia/Shanghai]");
  await button("Make editable").click();
  await button("Disable appointment").click();
  await expect(text).toBeDisabled();
  await expect(button("Submit appointment")).toBeDisabled();
  await button("Enable appointment").click();
  await button("Reset appointment").click();
  await expect(current).toHaveText("2026-10-06T14:35:20+08:00[Asia/Shanghai]");
  await button("Use local date time").click();
  await expect(current).toHaveText("2026-10-06T14:35:20");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    (await new AxeBuilder({ page }).include("body").analyze()).violations,
  ).toEqual([]);
}
