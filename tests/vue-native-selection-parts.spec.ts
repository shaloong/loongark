import { test, expect } from "@playwright/test";
import { build } from "vite";
import { resolve } from "node:path";

test.skip(!process.env.STATIC_DIR, "原生 Vue 部件作为框架消费契约运行");
let browserModule = "";
test.beforeAll(async () => {
  const entry = "vue-native-parts-fixture";
  const result = await build({
    configFile: false,
    logLevel: "silent",
    resolve: {
      alias: ["vue", "kit", "theme", "primitives", "tokens"].map(name => ({
        find: new RegExp(`^@loongark/${name}$`),
        replacement: resolve("packages", name, "dist/index.js"),
      })),
      dedupe: ["vue"],
    },
    plugins: [
      {
        name: entry,
        resolveId: (id) => (id === entry ? "\0" + entry : undefined),
        load: (id) =>
          id === "\0" + entry
            ? `import {mountNativeParts,unmountNativeParts} from ${JSON.stringify(resolve("tests/consumers/vue/NativeSelectionParts.ts"))};window.mountNativeParts=mountNativeParts;window.unmountNativeParts=unmountNativeParts;mountNativeParts();`
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
  if (!("output" in bundle)) throw Error("缺少 Vue 原生部件消费产物");
  const chunk = bundle.output.find((item) => item.type === "chunk");
  if (!chunk) throw Error("缺少 Vue 原生部件浏览器代码");
  browserModule = chunk.code;
});

test("Vue 四种 HiddenInput asChild 保留调用方节点、键盘、表单 reset 及卸载重挂", async ({
  page,
  browserName,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("about:blank");
  await page.setContent('<main id="fixture"></main>');
  await page.addScriptTag({ content: browserModule });
  const form = page.getByRole("form", { name: "Custom native selections" });
  const values = () =>
    form.evaluate((n) =>
      Object.fromEntries(new FormData(n as HTMLFormElement)),
    );
  await expect(form.locator("input[data-supplied-input]")).toHaveCount(6);
  await expect
    .poll(values)
    .toEqual({ subscribed: "on", density: "compact", frameworks: "Vue" });
  await form.getByRole("checkbox", { name: "Custom agreement" }).press("Space");
  await form
    .getByRole("checkbox", { name: "Custom notifications" })
    .press("Space");
  await form
    .getByRole("radio", { name: "compact", exact: true })
    .press("ArrowRight");
  const input = form.getByRole("textbox", { name: "Custom frameworks" });
  await input.fill("Solid");
  await input.press("Enter");
  await expect(
    form.locator("[data-scope=tags-input][data-part=item]"),
  ).toHaveCount(2);
  await expect.poll(values).toEqual({
    agreement: "on",
    subscribed: "on",
    notifications: "on",
    density: "comfortable",
    frameworks: "Vue, Solid",
  });
  await page.screenshot({
    path: `.artifacts/p0-selection/native-parts-${browserName}-vue.png`,
    fullPage: true,
  });
  await form.evaluate((n) => (n as HTMLFormElement).reset());
  await expect
    .poll(values)
    .toEqual({ subscribed: "on", density: "compact", frameworks: "Vue" });
  await expect(
    form.locator("[data-scope=tags-input][data-part=item]"),
  ).toHaveCount(1);
  await page.evaluate(() => {
    const w = window as unknown as {
      mountNativeParts(): void;
      unmountNativeParts(): void;
    };
    w.unmountNativeParts();
    w.mountNativeParts();
  });
  await expect(form.locator("input[data-supplied-input]")).toHaveCount(6);
  await expect
    .poll(values)
    .toEqual({ subscribed: "on", density: "compact", frameworks: "Vue" });
  expect(errors).toEqual([]);
});
