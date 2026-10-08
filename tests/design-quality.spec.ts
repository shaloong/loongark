import { auditRoot as resolveAuditRoot } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import { mkdir, writeFile, readFile } from "node:fs/promises";

for (const mode of ["light", "dark"] as const) {
  for (const batch of [0, 1, 2, 3]) {
    test(`Story 批次 ${batch + 1}/4 的 ${mode} 间距、窄屏与动效属性`, async ({
      page,
      request,
    }) => {
      test.setTimeout(240_000);
      const phase =
        process.env.DESIGN_AUDIT_PHASE === "before" ? "before" : "after";
      const auditRoot = resolveAuditRoot();
      const root = `${auditRoot}/${phase}/${mode}`;
      await mkdir(root, { recursive: true });
      if (phase === "after") await mkdir(`${root}/mobile`, { recursive: true });
      const index: {
        entries: Record<string, { type: string; id: string; title: string }>;
      } = await (await request.get("/index.json")).json();
      const allStories = Object.values(index.entries).filter(
        (entry) => entry.type === "story",
      );
      const titles = [
        ...new Set(allStories.map((entry) => entry.title)),
      ].sort();
      const expectedFamilies: { families: string[] } = JSON.parse(
        await readFile("docs/component-coverage.json", "utf8"),
      );
      expect(
        titles
          .filter((title) => title.startsWith("Components/"))
          .map((title) => title.slice(11))
          .sort(),
      ).toEqual([...expectedFamilies.families].sort());
      // 同一组件族只属于一个批次，截图与测量路径不会被并行用例覆盖。
      const selectedTitles = new Set(
        titles.filter((_, index) => index % 4 === batch),
      );
      const stories = allStories.filter((story) =>
        selectedTitles.has(story.title),
      );
      const captured = new Set<string>();
      const results = [];
      for (const story of stories) {
        await page.setViewportSize({ width: 900, height: 650 });
        await page.goto(
          `/iframe.html?id=${story.id}&viewMode=story&globals=mode:${mode}`,
        );
        await page
          .locator("#loongark-primitive-button")
          .waitFor({ state: "attached" });
        await page.locator(".loongark-story-surface").waitFor();
        const firstFamily =
          story.title.startsWith("Components/") && !captured.has(story.title);
        if (phase === "after" || firstFamily) {
          await page.screenshot({
            path: `${root}/${story.id}.png`,
            animations: "disabled",
            fullPage: true,
          });
        }
        if (firstFamily) captured.add(story.title);
        await page.setViewportSize({ width: 375, height: 812 });
        // Anchored overlays reposition asynchronously after the viewport resize.
        if (phase === "after")
          await expect
            .poll(
              () => page.evaluate(() => document.documentElement.scrollWidth),
              {
                message:
                  story.id + ": viewport resize must settle without overflow",
              },
            )
            .toBeLessThanOrEqual(376);
        if (phase === "after" && firstFamily)
          await page.screenshot({
            path: `${root}/mobile/${story.id}.png`,
            animations: "disabled",
            fullPage: true,
          });
        const metrics = await page.evaluate(() => {
          const surface = document.querySelector(".loongark-story-surface")!;
          const visible = [
            ...document.querySelectorAll<HTMLElement>(
              "[data-scope][data-part]",
            ),
          ].filter(
            (el) =>
              el.getBoundingClientRect().width > 0 &&
              el.getBoundingClientRect().height > 0 &&
              getComputedStyle(el).visibility === "visible",
          );
          const parts = visible.map((el) => {
            const s = getComputedStyle(el),
              r = el.getBoundingClientRect();
            return {
              scope: el.dataset.scope,
              part: el.dataset.part,
              width: r.width,
              height: r.height,
              padding: s.padding,
              margin: s.margin,
              gap: s.gap,
              fontSize: s.fontSize,
              transitionProperty: s.transitionProperty,
              transitionDuration: s.transitionDuration,
              animationName: s.animationName,
              animationDuration: s.animationDuration,
            };
          });
          return {
            viewport: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            gutter: getComputedStyle(surface).padding,
            parts,
            transitionAll: parts.filter(
              (x) =>
                x.transitionProperty === "all" && x.transitionDuration !== "0s",
            ),
            outside: visible
              .filter((el) => {
                const r = el.getBoundingClientRect();
                return (
                  r.right > innerWidth + 1 &&
                  !el.closest(
                    '[data-scope="carousel"],[data-scope="scroll-area"],[data-scope="marquee"],[data-scope="table"],[data-scope="data-table"]',
                  )
                );
              })
              .map((el) => ({
                scope: el.dataset.scope,
                part: el.dataset.part,
              })),
          };
        });
        results.push({ ...story, ...metrics });
        if (phase === "after") {
          expect
            .soft(metrics.scrollWidth, `${story.id}: 375px 页面溢出`)
            .toBeLessThanOrEqual(376);
          expect
            .soft(metrics.transitionAll, `${story.id}: transition all`)
            .toEqual([]);
        }
      }
      await writeFile(
        `${root}/metrics-${batch}.json`,
        JSON.stringify(
          {
            mode,
            batch,
            stories: stories.length,
            capturedFamilies: captured.size,
            results,
          },
          null,
          2,
        ),
      );
      expect(captured.size).toBe(
        [...selectedTitles].filter((title) => title.startsWith("Components/"))
          .length,
      );
    });
  }
}
