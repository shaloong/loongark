import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { checkActionMedia } from "./actionMediaChecks";
const root = auditDirectory("2026-10-03/action-media");
for (const mode of ["light", "dark"])
  test(
    "Action media " + mode + " keyboard, form and responsive layout",
    async ({ page }) => {
      test.setTimeout(90000);
      await mkdir(root, { recursive: true });
      await page.setViewportSize({ width: 900, height: 900 });
      await page.goto(
        "/iframe.html?id=examples-action-and-media--overview&viewMode=story&globals=mode:" +
          mode,
      );
      await expect(
        page.getByRole("button", { name: "Quick actions", exact: true }),
      ).toBeVisible();
      await page.screenshot({
        path: root + "/overview-" + mode + ".png",
        fullPage: true,
        animations: "disabled",
      });
      await checkActionMedia(page);
      await page.screenshot({
        path: root + "/overview-" + mode + "-mobile.png",
        fullPage: true,
        animations: "disabled",
      });
    },
  );
