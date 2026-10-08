import { test, expect } from "@playwright/test";
import { checkVirtualLayout } from "./virtualLayoutChecks";
for (const kind of ["grid", "masonry"] as const)
  for (const framework of ["react", "vue", "solid", "svelte", "Story"])
    for (const mode of ["light", "dark"])
      for (const width of [1280, 375])
        test(`virtual ${kind} ${framework} ${mode} ${width}`, async ({
          page,
        }) => {
          test.skip(
            framework === "Story"
              ? !!process.env.STATIC_DIR
              : !process.env.STATIC_DIR,
            "消费与Story专项",
          );
          const errors: string[] = [];
          page.on("pageerror", (error) => errors.push(error.message));
          await page.setViewportSize({ width, height: 1100 });
          const name =
            kind === "grid" ? "VirtualGridExample" : "VirtualMasonryExample";
          await page.goto(
            framework === "Story"
              ? `/iframe.html?id=components-virtual${kind}--basic&globals=mode:${mode}`
              : `/examples-${framework}/?example=${name}&mode=${mode}`,
          );
          await checkVirtualLayout(
            page,
            kind,
            `.artifacts/gap-completion/layout-${kind}-${framework}-${mode}-${width}`,
          );
          expect(errors).toEqual([]);
        });
for (const rtl of [false, true])
  test(
    "virtual layouts preserve pre-paint commands " + (rtl ? "rtl" : "ltr"),
    async ({ page }) => {
      test.skip(!process.env.STATIC_DIR, "共享发布模块浏览器消费");
      await page.goto("/");
      const result = await page.evaluate(async (rtl) => {
        const path = "/virtual-layout.js";
        const {
          createVirtualGrid,
          mountVirtualGrid,
          createVirtualMasonry,
          mountVirtualMasonry,
        }: typeof import("@loongark/kit") = await import(path);
        const makeRoot = (total: number, width: number) => {
          const root = document.createElement("div"),
            canvas = document.createElement("div");
          root.style.cssText =
            "width:400px;height:200px;overflow:auto;direction:" +
            (rtl ? "rtl" : "ltr");
          canvas.style.cssText = "height:" + total + "px;width:" + width + "px";
          root.append(canvas);
          document.body.append(root);
          return root;
        };
        const keys = (prefix: string) =>
          Array.from({ length: 10000 }, (_, index) => prefix + index);
        const grid = createVirtualGrid(
          {
            rowKeys: keys("row"),
            columnKeys: keys("col"),
            rowSize: 50,
            columnSize: 100,
            width: 400,
            height: 200,
            scrollToRow: 5000,
            scrollToColumn: 6000,
          },
          () => {},
        );
        const root = makeRoot(grid.rows.state.total, grid.columns.state.total),
          stop = mountVirtualGrid(root, grid);
        root.dispatchEvent(new Event("scroll"));
        grid.rows.scrollToIndex(5100);
        grid.columns.scrollToIndex(6100);
        root.dispatchEvent(new Event("scroll"));
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        const axes = {
          top: root.scrollTop,
          left: rtl ? -root.scrollLeft : root.scrollLeft,
          row: grid.rows.state.offset,
          column: grid.columns.state.offset,
        };
        stop();
        root.scrollTop = 0;
        root.scrollLeft = 0;
        root.dispatchEvent(new Event("scroll"));
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        const disposed = {
          row: grid.rows.state.offset,
          column: grid.columns.state.offset,
        };
        root.remove();
        const masonry = createVirtualMasonry(
          {
            keys: keys("item"),
            width: 400,
            height: 200,
            minColumnWidth: 100,
            gap: 0,
            estimateSize: 100,
            scrollToIndex: 5000,
          },
          () => {},
        );
        const list = makeRoot(masonry.state.total, 400),
          end = mountVirtualMasonry(list, masonry);
        list.dispatchEvent(new Event("scroll"));
        masonry.scrollToIndex(5100);
        list.dispatchEvent(new Event("scroll"));
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        const collection = {
          scroll: list.scrollTop,
          offset: masonry.state.offset,
        };
        end();
        list.scrollTop = 0;
        list.dispatchEvent(new Event("scroll"));
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        const disposedCollection = masonry.state.offset;
        list.remove();
        return { axes, disposed, collection, disposedCollection };
      }, rtl);
      expect(result.axes).toEqual({
        top: 255000,
        left: 610000,
        row: 255000,
        column: 610000,
      });
      expect(result.disposed).toEqual({ row: 255000, column: 610000 });
      expect(result.collection).toEqual({ scroll: 127500, offset: 127500 });
      expect(result.disposedCollection).toBe(127500);
    },
  );

