import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkQuestionnaireGroups(page: Page) {
  const disclosure = page
    .locator("summary")
    .filter({ hasText: "More controls" });
  await expect(disclosure.locator("svg")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  const alignment = await disclosure.evaluate((node) => {
    const icon = node.querySelector("svg")!.getBoundingClientRect();
    const text = Array.from(node.childNodes).find(
      (child) =>
        child.nodeType === Node.TEXT_NODE &&
        child.textContent?.includes("More controls"),
    )!;
    const range = document.createRange();
    range.selectNodeContents(text);
    const label = range.getBoundingClientRect();
    return {
      height: node.getBoundingClientRect().height,
      difference: Math.abs(
        icon.y + icon.height / 2 - label.y - label.height / 2,
      ),
    };
  });
  expect(alignment.height).toBeGreaterThanOrEqual(32);
  expect(alignment.difference).toBeLessThanOrEqual(3);
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure.locator("..")).toHaveAttribute("open", "");
  const form = page.getByRole("form", { name: "Contact review" });
  const contacts = () =>
    form.locator("[data-part=group-instance]").filter({
      has: page.getByRole("textbox", { name: "Contact name", exact: true }),
    });
  const field = (id: string, name: string) =>
    form
      .locator(`[data-group-instance="${id}"]`)
      .getByRole("textbox", { name, exact: true });
  const updates = page.getByRole("status", { name: "Contact updates" });
  await expect(contacts()).toHaveCount(2);
  await field("alpha", "Contact name").fill("Alex edited");
  await expect(field("beta", "Contact name")).toHaveValue("Morgan Lee");
  await form.getByRole("button", { name: "Add contact", exact: true }).click();
  await expect(contacts()).toHaveCount(3);
  const id = await contacts().last().getAttribute("data-group-instance");
  expect(id).toBeTruthy();
  await expect(field(id!, "Contact name")).toBeFocused();
  await expect(
    form.getByRole("button", { name: "Add contact", exact: true }),
  ).toBeDisabled();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(field(id!, "Contact name")).toBeFocused();
  await field(id!, "Contact name").fill("New contact");
  const instance = form.locator(`[data-group-instance="${id}"]`);
  await instance
    .getByRole("combobox", { name: "Preferred channel", exact: true })
    .selectOption("other");
  await instance
    .getByRole("textbox", { name: "Other channel details" })
    .fill("Via colleague");
  await form
    .getByRole("button", { name: "Remove contact 2", exact: true })
    .click();
  await expect(form.locator('[data-group-instance="beta"]')).toHaveCount(0);
  await expect(field("alpha", "Contact name")).toHaveValue("Alex edited");
  await expect(field(id!, "Contact name")).toHaveValue("New contact");
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  const before = await updates.textContent();
  await form.getByRole("button", { name: "Add contact", exact: true }).click();
  await expect(contacts()).toHaveCount(2);
  await expect(updates).not.toHaveText(before!);
  await field("alpha", "Contact name").fill("Rejected");
  await expect(field("alpha", "Contact name")).toHaveValue("Alex edited");
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  await form.getByRole("button", { name: "Add contact", exact: true }).click();
  const newer = await contacts().last().getAttribute("data-group-instance");
  expect(newer).not.toBe(id);
  await form
    .getByRole("button", { name: "Remove contact 3", exact: true })
    .click();
  const entries = await form.evaluate((node) =>
    Array.from(new FormData(node as HTMLFormElement).entries()),
  );
  expect(entries.filter(([name]) => name === "contacts[alpha][name]")).toEqual([
    ["contacts[alpha][name]", "Alex edited"],
  ]);
  expect(
    entries.some(
      ([name]) =>
        name === "contacts[alpha][private]" ||
        name === "contacts[alpha][notes]",
    ),
  ).toBe(false);
  expect(entries.filter(([name]) => name === `contacts[${id}][notes]`)).toEqual(
    [[`contacts[${id}][notes]`, "Via colleague"]],
  );
  await page
    .getByRole("button", { name: "Show advanced questions", exact: true })
    .click();
  await form
    .locator('[data-group-instance="alpha"]')
    .getByRole("button", { name: "Add backup", exact: true })
    .click();
  const backup = form.locator(
    '[data-group-instance="alpha"] [data-part=group-instance]',
  );
  await expect(backup).toHaveCount(1);
  await expect(
    backup.getByRole("textbox", { name: "Backup name", exact: true }),
  ).toBeFocused();
  await backup
    .getByRole("textbox", { name: "Backup name", exact: true })
    .fill("Support");
  await backup
    .getByRole("textbox", { name: "Backup phone", exact: true })
    .fill("555 0100");
  const backupId = await backup.getAttribute("data-group-instance");
  expect(
    (
      await form.evaluate((node) =>
        Array.from(new FormData(node as HTMLFormElement).entries()),
      )
    ).filter(
      ([name]) => name === `contacts[alpha][backups][${backupId}][name]`,
    ),
  ).toEqual([[`contacts[alpha][backups][${backupId}][name]`, "Support"]]);
  await backup
    .getByRole("button", { name: "Remove backup 1", exact: true })
    .click();
  await expect(backup).toHaveCount(0);
  await page.getByRole("button", { name: "Reset survey", exact: true }).click();
  await page
    .getByRole("button", { name: "Hide advanced questions", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Use async validation", exact: true })
    .click();
  await field("beta", "Contact name").fill("reserved");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    form
      .getByRole("alert")
      .filter({ hasText: "Choose another contact name." })
      .last(),
  ).toBeVisible();
  await expect(field("beta", "Contact name")).toBeFocused();
  await field("beta", "Contact name").fill("Morgan accepted");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    page.getByRole("status", { name: "Saved contact answers" }),
  ).toContainText("Morgan accepted");
  await page.getByRole("button", { name: "Reset survey", exact: true }).click();
  await page
    .getByRole("button", { name: "Restart internal answers", exact: true })
    .click();
  await field("alpha", "Contact name").fill("Internal answer");
  await expect(field("alpha", "Contact name")).toHaveValue("Internal answer");
  await page
    .getByRole("button", { name: "Disable survey", exact: true })
    .click();
  await expect(field("alpha", "Contact name")).toBeDisabled();
  await page
    .getByRole("button", { name: "Enable survey", exact: true })
    .click();
  const accessibility = await new AxeBuilder({ page })
    .include('[data-scope="questionnaire"][data-part="root"]')
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
}
