import { expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { auditDirectory } from "./auditDirectory";
export async function checkImageCropper(page: Page, framework?: string) {
  const selection = page.locator(
    "[data-scope=image-cropper][data-part=selection]",
  );
  await expect(selection).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("[data-scope=image-cropper][data-part=image]")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBe(640);
  await expect(selection).toHaveAttribute("aria-valuenow", /\d+/);
  const initial = Number(await selection.getAttribute("aria-valuenow"));
  await selection.focus();
  await selection.press("ArrowRight");
  await expect
    .poll(async () => Number(await selection.getAttribute("aria-valuenow")))
    .toBeGreaterThan(initial);
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.getByLabel("Image transformations")).toContainText(
    "Zoom 1.25",
  );
  await page.getByRole("button", { name: "Rotate", exact: true }).click();
  await expect(page.getByLabel("Image transformations")).toContainText(
    "Rotation 90°",
  );
  await page.getByRole("button", { name: "Flip", exact: true }).click();
  await expect(page.getByLabel("Image transformations")).toContainText(
    "Flipped true",
  );
  await page.getByRole("button", { name: "Export crop", exact: true }).click();
  const preview = page.getByRole("img", { name: "Cropped preview" });
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute("src", /^data:image\/png;base64,/);
  await expect
    .poll(() =>
      preview.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(preview).toHaveCount(0);
  await expect(page.getByLabel("Image transformations")).toHaveText(
    "Zoom 1.00 · Rotation 0° · Flipped false",
  );
  for (let i = 0; i < 8; i++)
    await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeDisabled();
  await expect(page.getByLabel("Image transformations")).toContainText(
    "Zoom 3.00",
  );
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.setViewportSize({ width: 375, height: 1000 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(375);
  const viewport = page.locator(
    "[data-scope=image-cropper][data-part=viewport]",
  );
  await expect
    .poll(async () => {
      const view = await viewport.boundingBox(),
        image = await page
          .locator("[data-scope=image-cropper][data-part=image]")
          .boundingBox();
      if (!view || !image) return Infinity;
      return Math.max(
        Math.abs(image.x + image.width / 2 - view.x - view.width / 2),
        Math.abs(image.y + image.height / 2 - view.y - view.height / 2),
      );
    })
    .toBeLessThan(1);
  await expect
    .poll(async () => {
      const image = await page
          .locator("[data-scope=image-cropper][data-part=image]")
          .boundingBox(),
        crop = await selection.boundingBox();
      if (!image || !crop) return false;
      return (
        crop.x >= image.x - 1 &&
        crop.y >= image.y - 1 &&
        crop.x + crop.width <= image.x + image.width + 1 &&
        crop.y + crop.height <= image.y + image.height + 1
      );
    })
    .toBe(true);
  const viewBox = await viewport.boundingBox(),
    imageBox = await page
      .locator("[data-scope=image-cropper][data-part=image]")
      .boundingBox();
  expect(
    imageBox &&
      viewBox &&
      imageBox.width <= viewBox.width &&
      imageBox.height <= viewBox.height,
  ).toBe(true);
  await page.getByRole("button", { name: "Export crop", exact: true }).click();
  await expect(preview).toBeVisible();
  await expect
    .poll(() =>
      preview.evaluate((image: HTMLImageElement) => {
        if (!image.complete || !image.naturalWidth) return false;
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) return false;
        context.drawImage(image, 0, 0);
        return [
          [0, 0],
          [canvas.width - 1, 0],
          [0, canvas.height - 1],
          [canvas.width - 1, canvas.height - 1],
        ].every(([x, y]) => context.getImageData(x, y, 1, 1).data[3] === 255);
      }),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  if (framework)
    await page.locator("[data-example-content]").screenshot({
      path: auditDirectory("ark-ui") + "/" + framework + "-crop-mobile.png",
      animations: "disabled",
    });
  await page.setViewportSize({ width: 1280, height: 900 });
}
export async function checkJsonTreeView(page: Page) {
  const tree = page.getByRole("tree", { name: "Project data" });
  await expect(tree).toBeVisible();
  const branch = tree.getByRole("button", { name: /^components:/ });
  await expect(branch).toBeVisible();
  await branch.focus();
  await branch.press("ArrowRight");
  await expect(branch).toBeFocused();
  expect(await branch.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    "solid",
  );
  await expect(
    tree.getByText("ImageCropper", { exact: false }).last(),
  ).toBeVisible();
  await branch.press("ArrowLeft");
  await expect(branch).toHaveAttribute("data-state", "closed");
  await branch.press("ArrowRight");
  await expect(branch).toHaveAttribute("data-state", "open");
  await branch.focus();
  await page
    .getByRole("button", { name: "Update data" })
    .evaluate((button: HTMLButtonElement) => button.click());
  await expect(tree).toContainText("Updated project");
  await expect(branch).toBeFocused();
  await expect(branch).toHaveAttribute("data-state", "open");
  await expect(
    tree.getByText("ImageCropper", { exact: false }).last(),
  ).toBeVisible();
  expect(
    await page.evaluate(() => Reflect.get(window, "__jsonExecuted")),
  ).toBeUndefined();
  await page.setViewportSize({ width: 375, height: 900 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(375);
  await page.setViewportSize({ width: 1280, height: 900 });
}
export async function checkArkUtilities(page: Page) {
  await expect(
    page.getByText("Client is ready", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("mark")).toHaveText("LoongArk");
  await expect(page.locator("dd").first()).toContainText("2");
  await expect(page.locator("dd").last()).toHaveText("$1,250.50");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download notes" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("loongark-notes.txt");
  const path = await download.path();
  expect(path).not.toBeNull();
  if (path)
    expect(await readFile(path, "utf8")).toBe("LoongArk component notes");
  await page.getByRole("button", { name: "Toggle presence" }).click();
  await expect(page.getByText("Optional details", { exact: true })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Toggle presence" }).click();
  await expect(
    page.getByText("Optional details", { exact: true }),
  ).toBeVisible();
  const start = page.getByRole("button", { name: "Start focus task" });
  await start.click();
  const input = page.getByRole("textbox", { name: "Task name" }),
    finish = page.getByRole("button", { name: "Finish focus task" });
  await expect(input).toBeFocused();
  await input.press("Shift+Tab");
  await expect(finish).toBeFocused();
  await finish.press("Tab");
  await expect(input).toBeFocused();
  await finish.click();
  await expect(input).toHaveCount(0);
  await expect(start).toBeFocused();
  const frame = page.frameLocator('iframe[title="Isolated dark preview"]');
  await expect(
    frame.getByRole("heading", { name: "Frame content" }),
  ).toBeVisible();
  await expect(
    frame.getByRole("button", { name: "Inside frame" }),
  ).toBeVisible();
  expect(
    await frame
      .locator("main")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(18, 18, 18)");
  await page.getByRole("button", { name: "Toggle frame" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Toggle frame" }).click();
  await expect(
    frame.getByRole("button", { name: "Inside frame" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("iframe")
        .evaluate((el) => el.style.getPropertyValue("--height")),
    )
    .toBe("120px");
}
export async function checkAdvancedSelection(page: Page) {
  await expect(
    page.getByRole("button", { name: "first page", exact: true }),
  ).toBeVisible();
  const heights = await page
    .locator("[data-scope=pagination][data-part=root] button")
    .evaluateAll((buttons) =>
      buttons.map((button) => button.getBoundingClientRect().height),
    );
  expect(heights.length).toBeGreaterThanOrEqual(4);
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
  const trigger = page.getByRole("combobox", { name: "Frameworks" });
  await trigger.click();
  await expect(
    page.getByRole("option", { name: "Solid", exact: true }),
  ).toHaveAttribute("data-disabled", "");
  await page.getByRole("option", { name: "Vue", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Submit frameworks" }).click();
  await expect(page.getByLabel("Submitted frameworks")).toHaveText(
    "react, vue",
  );
  await page.getByRole("button", { name: "Reset selection" }).click();
  await page.getByRole("button", { name: "Submit frameworks" }).click();
  await expect(page.getByLabel("Submitted frameworks")).toHaveText("react");
  await page.getByRole("button", { name: "last page", exact: true }).click();
  await expect(page.getByText("Page 10 of 10", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "next page", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "first page", exact: true }).click();
  await expect(page.getByText("Page 1 of 10", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "previous page", exact: true }),
  ).toBeDisabled();
}
export async function checkSegmentGroup(page: Page) {
  const group = page.getByRole("radiogroup", { name: "View" });
  await expect(group).toBeVisible();
  const overview = page.getByRole("radio", { name: "Overview", exact: true }),
    activity = page.getByRole("radio", { name: "Activity", exact: true });
  await expect(overview).toBeChecked();
  await overview.focus();
  await overview.press("ArrowRight");
  await expect(activity).toBeChecked();
  await expect(
    page.getByText("Selected: activity", { exact: true }),
  ).toBeVisible();
  await expect(activity).toBeFocused();
  expect(
    await group.evaluate((el) => {
      const form = el.closest("form");
      return form ? new FormData(form).get("view") : null;
    }),
  ).toBe("activity");
  await page.getByRole("button", { name: "Reset view" }).click();
  await expect(overview).toBeChecked();
  await expect(activity).not.toBeChecked();
  await expect(
    page.getByText("Selected: overview", { exact: true }),
  ).toBeVisible();
}
