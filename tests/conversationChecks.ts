import { auditDirectory } from "./auditDirectory";
import { expect, type Page } from "@playwright/test";
export async function checkConversation(page: Page, evidenceName?: string) {
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(
    page.locator("[data-scope=attachment][data-part=root]").first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  if (evidenceName)
    await page.locator("[data-example-content]").screenshot({
      path: auditDirectory("conversation") + "/" + evidenceName + "-mobile.png",
      animations: "disabled",
    });
  await page
    .getByRole("button", {
      name: "Retry Design-review-notes-with-a-long-filename.pdf",
    })
    .press("Enter");
  await expect(
    page.getByRole("link", {
      name: "Design-review-notes-with-a-long-filename.pdf",
    }),
  ).toHaveAttribute("download", "Design-review-notes-with-a-long-filename.pdf");
  await expect(
    page.getByRole("link", { name: "Private-draft.pdf" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Remove Private-draft.pdf" }),
  ).toBeDisabled();
  await page
    .getByRole("button", {
      name: "Remove Design-review-notes-with-a-long-filename.pdf",
    })
    .click();
  await expect(
    page.getByRole("button", { name: "Restore attachment" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Restore attachment" }).click();
  const viewport = page.locator(
    "[data-scope=message-scroller][data-part=viewport]",
  );
  const position = () =>
    viewport.evaluate((el) => ({
      top: el.scrollTop,
      max: el.scrollHeight - el.clientHeight,
    }));
  await expect
    .poll(async () => {
      const p = await position();
      return Math.abs(p.max - p.top);
    })
    .toBeLessThan(5);
  await viewport.evaluate((el) => {
    el.scrollTop = 0;
  });
  await expect(
    page.getByRole("button", { name: "Jump to latest" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add message" }).click();
  expect((await position()).top).toBe(0);
  await page.getByRole("button", { name: "Jump to latest" }).click();
  await expect(viewport).toBeFocused();
  await page.getByRole("button", { name: "Add message" }).click();
  await expect
    .poll(async () => {
      const p = await position();
      return Math.abs(p.max - p.top);
    })
    .toBeLessThan(5);
  const form = page.getByRole("form", { name: "Help shape LoongArk" });
  await form.getByRole("button", { name: "Next" }).click();
  await expect(form.getByRole("alert")).toHaveText(
    "Please answer this question.",
  );
  await expect(
    form.getByRole("radio", { name: "Design interfaces" }),
  ).toBeFocused();
  await expect(
    form.getByRole("radio", { name: "Other", exact: true }),
  ).toBeDisabled();
  await form.getByRole("radio", { name: "Design interfaces" }).check();
  await form.getByRole("button", { name: "Next" }).click();
  await expect(
    form.getByRole("checkbox", { name: "Accessible interactions" }),
  ).toBeFocused();
  await form.getByRole("checkbox", { name: "Accessible interactions" }).check();
  await form
    .getByRole("checkbox", { name: "Consistent across frameworks" })
    .check();
  await form.getByRole("button", { name: "Back" }).click();
  await expect(
    form.getByRole("radio", { name: "Design interfaces" }),
  ).toBeChecked();
  await form.getByRole("button", { name: "Next" }).click();
  await expect(
    form.getByRole("checkbox", { name: "Consistent across frameworks" }),
  ).toBeChecked();
  await form.getByRole("button", { name: "Next" }).click();
  const notes = form.getByRole("textbox", {
    name: "Anything we should improve?",
  });
  await expect(notes).toBeFocused();
  await notes.fill("tiny");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(form.getByRole("alert")).toHaveText("Check the answer length.");
  await notes.fill("Keep focus and spacing consistent.");
  const entries = await form.evaluate((el) =>
    Array.from(new FormData(el as HTMLFormElement).entries()),
  );
  expect(entries).toEqual([
    ["role", "design"],
    ["features", "accessibility"],
    ["features", "consistency"],
    ["notes", "Keep focus and spacing consistent."],
  ]);
  await form
    .getByRole("button", { name: "Submit", exact: true })
    .press("Enter");
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(form.getByRole("status")).toHaveText(
    "Thank you for your answers.",
  );
}
