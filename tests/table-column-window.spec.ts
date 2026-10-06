import { expect, test } from "@playwright/test";
import { checkTableColumnWindow } from "./tableColumnWindowChecks";
for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`column window ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "对应新构建消费或Story专项",
        );
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-datatable--column-virtualization&globals=mode:${mode}`
            : `/examples-${framework}/?example=TableColumnWindowExample&mode=${mode}`,
        );
        await checkTableColumnWindow(
          page,
          `.artifacts/gap-completion/column-${framework}-${mode}-${width}`,
        );
        expect(errors).toEqual([]);
      });

test("horizontal initial command survives a pre-paint RTL scroll event", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "Kit发布模块专项");
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const path = "/column-window.js";
    const {
      createDataTableColumnWindow,
      dataTableView,
      mountDataTableColumnWindow,
    }: typeof import("@loongark/kit") = await import(path);
    const columns = Array.from({ length: 80 }, (_, index) => ({
      key: `c${index}`,
      label: `Column ${index}`,
    }));
    const props = {
      data: [],
      columns,
      columnVirtualization: { width: 400, scrollToIndex: 40 },
    };
    const model = createDataTableColumnWindow(
      props,
      dataTableView(props, { query: "", page: 1 }),
      () => {},
    );
    const initial = model.state.offset;
    const viewport = document.createElement("div");
    viewport.style.cssText =
      "width:420px;height:100px;overflow:auto;direction:rtl";
    const table = document.createElement("table");
    table.style.cssText = "width:12848px;table-layout:fixed;border-spacing:0";
    table.innerHTML = `<colgroup><col style="width:48px">${columns.map(() => '<col style="width:160px">').join("")}</colgroup><thead><tr><th>Select</th>${columns.map((column) => `<th>${column.label}</th>`).join("")}</tr></thead>`;
    viewport.append(table);
    document.body.append(viewport);
    const stop = mountDataTableColumnWindow(viewport, model);
    viewport.dispatchEvent(new Event("scroll"));
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    const after = model.state.offset,
      scroll = viewport.scrollLeft;
    stop();
    viewport.scrollLeft = 0;
    viewport.dispatchEvent(new Event("scroll"));
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    const disposed = model.state.offset;
    viewport.remove();
    return { initial, after, scroll, disposed };
  });
  expect(result.initial).toBe(6400);
  expect(result.after).toBe(6400);
  expect(result.scroll).toBe(-6400);
  expect(result.disposed).toBe(6400);
});
