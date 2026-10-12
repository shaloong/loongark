import assert from "node:assert/strict";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// 用实际发布包验证 RSC，不能用 alias、模拟 React 或开发服务器代替生产构建。
const artifacts = resolve(".artifacts/releases/react-rsc");
await mkdir(artifacts, { recursive: true });
const root = await mkdtemp(resolve(tmpdir(), "loongark-react-rsc-"));
await mkdir(resolve(root, "packages"));
const reports = JSON.parse(
  await readFile(".artifacts/releases/packages/report.json", "utf8"),
);
const dependencies = {};
for (const entry of reports.filter((entry) =>
  ["tokens", "theme", "primitives", "kit", "react"].some(
    (name) => entry.name === `@loongark/${name}`,
  ),
)) {
  const name = basename(entry.tarball);
  await copyFile(entry.tarball, resolve(root, "packages", name));
  dependencies[entry.name] = `file:./packages/${name}`;
}
assert.equal(Object.keys(dependencies).length, 5);
const react = JSON.parse(
  await readFile("node_modules/react/package.json", "utf8"),
).version;
const reactDOM = JSON.parse(
  await readFile("node_modules/react-dom/package.json", "utf8"),
).version;
assert.equal(react, reactDOM);
const next = "16.4.0";
await writeFile(
  resolve(root, "package.json"),
  JSON.stringify(
    {
      name: "loongark-react-rsc-consumer",
      private: true,
      type: "module",
      packageManager: JSON.parse(await readFile("package.json", "utf8"))
        .packageManager,
      dependencies: { ...dependencies, next, react, "react-dom": reactDOM },
      pnpm: { overrides: { ...dependencies, react, "react-dom": reactDOM } },
    },
    null,
    2,
  ),
);
await writeFile(
  resolve(root, "next.config.mjs"),
  "export default {experimental:{cpus:2}};\n",
);
await mkdir(resolve(root, "app/subpaths"), { recursive: true });
await writeFile(
  resolve(root, "app/layout.js"),
  'export const metadata={title:"LoongArk RSC 消费回归"};export default function Layout({children}) { return <html lang="zh-CN"><body>{children}</body></html>; }',
);
await writeFile(
  resolve(root, "app/styles.js"),
  `import {createLoongArkTheme} from '@loongark/theme';
import {bootstrapKit} from '@loongark/kit/bootstrap';
export default function Styles({id}) {const theme=createLoongArkTheme({targetId:id,mode:'dark'});bootstrapKit(theme);return <style dangerouslySetInnerHTML={{__html:theme.toStyleSheet()}}/>;}`,
);
await writeFile(
  resolve(root, "app/interactive.js"),
  `'use client';
import {useState} from 'react';
import {LoongArkButton,createListCollection} from '@loongark/react';
export default function Interactive(){const [count,setCount]=useState(0);const collection=createListCollection({items:['客户端集合']});return <><p>{collection.items[0]}</p><LoongArkButton onClick={()=>setCount(value=>value+1)}>计数按钮</LoongArkButton><output aria-label="点击次数">{count}</output></>;}`,
);
for (const subpath of [false, true]) {
  const imports = subpath
    ? `import {LoongArkProvider} from '@loongark/react/provider';import {LoongArkButton} from '@loongark/react/button';import {parseLocalizedDate} from '@loongark/react/date-picker';`
    : `import {LoongArkProvider,LoongArkButton,parseLocalizedDate} from '@loongark/react';`;
  const prefix = subpath ? "../" : "./";
  const id = subpath ? "rsc-subpaths" : "rsc-root";
  await writeFile(
    resolve(root, subpath ? "app/subpaths/page.js" : "app/page.js"),
    `${imports}
import Interactive from '${prefix}interactive';import Styles from '${prefix}styles';
export default function Page(){const date=parseLocalizedDate('12/10/2026',{locale:'en-GB'});if(!date)throw Error('服务端日期解析失败');return <><Styles id="${id}"/><LoongArkProvider targetId="${id}" mode="dark"><main style={{background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)',minHeight:'100dvh'}}><p>{date.toString()}</p><LoongArkButton>服务端导入按钮</LoongArkButton><Interactive/></main></LoongArkProvider></>;}`,
  );
}
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" };
let installRetries = 0;
function run(args, name) {
  const result = spawnSync("pnpm", args, {
    cwd: root,
    env,
    encoding: "utf8",
    timeout: 300_000,
    maxBuffer: 16 * 1024 * 1024,
  });
  const log = (result.stdout ?? "") + (result.stderr ?? "");
  return writeFile(resolve(artifacts, `${name}.log`), log).then(() => {
    // 已观察到 CI 下载停在最后一个依赖；只重试安装进程超时，不重试构建或断言。
    if (name === "install" && result.error?.code === "ETIMEDOUT") {
      installRetries++;
      console.log("冻结安装超时，使用同一锁文件重试一次；首次日志已保留");
      return run(args, "install-retry");
    }
    assert.equal(
      result.status,
      0,
      `${name} 失败：${result.error ?? log.slice(-8000)}`,
    );
  });
}
const store = resolve(".artifacts/releases/store");
await run(
  ["install", "--lockfile-only", "--ignore-workspace", "--store-dir", store],
  "lock",
);
await run(
  ["install", "--frozen-lockfile", "--ignore-workspace", "--store-dir", store],
  "install",
);
await run(["exec", "next", "build", "--webpack"], "build");
const reservation = createServer();
reservation.listen(0, "127.0.0.1");
await once(reservation, "listening");
const address = reservation.address();
assert.ok(address && typeof address !== "string");
const port = address.port;
await new Promise((resolve, reject) =>
  reservation.close((error) => (error ? reject(error) : resolve())),
);
const server = spawn(
  process.execPath,
  [
    resolve(root, "node_modules/next/dist/bin/next"),
    "start",
    "-H",
    "127.0.0.1",
    "-p",
    String(port),
  ],
  { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] },
);
let serverLog = "";
server.stdout.on("data", (chunk) => {
  serverLog += chunk;
});
server.stderr.on("data", (chunk) => {
  serverLog += chunk;
});
let browser;
const results = [];
try {
  const url = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60_000;
  let ready = false;
  while (Date.now() < deadline) {
    assert.equal(server.exitCode, null, `Next 服务器提前退出：${serverLog}`);
    try {
      ready = (await fetch(url, { signal: AbortSignal.timeout(1000) })).ok;
    } catch {
      /* 等待本次生产服务器。 */
    }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "Next 生产服务器未就绪");
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of ["/", "/subpaths"]) {
    const html = await (await fetch(url + route)).text();
    assert.ok(
      html.includes("服务端导入按钮") && html.includes("2026-10-12"),
      "SSR 未输出实际组件与纯工具结果",
    );
    assert.ok(html.includes("--lk-"), "SSR 样式丢失");
    await page.goto(url + route);
    const button = page.getByRole("button", { name: "计数按钮", exact: true });
    await page.getByText("客户端集合", { exact: true }).waitFor();
    await button.click();
    await page
      .getByRole("status", { name: "点击次数" })
      .filter({ hasText: /^1$/ })
      .waitFor();
    await button.focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("status", { name: "点击次数" })
      .filter({ hasText: /^2$/ })
      .waitFor();
    assert.notEqual(
      await button.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
      "rgba(0, 0, 0, 0)",
    );
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    assert.deepEqual(violations, [], "RSC 深色页面必须保留可读表面和语义");
    await page.screenshot({
      path: resolve(artifacts, route === "/" ? "root.png" : "subpaths.png"),
    });
    results.push({
      route,
      serverComponents: true,
      serverDateParser: true,
      hydratedClicks: 2,
    });
  }
  assert.deepEqual(errors, [], "RSC 水合或客户端运行错误");
  await writeFile(
    resolve(artifacts, "report.json"),
    JSON.stringify({ next, react, installRetries, results }, null, 2),
  );
  console.log(
    `Next.js ${next} 实际 tarball：根入口/按需入口服务端导入、SSR 样式、纯工具与水合交互通过`,
  );
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    server.kill("SIGTERM");
    await once(server, "exit");
  }
  await writeFile(resolve(artifacts, "server.log"), serverLog);
}
