import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "@playwright/test";

// 挂到真实项目子路径，不提供根路径资源回退，防止部署后资源和 iframe 失效。
const mount = await mkdtemp(join(tmpdir(), "loongark-pages-"));
const evidence = process.env.DESIGN_AUDIT_DIR ?? ".artifacts/pages-smoke";
let origin, base;
let server, browser;
const errors = [],
  results = [];
try {
  await cp("storybook-static", join(mount, "loongark"), { recursive: true });
  await mkdir(evidence, { recursive: true });
  server = spawn(process.execPath, ["scripts/serve-static.mjs", mount, "0"], {
    stdio: ["ignore", "pipe", "inherit"],
    env: { ...process.env, HOST: "127.0.0.1", PORT: "0" },
  });
  origin = await new Promise((resolve, reject) => {
    let output = "";
    const finish = (error, address) => {
      clearTimeout(timer);
      server.stdout.off("data", ready);
      server.off("exit", exited);
      server.off("error", failed);
      if (error) reject(error);
      else resolve(address);
    };
    const ready = (chunk) => {
      output += String(chunk);
      const match = output.match(
        /\[serve-static\].* on (http:\/\/127\.0\.0\.1:\d+)/,
      );
      if (match) finish(null, match[1]);
    };
    const exited = (code) => finish(new Error(`子路径服务器启动失败: ${code}`));
    const failed = (error) => finish(error);
    const timer = setTimeout(
      () => finish(new Error("子路径服务器启动超时")),
      10000,
    );
    server.stdout.on("data", ready);
    server.once("exit", exited);
    server.once("error", failed);
  });
  base = `${origin}/loongark/`;
  assert.equal(
    (await fetch(base, { signal: AbortSignal.timeout(5000) })).status,
    200,
  );
  assert.equal((await fetch(`${origin}/index.json`)).status, 404);
  const index = await (await fetch(`${base}index.json`)).json();
  assert(
    index.entries["components-datatable--frozen"],
    "Story 索引缺少冻结列示例",
  );
  browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  );
  const watch = (page) => {
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("requestfailed", (request) =>
      errors.push(`${request.url()}: ${request.failure()?.errorText}`),
    );
    page.on("response", (response) => {
      if (response.url().startsWith(origin) && response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
  };
  for (const width of [1280, 375]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    watch(page);
    await page.goto(`${base}?path=/story/components-datatable--frozen`);
    await page
      .frameLocator("#storybook-preview-iframe")
      .getByRole("table", { name: "Release projects" })
      .waitFor();
    await page.screenshot({ path: `${evidence}/manager-${width}.png` });
    results.push({ view: "manager", width, previewLoaded: true });
    await context.close();
  }
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      watch(page);
      await page.goto(
        `${base}iframe.html?id=components-datatable--frozen&globals=mode:${mode}`,
      );
      const table = page.getByRole("table", { name: "Release projects" });
      await table.waitFor();
      await table
        .getByRole("checkbox", { name: "Select a", exact: true })
        .focus();
      await page.keyboard.press("Space");
      assert.equal(
        await page.getByLabel("Selected release projects").textContent(),
        "a",
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "手机页面溢出",
      );
      await page.screenshot({
        path: `${evidence}/preview-${mode}-${width}.png`,
      });
      results.push({ view: "preview", width, mode, keyboardSelection: true });
      await context.close();
    }
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      watch(page);
      await page.goto(
        `${base}iframe.html?id=compositions-ark-utilities--async-collection&globals=mode:${mode}`,
      );
      await page
        .getByRole("button", { name: "Load collection", exact: true })
        .click();
      const items = page
        .getByRole("list", { name: "Collection items" })
        .getByRole("listitem");
      await items.nth(2).waitFor();
      assert.equal(await items.count(), 3);
      await page
        .getByRole("button", { name: "Load more", exact: true })
        .click();
      await items.nth(4).waitFor();
      assert.equal(await items.count(), 5);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "异步 Collection 手机页面溢出",
      );
      await page.screenshot({
        path: `${evidence}/collection-${mode}-${width}.png`,
      });
      results.push({
        view: "async-collection",
        width,
        mode,
        dedupPageCount: 5,
      });
      await context.close();
    }
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      watch(page);
      await page.goto(
        `${base}iframe.html?id=components-button--docs&viewMode=docs&globals=mode:${mode}`,
      );
      const reference = page.locator('[data-reference-family="Button"]');
      await reference.getByRole("tab", { name: "Svelte", exact: true }).click();
      await reference
        .getByRole("tabpanel")
        .getByText("examples/svelte/ButtonInputDialog.svelte", { exact: true })
        .waitFor();
      await reference.getByRole("region", { name: "API 属性表" }).waitFor();
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "Docs 子路径手机页面溢出",
      );
      await page.screenshot({
        path: `${evidence}/docs-${mode}-${width}.png`,
        animations: "disabled",
      });
      results.push({ view: "docs", width, mode, referenceLoaded: true });
      await context.close();
    }
  assert.deepEqual(errors, [], "静态展示有运行时或资源加载错误");
  console.log(
    "Storybook 子路径检查通过：首页/iframe、桌面/手机、浅深色、键盘交互及资源加载。",
  );
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await exited;
  }
  await rm(mount, { recursive: true, force: true });
  await mkdir(evidence, { recursive: true });
  await writeFile(
    `${evidence}/results.json`,
    JSON.stringify({ results, errors }, null, 2) + "\n",
  );
}
