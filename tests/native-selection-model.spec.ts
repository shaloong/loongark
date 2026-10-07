import { test, expect } from "@playwright/test";
import { build } from "vite";
import { resolve } from "node:path";
let browserModule = "";
test.beforeAll(async () => {
  const entry = "native-selection-fixture";
  const result = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [
      {
        name: entry,
        resolveId: (id) => (id === entry ? "\0" + entry : undefined),
        load: (id) =>
          id === "\0" + entry
            ? `import {mountNativeSelection} from ${JSON.stringify(resolve("packages/kit/dist/native-selection.js"))};window.mountNativeSelection=mountNativeSelection;`
            : undefined,
      },
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: { input: entry, output: { format: "iife" } },
    },
  });
  const bundle = Array.isArray(result) ? result[0] : result;
  if (!("output" in bundle)) throw Error("Missing native selection fixture");
  const chunk = bundle.output.find((item) => item.type === "chunk");
  if (!chunk) throw Error("Missing native selection fixture chunk");
  browserModule = chunk.code;
});
const fixture = async (page: import("@playwright/test").Page) => {
  await page.goto("about:blank");
  await page.setContent(
    '<form id="prefs"><label>Agreement<input id="agreement" type="checkbox" name="agreement" value="on" checked></label><div data-scope="radio-group" data-part="root"><label>Compact<input id="compact" type="radio" name="density" value="compact" checked></label><label>Spacious<input id="spacious" type="radio" name="density" value="spacious"></label></div></form>',
  );
  await page.addScriptTag({ content: browserModule });
};
test("拒绝点击与原生 reset 后表单值保持调用方已接受状态，不重复派发事件", async ({
  page,
}) => {
  await fixture(page);
  await page.evaluate(() => {
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      changes: number;
    };
    w.changes = 0;
    const input = document.getElementById("agreement") as HTMLInputElement;
    input.defaultChecked = false;
    input.checked = true;
    document
      .querySelector("form")!
      .addEventListener("change", () => w.changes++);
    w.mountNativeSelection(
      document.getElementById("agreement") as HTMLInputElement,
      () => ({ checked: true }),
    );
    w.mountNativeSelection(
      document.getElementById("spacious") as HTMLInputElement,
      () => ({ radioValue: "compact" }),
    );
  });
  await page.getByRole("checkbox").click();
  await page.getByRole("radio", { name: "Spacious" }).click();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page.getByRole("radio", { name: "Compact" })).toBeChecked();
  expect(
    await page.evaluate(
      () => (window as unknown as { changes: number }).changes,
    ),
  ).toBe(2);
  await page.locator("form").evaluate((n) => (n as HTMLFormElement).reset());
  await expect
    .poll(() =>
      page
        .locator("form")
        .evaluate((n) =>
          Object.fromEntries(new FormData(n as HTMLFormElement)),
        ),
    )
    .toEqual({ agreement: "on", density: "compact" });
});
test("回调后读取最新状态，支持延迟接受而不复活旧值", async ({ page }) => {
  await fixture(page);
  await page.evaluate(() => {
    const input = document.getElementById("agreement") as HTMLInputElement;
    let checked = true;
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
    };
    w.mountNativeSelection(input, () => ({ checked }));
    input.addEventListener("change", () =>
      queueMicrotask(() => {
        checked = false;
      }),
    );
  });
  await page.getByRole("checkbox").click();
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await expect(page.getByRole("checkbox")).not.toBeChecked();
});
test("卸载取消等待中的同步，重复清理不重写分离节点", async ({ page }) => {
  await fixture(page);
  const reads = await page.evaluate(async () => {
    const input = document.getElementById("agreement") as HTMLInputElement;
    let reads = 0;
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
    };
    const dispose = w.mountNativeSelection(input, () => {
      reads++;
      return { checked: true };
    });
    input.click();
    dispose();
    dispose();
    input.remove();
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    if (input.checked) throw Error("卸载后不应恢复旧值");
    return reads;
  });
  expect(reads).toBe(0);
});

