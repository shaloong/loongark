import { expect, test } from "@playwright/test";
import { build } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from "node:path";

test.skip(!process.env.STATIC_DIR, "Solid 原生 ref 作为发布消费契约运行");
let code = "";
test.beforeAll(async () => {
  const entry = "solid-native-refs";
  const result = await build({
    configFile: false,
    logLevel: "silent",
    resolve: {
      alias: Object.fromEntries(
        ["solid", "kit", "theme", "primitives", "tokens"].map((p) => [
          "@loongark/" + p,
          resolve("packages", p, "dist/index.js"),
        ]),
      ),
      dedupe: ["solid-js"],
    },
    plugins: [
      solid(),
      {
        name: entry,
        resolveId: (id) => (id === entry ? "\0" + entry : undefined),
        load: (id) =>
          id === "\0" + entry
            ? `import * as fixture from ${JSON.stringify(resolve("tests/consumers/solid/NativeSelectionRefs.tsx"))};window.fixture=fixture;fixture.mountNativeRefs();`
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
  if (!("output" in bundle)) throw Error("缺少 Solid 原生 ref 产物");
  const chunk = bundle.output.find((n) => n.type === "chunk");
  if (!chunk) throw Error("缺少 Solid 浏览器代码");
  code = chunk.code;
});
test("Solid 原生选择 ref 转发、受控拒绝与卸载重挂保持同一契约", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("about:blank");
  await page.setContent("<main></main>");
  await page.addScriptTag({ content: code });
  const refs = () =>
    page.evaluate(() =>
      (
        window as unknown as {
          fixture: typeof import("./consumers/solid/NativeSelectionRefs");
        }
      ).fixture.nativeRefs(),
    );
  const expected = [
    { name: "checkbox", connected: true, value: "on" },
    { name: "switch", connected: true, value: "on" },
    { name: "compact", connected: true, value: "compact" },
    { name: "comfortable", connected: true, value: "comfortable" },
    { name: "tags", connected: true, value: "Solid" },
  ];
  await expect.poll(refs).toEqual(expected);
  const form = page.getByRole("form", { name: "Native selection refs" });
  await form.getByRole("checkbox", { name: "Agreement" }).press("Space");
  await form.getByRole("checkbox", { name: "Notifications" }).press("Space");
  await form
    .getByRole("radio", { name: "compact", exact: true })
    .press("ArrowRight");
  await expect
    .poll(() =>
      form.evaluate((n) =>
        Object.fromEntries(new FormData(n as HTMLFormElement)),
      ),
    )
    .toEqual({
      agreement: "on",
      notifications: "on",
      density: "compact",
      frameworks: "Solid",
    });
  await page.evaluate(() =>
    (
      window as unknown as {
        fixture: typeof import("./consumers/solid/NativeSelectionRefs");
      }
    ).fixture.unmountNativeRefs(),
  );
  await expect
    .poll(refs)
    .toEqual(expected.map((n) => ({ ...n, connected: false })));
  await page.evaluate(() =>
    (
      window as unknown as {
        fixture: typeof import("./consumers/solid/NativeSelectionRefs");
      }
    ).fixture.mountNativeRefs(),
  );
  await expect.poll(refs).toEqual(expected);
  await expect(form.getByRole("checkbox", { name: "Agreement" })).toBeChecked();
  expect(errors).toEqual([]);
});
