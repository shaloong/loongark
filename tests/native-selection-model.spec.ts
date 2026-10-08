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
test("选择控件卸载后不再读取只读状态，新的按键允许同步聚焦标签输入", async ({
  page,
}) => {
  await page.clock.install();
  await fixture(page);
  await page.setContent(
    '<input id="outside" type="checkbox"><div data-scope="tags-input" data-part="root"><input data-part="input"><input id="tags" data-scope="tags-input" data-part="hidden-input" hidden></div>',
  );
  await page.evaluate(() => {
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      disposeSelection(): void;
      reads: number;
    };
    w.reads = 0;
    const outside = document.querySelector<HTMLInputElement>("#outside")!;
    const tags = document.querySelector<HTMLInputElement>("[data-part=input]")!;
    w.disposeSelection = w.mountNativeSelection(outside, () => {
      w.reads++;
      return { readOnly: true };
    });
    w.mountNativeSelection(
      document.querySelector<HTMLInputElement>("#tags")!,
      () => ({ formValue: "" }),
    );
    outside.addEventListener("keydown", () => tags.focus());
  });
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  const tags = page.locator("[data-part=input]");
  await tags.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("#outside")).toBeFocused();
  await page.evaluate(() =>
    (window as unknown as { disposeSelection(): void }).disposeSelection(),
  );
  await page.keyboard.press("ArrowRight");
  await expect(tags).toBeFocused();
  await page.clock.runFor(100);
  await expect(tags).toBeFocused();
  expect(
    await page.evaluate(() => (window as unknown as { reads: number }).reads),
  ).toBe(0);
});
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

test("隐藏标签原生无效事件尊重调用方取消与卸载，不抢走外部焦点", async ({
  page,
}) => {
  await fixture(page);
  await page.setContent(
    '<button id="outside">Outside</button><div data-scope="tags-input" data-part="root"><input data-part="input"><input id="tags" data-scope="tags-input" data-part="hidden-input" hidden required type="text"></div>',
  );
  await page.evaluate(() => {
    const hidden = document.getElementById("tags") as HTMLInputElement;
    const outside = document.getElementById("outside") as HTMLButtonElement;
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      disposeTags: () => void;
    };
    hidden.addEventListener("invalid", (event) => event.preventDefault(), {
      once: true,
    });
    w.disposeTags = w.mountNativeSelection(hidden, () => ({
      formValue: hidden.value,
    }));
    outside.focus();
    if (hidden.checkValidity()) throw Error("调用方取消提示不能放行无效值");
  });
  await expect(page.locator("#outside")).toBeFocused();
  await page.evaluate(() => {
    (document.getElementById("tags") as HTMLInputElement).checkValidity();
  });
  await expect(page.locator("[data-part=input]")).toBeFocused();
  await page.evaluate(() => {
    (window as unknown as { disposeTags: () => void }).disposeTags();
    document.getElementById("outside")!.focus();
    (document.getElementById("tags") as HTMLInputElement).checkValidity();
  });
  await expect(page.locator("#outside")).toBeFocused();
});

for (const position of ["before", "after"])
  test(`原生首错顺序保留，标签代理与普通输入 ${position}`, async ({ page }) => {
    await fixture(page);
    const ordinary = '<input id="ordinary" aria-label="Ordinary" required>';
    const tags =
      '<div data-scope="tags-input" data-part="root"><input id="visible-tags" data-part="input" aria-label="Tags"><input id="serialized-tags" data-scope="tags-input" data-part="hidden-input" hidden required type="text"></div>';
    await page.setContent(
      `<form>${position === "before" ? ordinary + tags : tags + ordinary}<button>Submit</button></form>`,
    );
    await page.evaluate(() => {
      const hidden = document.getElementById(
        "serialized-tags",
      ) as HTMLInputElement;
      (
        window as unknown as {
          mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
        }
      ).mountNativeSelection(hidden, () => ({ formValue: hidden.value }));
    });
    await page.getByRole("button", { name: "Submit" }).click();
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    await expect(
      page.locator(position === "before" ? "#ordinary" : "#visible-tags"),
    ).toBeFocused();
  });

