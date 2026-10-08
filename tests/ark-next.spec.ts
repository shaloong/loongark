import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  checkDateInput,
  checkToc,
  checkSwap,
  checkDrawer,
} from "./arkNextChecks";
for (const mode of ["light", "dark"])
  for (const [name, id, check] of [
    ["DateInput", "components-dateinput--basic", checkDateInput],
    ["Toc", "components-toc--basic", checkToc],
    ["Swap", "components-swap--basic", checkSwap],
    ["Drawer", "components-drawer--snap-points", checkDrawer],
  ] as const)
    test(`${name} ${mode} 高级行为与语义`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${id}&globals=mode:${mode}`);
      await check(page);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
