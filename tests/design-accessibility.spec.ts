import { auditRoot as resolveAuditRoot } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { StoryIndex } from "storybook/internal/types";
import { mkdir, writeFile } from "node:fs/promises";

const batchCount = 8;
for (const mode of ["light", "dark"] as const) {
  for (let batch = 0; batch < batchCount; batch++) {
    test(`全部 Story 默认状态 ${mode} 无障碍检查 ${batch + 1}/${batchCount}`, async ({
      page,
      request,
    }) => {
      test.setTimeout(300_000);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const index: StoryIndex = await (await request.get("/index.json")).json();
      const allStories = Object.values(index.entries).filter(
        (entry) => entry.type === "story",
      );
      // 每个 Story 恰好属于一个批次；避免数百次导航共享一个时间预算。
      const stories = allStories.filter(
        (_, index) => index % batchCount === batch,
      );
      expect(stories.length).toBeGreaterThan(0);
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
      const root = resolveAuditRoot() + "/accessibility";
      await mkdir(root, { recursive: true });
      await writeFile(
        `${root}/${mode}-${batch}.json`,
        JSON.stringify(results, null, 2),
      );
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
}