test("只读单选保留焦点和原生提交值，方向键不修改选择", async ({ page }) => {
  await fixture(page);
  await page.evaluate(() => {
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
    };
    for (const input of Array.from(
      document.querySelectorAll<HTMLInputElement>("input[type=radio]"),
    ))
      w.mountNativeSelection(input, () => ({
        radioValue: "compact",
        readOnly: true,
      }));
  });
  const compact = page.getByRole("radio", { name: "Compact" });
  await compact.focus();
  await compact.press("ArrowRight");
  await expect(compact).toBeFocused();
  await expect(compact).toBeChecked();
  await expect(compact).toBeEnabled();
  expect(
    await page
      .locator("form")
      .evaluate((n) => new FormData(n as HTMLFormElement).get("density")),
  ).toBe("compact");
});

test("外部关联隐藏字段 reset 保留已接受的序列化值，不重新拼接分隔符", async ({
  page,
}) => {
  await fixture(page);
  await page.evaluate(() => {
    const input = document.createElement("input");
    input.type = "text";
    input.hidden = true;
    input.name = "frameworks";
    input.setAttribute("form", "prefs");
    document.body.append(input);
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
    };
    w.mountNativeSelection(input, () => ({ formValue: "React | Vue" }));
    input.value = "Rejected serialization";
  });
  await page.locator("form").evaluate((n) => (n as HTMLFormElement).reset());
  await expect
    .poll(() =>
      page
        .locator("form")
        .evaluate((n) => new FormData(n as HTMLFormElement).get("frameworks")),
    )
    .toBe("React | Vue");
});

test("拒绝父单选变更不改写嵌套题组或其他表单的选择", async ({ page }) => {
  await fixture(page);
  await page.evaluate(() => {
    const root = document.querySelector("[data-scope=radio-group]")!;
    root.insertAdjacentHTML(
      "beforeend",
      '<div data-scope="radio-group" data-part="root"><label>Nested spacious<input type="radio" name="nestedDensity" value="spacious" checked></label></div>',
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      '<form><label>Other spacious<input type="radio" name="otherDensity" value="spacious" checked></label></form>',
    );
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
    };
    w.mountNativeSelection(
      document.getElementById("spacious") as HTMLInputElement,
      () => ({ radioValue: "compact" }),
    );
  });
  await page.getByRole("radio", { name: "Spacious", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Compact", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Nested spacious", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Other spacious", exact: true }),
  ).toBeChecked();
  expect(
    await page
      .locator("#prefs")
      .evaluate((n) => Object.fromEntries(new FormData(n as HTMLFormElement))),
  ).toEqual({ agreement: "on", density: "compact", nestedDensity: "spacious" });
});

test("混合复选状态在拒绝交互和 reset 后保留语义，接受后提交原生值", async ({
  page,
}) => {
  await fixture(page);
  await page.evaluate(() => {
    const input = document.getElementById("agreement") as HTMLInputElement;
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      acceptMixed(): void;
    };
    let accepted = { checked: false, indeterminate: true };
    input.checked = false;
    input.indeterminate = true;
    w.mountNativeSelection(input, () => accepted);
    w.acceptMixed = () => {
      accepted = { checked: true, indeterminate: false };
    };
  });
  const input = page.getByRole("checkbox", { name: "Agreement" });
  const values = () =>
    page
      .locator("form")
      .evaluate((n) => new FormData(n as HTMLFormElement).get("agreement"));
  await input.press("Space");
  await expect(input).not.toBeChecked();
  await expect(input).toHaveJSProperty("indeterminate", true);
  await expect.poll(values).toBeNull();
  await page.locator("form").evaluate((n) => (n as HTMLFormElement).reset());
  await expect(input).not.toBeChecked();
  await expect(input).toHaveJSProperty("indeterminate", true);
  await expect.poll(values).toBeNull();
  await page.evaluate(() =>
    (window as unknown as { acceptMixed(): void }).acceptMixed(),
  );
  await input.press("Space");
  await expect(input).toBeChecked();
  await expect(input).toHaveJSProperty("indeterminate", false);
  await expect.poll(values).toBe("on");
});
