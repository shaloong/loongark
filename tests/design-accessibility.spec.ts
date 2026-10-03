import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

for (const mode of ["light", "dark"] as const) {
  test(`全部 Story 默认状态 ${mode} 无障碍检查`, async ({ page, request }) => {
    test.setTimeout(300_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const index = await (await request.get("/index.json")).json();
    const stories = (
      Object.values(index.entries) as {
        id: string;
        type: string;
        title: string;
      }[]
    ).filter((entry) => entry.type === "story");
    const results = [];
    for (const { title, id } of stories) {
      await page.goto(
        `/iframe.html?id=${id}&viewMode=story&globals=mode:${mode}`,
      );
      await page
        .locator("#loongark-primitive-neutral-system")
        .waitFor({ state: "attached" });
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.effect?.getComputedTiming().iterations !== Infinity,
            )
            .map((animation) => animation.finished.catch(() => {})),
        ),
      );
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      results.push({ title, id, violations });
    }
    const root =
      (process.env.DESIGN_AUDIT_DIR ?? "docs/audits/2026-10-03/action-media") +
      "/accessibility";
    await mkdir(root, { recursive: true });
    await writeFile(`${root}/${mode}.json`, JSON.stringify(results, null, 2));
    expect(
      results
        .filter((entry) => entry.violations.length > 0)
        .map((entry) => ({
          id: entry.id,
          violations: entry.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        })),
    ).toEqual([]);
  });
}