test("标签无效事件不解除待运行 Tab 保护，首个错误仍保留焦点", async ({
  page,
}) => {
  await fixture(page);
  await page.clock.install();
  await page.setContent(
    '<form><input id="ordinary" aria-label="Ordinary" required><div data-scope="tags-input" data-part="root"><input id="visible-tags" data-part="input"><input id="serialized-tags" data-scope="tags-input" data-part="hidden-input" hidden required type="text"></div><button>Submit</button></form>',
  );
  await page.evaluate(() => {
    const hidden = document.getElementById(
      "serialized-tags",
    ) as HTMLInputElement;
    (
      window as unknown as {
        mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      }
    ).mountNativeSelection(hidden, () => ({ formValue: hidden.value }));
    document.getElementById("visible-tags")!.focus();
  });
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  await page.evaluate(() =>
    requestAnimationFrame(() =>
      document.getElementById("visible-tags")!.focus(),
    ),
  );
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Submit" })).toBeFocused();
  // 异步原生提交没有新的用户按键；Enter 本身按契约解除此前的 Tab 保护。
  await page.evaluate(() => document.querySelector("form")!.requestSubmit());
  await expect(page.locator("#ordinary")).toBeFocused();
  await page.clock.runFor(100);
  await expect(page.locator("#ordinary")).toBeFocused();
});

test("首错约束在恢复帧前改变时，标签不覆盖新的首个错误", async ({ page }) => {
  await fixture(page);
  await page.setContent(
    '<form><input id="ordinary" aria-label="Ordinary"><div data-scope="tags-input" data-part="root"><input id="visible-tags" data-part="input"><input id="serialized-tags" data-scope="tags-input" data-part="hidden-input" hidden required type="text"></div></form>',
  );
  await page.evaluate(() => {
    const hidden = document.getElementById(
      "serialized-tags",
    ) as HTMLInputElement;
    (
      window as unknown as {
        mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      }
    ).mountNativeSelection(hidden, () => ({ formValue: hidden.value }));
    hidden.reportValidity();
    const ordinary = document.getElementById("ordinary") as HTMLInputElement;
    ordinary.required = true;
    ordinary.reportValidity();
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await expect(page.locator("#ordinary")).toBeFocused();
});

test("文本输入提交后保留最新已接受的格式值，拒绝编辑与卸载不会复活旧任务", async ({
  page,
}) => {
  await fixture(page);
  await page.setContent(
    '<form><input name="quantity" aria-label="Quantity" value="٣"></form>',
  );
  await page.evaluate(() => {
    const input = document.querySelector("input")!;
    const w = window as unknown as {
      mountNativeSelection: typeof import("@loongark/kit").mountNativeSelection;
      disposeText(): void;
      events: number;
    };
    let accepted = "٣";
    w.events = 0;
    input.addEventListener("input", () => {
      w.events++;
      if (input.value === "4")
        queueMicrotask(() => {
          accepted = "٤";
        });
    });
    w.disposeText = w.mountNativeSelection(
      input,
      () => ({ formValue: accepted }),
      { syncOnInput: true },
    );
  });
  const input = page.getByRole("textbox", { name: "Quantity" });
  await input.fill("4");
  await expect(input).toHaveValue("٤");
  await input.fill("5");
  await expect(input).toHaveValue("٤");
  expect(
    await page
      .locator("form")
      .evaluate((n) => new FormData(n as HTMLFormElement).get("quantity")),
  ).toBe("٤");
  await page.evaluate(() =>
    (window as unknown as { disposeText(): void }).disposeText(),
  );
  await input.fill("6");
  await expect(input).toHaveValue("6");
  expect(
    await page.evaluate(() => (window as unknown as { events: number }).events),
  ).toBe(3);
});