test("virtual native renderer parts keep their own layout and focus", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "共享发布控制器嵌套内容契约");
  await page.goto("/");
  await page.evaluate(async () => {
    const path = "/virtual-layout.js";
    const {
      createVirtualGrid,
      mountVirtualGrid,
      createVirtualMasonry,
      mountVirtualMasonry,
    }: typeof import("@loongark/kit") = await import(path);
    const root = document.createElement("div");
    root.dataset.scope = "virtual-grid";
    root.dataset.testid = "nested-grid-host";
    root.style.cssText = "width:320px;height:100px";
    root.innerHTML =
      '<div data-part="canvas" style="width:320px;height:100px"><div data-part="row" style="width:320px;height:100px"><div data-part="cell" data-row-key="outer" data-column-key="first" style="width:160px;height:100px"><table><tbody><tr><td data-part="cell" tabindex="0">Nested cell</td></tr></tbody></table></div><div data-part="cell" data-row-key="outer" data-column-key="second" style="inset-inline-start:160px;width:160px;height:100px">Second cell</div></div></div>';
    document.body.append(root);
    const grid = createVirtualGrid(
      { rowKeys: ["outer"], columnKeys: ["first", "second"], height: 100 },
      () => {},
    );
    mountVirtualGrid(root, grid);
    const list = document.createElement("div") as HTMLDivElement & {
      inspectPin?: () => boolean;
    };
    list.dataset.scope = "virtual-masonry";
    list.dataset.testid = "nested-list-host";
    list.style.cssText = "width:200px;height:100px";
    list.innerHTML =
      '<div data-part="canvas" style="height:1000px"><div data-part="item" data-virtual-key="outer0" style="width:200px;height:100px"><table><tbody><tr data-virtual-key="nested-row"><td><button type="button">Nested item button</button></td></tr></tbody></table></div></div>';
    document.body.append(list);
    const masonry = createVirtualMasonry(
      {
        keys: Array.from({ length: 10 }, (_, i) => "outer" + i),
        width: 200,
        height: 100,
        estimateSize: 100,
        gap: 0,
        overscan: 0,
      },
      () => {},
    );
    mountVirtualMasonry(list, masonry);
    list.inspectPin = () => {
      masonry.setViewport(500, 200, 100);
      return masonry.state.entries.some((entry) => entry.key === "outer0");
    };
    const outside = document.createElement("button");
    outside.textContent = "Outside virtual layouts";
    document.body.append(outside);
  });
  const innerCell = page.locator('[data-testid="nested-grid-host"] td');
  await expect(innerCell).toHaveAttribute("tabindex", "0");
  expect(
    await innerCell.evaluate((node) => getComputedStyle(node).position),
  ).toBe("static");
  await innerCell.focus();
  await page.keyboard.press("ArrowRight");
  await expect(innerCell).toBeFocused();
  await page
    .getByRole("button", { name: "Nested item button", exact: true })
    .focus();
  const pinned = () =>
    page
      .locator('[data-testid="nested-list-host"]')
      .evaluate((node: HTMLElement & { inspectPin?: () => boolean }) =>
        node.inspectPin!(),
      );
  expect(await pinned()).toBe(true);
  await page
    .getByRole("button", { name: "Outside virtual layouts", exact: true })
    .focus();
  expect(await pinned()).toBe(false);
});
