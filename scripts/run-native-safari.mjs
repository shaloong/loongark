import assert from "node:assert/strict";
import { runNativeGroupFocus } from "./native-safari-group-focus.mjs";
import { spawn, spawnSync } from "node:child_process";
import { runNativeAdvanced } from "./native-safari-advanced.mjs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// 使用 Apple 原生 WebDriver；不把 Playwright WebKit 标记为 Safari。
if (process.platform !== "darwin") {
  throw Error(
    "原生 Safari 验收需要 macOS 和 /usr/bin/safaridriver；Linux 不能替代。",
  );
}
const evidence = resolve(".artifacts/native-safari");
await mkdir(evidence, { recursive: true });
const server = spawn(
  process.execPath,
  ["scripts/serve-static.mjs", "tests/consumer-dist", "6007"],
  { stdio: "inherit" },
);
const driver = spawn("/usr/bin/safaridriver", ["--port", "4444"], {
  stdio: "inherit",
});
let startupError, sessionId;
const eventEvidence = [];
for (const child of [server, driver])
  child.on("error", (error) => (startupError = error));
const report = {
  commit: process.env.GITHUB_SHA,
  platform: process.platform,
  browser: null,
  defaultExamples: [],
  interactions: [],
  limitations: [
    "Desktop native Safari; not a real iOS device.",
    "Default example smoke is not exhaustive interaction coverage for every component.",
    "Advanced date, editors, table/clipboard, chart, questionnaire, virtual layouts, collection and Drawer flows run in both themes across all four frameworks.",
  ],
};
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitFor(check, label, timeout = 15000) {
  const until = Date.now() + timeout;
  let last;
  while (Date.now() < until) {
    if (startupError) throw startupError;
    try {
      if (await check()) return;
    } catch (error) {
      last = error;
    }
    await pause(100);
  }
  throw Error(`Safari 等待失败：${label}${last ? ` (${last.message})` : ""}`);
}
async function command(method, path, body) {
  const response = await fetch(`http://127.0.0.1:4444${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(60000),
  });
  const result = await response.json();
  if (!response.ok || result.value?.error)
    throw Error(
      `Safari WebDriver ${path}: ${result.value?.message ?? result.value?.error ?? response.status}`,
    );
  return result.value;
}
const session = (method, path, body) =>
  command(method, `/session/${sessionId}${path}`, body);
const execute = (script, args = []) =>
  session("POST", "/execute/sync", { script, args });
const elementKey = "element-6066-11e4-a52e-4f735466cecf";
async function find(selector) {
  const node = await session("POST", "/element", {
    using: "css selector",
    value: selector,
  });
  return node[elementKey];
}
async function click(selector) {
  if (!selector.includes("row-expand"))
    return session("POST", `/element/${await find(selector)}/click`, {});
  // Safari 的 element/click 在滚动布局更新后可能使用旧中心点；先完成真实滚动与绘制。
  await execute(
    "document.querySelector(arguments[0]).scrollIntoView({block:'nearest',inline:'nearest'})",
    [selector],
  );
  await session("POST", "/execute/async", {
    script:
      "const done=arguments[arguments.length-1];requestAnimationFrame(()=>requestAnimationFrame(()=>done()));",
    args: [],
  });
  const point = await execute(
    `
    const button = document.querySelector(arguments[0]), rect = button.getBoundingClientRect();
    const x=rect.x+rect.width/2, y=rect.y+rect.height/2;
    return {x:Math.round(x), y:Math.round(y), hit:button.contains(document.elementFromPoint(x,y))};
  `,
    [selector],
  );
  assert(point.hit, `Safari 原生按钮中心被遮挡：${selector}`);
  await session("POST", "/actions", {
    actions: [
      {
        type: "pointer",
        id: "table-click",
        parameters: { pointerType: "mouse" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            origin: "viewport",
            x: point.x,
            y: point.y,
          },
          { type: "pointerDown", button: 0 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ],
  });
}
async function clickText(text) {
  const node = await execute(
    "return [...document.querySelectorAll('button')].find(node => node.textContent.trim() === arguments[0])",
    [text],
  );
  assert(node?.[elementKey], `Safari 未找到按钮 ${text}`);
  await session("POST", `/element/${node[elementKey]}/click`, {});
}
async function type(selector, text) {
  // /clear 不保证发出输入事件；真实键盘清空后重新定位可能被框架重绘的输入。
  await click(selector);
  await session("POST", "/actions", {
    actions: [
      {
        type: "key",
        id: "text-input",
        actions: [
          { type: "keyDown", value: "\uE03D" },
          { type: "keyDown", value: "a" },
          { type: "keyUp", value: "a" },
          { type: "keyUp", value: "\uE03D" },
          { type: "keyDown", value: "\uE003" },
          { type: "keyUp", value: "\uE003" },
        ],
      },
    ],
  });
  if (text) {
    const id = await find(selector);
    await session("POST", `/element/${id}/value`, { text, value: [...text] });
  }
}
async function installTableProbe() {
  // 只记录原生可信事件，不伪造点击、输入或浏览器选择。
  await execute(`
    window.__safariTableEvents = [];
    for (const type of ["pointerdown", "mousedown", "mouseup", "click", "dblclick", "focusin", "input", "change"]) {
      document.addEventListener(type, event => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const button = target.closest("button"), row = target.closest("tr[data-row-id]");
        window.__safariTableEvents.push({type, trusted:event.isTrusted, time:event.timeStamp,
          tag:target.tagName, part:target.getAttribute("data-part"), label:target.getAttribute("aria-label"),
          button:button?.getAttribute("data-part"), buttonRow:button?.getAttribute("data-row-id"),
          row:row?.getAttribute("data-row-id"), x:event.clientX, y:event.clientY,
          value:target instanceof HTMLInputElement ? target.value : undefined });
        if (window.__safariTableEvents.length > 300) window.__safariTableEvents.shift();
      }, true);
    }
  `);
}
async function tableProbe(label) {
  const scene = await execute(`
    const button=document.querySelector('[data-part="row-expand"][data-row-id="atlas"]');
    const rect=button?.getBoundingClientRect();
    const hit=rect ? document.elementFromPoint(rect.x+rect.width/2, rect.y+rect.height/2) : null;
    return {rect:rect?.toJSON(), clientRects:button ? [...button.getClientRects()].map(r=>r.toJSON()) : [],
      hit:hit ? {tag:hit.tagName,part:hit.getAttribute("data-part"),button:hit.closest("button")?.getAttribute("data-part"),row:hit.closest("tr")?.getAttribute("data-row-id")} : null,
      expanded:button?.getAttribute("aria-expanded"), editor:!!document.querySelector('[data-part="cell-editor"]'),
      focus:{tag:document.activeElement?.tagName,part:document.activeElement?.getAttribute("data-part"),label:document.activeElement?.getAttribute("aria-label")},
      events:window.__safariTableEvents ?? []};
  `);
  eventEvidence.push({ label, ...scene });
}
const text = (selector) =>
  execute("return document.querySelector(arguments[0])?.textContent ?? null", [
    selector,
  ]);
async function navigate(framework, name, mode = "light") {
  await session("POST", "/url", {
    url: `http://127.0.0.1:6007/examples-${framework}/?example=${name}&mode=${mode}`,
  });
  await waitFor(
    () =>
      execute(
        "return !!document.querySelector('[data-example-content]')?.children.length",
      ),
    `${framework}/${name} 渲染`,
  );
  assert.equal(await text("[data-example-name]"), name);
  await execute(
    "window.__safariErrors=[];window.addEventListener('error',event=>window.__safariErrors.push(event.message));window.addEventListener('unhandledrejection',event=>window.__safariErrors.push(String(event.reason)));",
  );
}
async function screenshot(name) {
  // 状态断言在绘制前即可通过；截图等待绘制完成，避免保存上一帧。
  await pause(100);
  const content = await session("GET", "/screenshot");
  await writeFile(
    resolve(evidence, `${name}.png`),
    Buffer.from(content, "base64"),
  );
}
async function assertLayout() {
  const measurement = await execute(
    "return {width:innerWidth,scroll:document.documentElement.scrollWidth,focus:document.activeElement?.tagName,errors:window.__safariErrors}",
  );
  assert(
    measurement.scroll <= measurement.width + 1,
    `页面溢出 ${JSON.stringify(measurement)}`,
  );
  assert.deepEqual(measurement.errors, []);
  return measurement;
}
try {
  await waitFor(
    async () => (await fetch("http://127.0.0.1:6007/examples-index.json")).ok,
    "静态产物服务器",
  );
  await waitFor(
    async () => (await command("GET", "/status"))?.ready,
    "SafariDriver",
  );
  const created = await command("POST", "/session", {
    capabilities: { alwaysMatch: { browserName: "safari" } },
  });
  sessionId = created.sessionId;
  assert(sessionId, "Safari 会话必须真实创建");
  assert.match(created.capabilities.browserName, /safari/i);
  report.browser = created.capabilities;
  await session("POST", "/window/rect", { width: 1280, height: 1100 });
  const index = JSON.parse(
    await readFile("tests/consumer-dist/examples-index.json", "utf8"),
  );
  for (const [framework, names] of Object.entries(index)) {
    for (const name of names) {
      await navigate(framework, name);
      const layout = await assertLayout();
      report.defaultExamples.push({ framework, name, width: layout.width });
    }
  }
  for (const framework of Object.keys(index))
    for (const mode of ["light", "dark"]) {
      await navigate(framework, "DataTableBatchExample", mode);
      for (const name of ["Safari first batch", "Safari second batch"]) {
        await click('[data-part="batch-trigger"]');
        await click('[data-part="batch-enable"][data-column-key="name"]');
        await type('[data-part="batch-input"][data-column-key="name"]', name);
        await click('[data-part="batch-form"] button[type="submit"]');
        await waitFor(
          async () => (await text("output")) === "Applied batch: 2 cells",
          "批量提交",
        );
        await waitFor(
          () =>
            execute(
              "return !document.querySelector('[data-part=\"batch-form\"]')",
            ),
          "提交面板关闭",
        );
        // 提交面板先关闭，框架提交后的RAF再恢复焦点；实际Safari已证明即时读取会提前。
        await waitFor(
          () =>
            execute(
              "const trigger=document.querySelector('[data-part=\"batch-trigger\"]');return !!trigger && document.activeElement===trigger",
            ),
          "批量提交后的入口焦点恢复",
        );
      }
      await click('[data-part="batch-undo"]');
      await waitFor(
        () =>
          execute(
            "return [...document.querySelectorAll('tbody td')].filter(node=>node.textContent.trim()==='Safari first batch').length===2",
          ),
        "第一步撤销",
      );
      await click('[data-part="batch-undo"]');
      await waitFor(
        () =>
          execute(
            "return [...document.querySelectorAll('tbody td')].some(node=>node.textContent.trim()==='Alpha release')",
          ),
        "第二步撤销",
      );
      await execute(
        "document.querySelector('[data-part=\"batch-redo\"]').focus()",
      );
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "keyboard",
            actions: [
              { type: "keyDown", value: "\uE03D" },
              { type: "keyDown", value: "\uE008" },
              { type: "keyDown", value: "z" },
              { type: "keyUp", value: "z" },
              { type: "keyUp", value: "\uE008" },
              { type: "keyUp", value: "\uE03D" },
            ],
          },
        ],
      });
      await waitFor(
        async () => (await text("output")) === "Redid batch: 2 cells",
        "Command+Shift+Z 重做",
      );
      await click('[data-part="batch-redo"]');
      await waitFor(
        () =>
          execute(
            "return [...document.querySelectorAll('tbody td')].filter(node=>node.textContent.trim()==='Safari second batch').length===2",
          ),
        "第二步重做",
      );
      const layout = await assertLayout();
      await screenshot(`history-${framework}-${mode}`);
      report.interactions.push({
        framework,
        mode,
        case: "batch-history-keyboard-focus",
        width: layout.width,
      });
      await navigate(framework, "ChartInteractionExample", mode);
      assert.equal(
        await text('[data-part="range-status"]'),
        "Categories 1–12 of 12",
      );
      await click('[data-scope="chart"] button[data-part="zoom-in"]');
      await waitFor(
        async () =>
          (await text('[data-part="range-status"]')) !==
          "Categories 1–12 of 12",
        "图表缩放",
      );
      await click('[data-scope="chart"] button[data-part="zoom-reset"]');
      await waitFor(
        async () =>
          (await text('[data-part="range-status"]')) ===
          "Categories 1–12 of 12",
        "图表恢复",
      );
      await assertLayout();
      await screenshot(`chart-${framework}-${mode}`);
      report.interactions.push({ framework, mode, case: "chart-window" });
      await navigate(framework, "DataTableColumnsExample", mode);
      const move = '[data-part="column-move"][data-column-key="name"]';
      const resize = '[data-part="column-resize"][data-column-key="name"]';
      await execute("document.querySelector(arguments[0]).focus()", [move]);
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "keyboard",
            actions: [
              { type: "keyDown", value: "\uE014" },
              { type: "keyUp", value: "\uE014" },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            "return [...document.querySelectorAll('thead th[data-column-key]')].map(n=>n.dataset.columnKey).join(',')==='owner,name,status,revenue'",
          ),
        "列键盘排序",
      );
      assert.equal(
        await execute("return document.activeElement?.dataset.columnKey"),
        "name",
      );
      const rectangle = await execute(
        "const n=document.querySelector(arguments[0]);n.scrollIntoView({block:'nearest',inline:'nearest'});const r=n.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)}",
        [resize],
      );
      await session("POST", "/actions", {
        actions: [
          {
            type: "pointer",
            id: "mouse",
            parameters: { pointerType: "mouse" },
            actions: [
              {
                type: "pointerMove",
                duration: 0,
                origin: "viewport",
                ...rectangle,
              },
              { type: "pointerDown", button: 0 },
              {
                type: "pointerMove",
                duration: 200,
                origin: "viewport",
                x: rectangle.x + 40,
                y: rectangle.y,
              },
              { type: "pointerUp", button: 0 },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            "return document.querySelector(arguments[0]).getAttribute('aria-valuenow')==='280'",
            [resize],
          ),
        "原生列宽拖动",
      );
      await assertLayout();
      await screenshot(`columns-${framework}-${mode}`);
      report.interactions.push({
        framework,
        mode,
        case: "column-keyboard-and-native-pointer-resize",
      });
    }
  for (const framework of Object.keys(index))
    for (const mode of ["light", "dark"]) {
      await navigate(framework, "DataTableStructureExample", mode);
      await installTableProbe();
      assert((await text('tr[data-row-kind="group"]')).includes("3000"));
      assert.equal(
        await execute(
          "return document.querySelector('tr[data-row-kind=group] input') === null",
        ),
        true,
      );
      await execute("document.querySelector('[data-part=row-expand]').focus()");
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "structure-keyboard",
            actions: [
              { type: "keyDown", value: " " },
              { type: "keyUp", value: " " },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            "return document.activeElement?.getAttribute('aria-label') === 'Expand Team: Design · 3 rows'",
          ),
        "分组折叠焦点恢复",
      );
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "structure-keyboard",
            actions: [
              { type: "keyDown", value: " " },
              { type: "keyUp", value: " " },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            "return document.activeElement?.getAttribute('aria-label') === 'Collapse Team: Design · 3 rows'",
          ),
        "分组空格展开焦点恢复",
      );
      await clickText("Reject expansion");
      await click(
        '[data-part="row-expand"][aria-label="Collapse Team: Design · 3 rows"]',
      );
      assert.equal(
        await execute(
          "return document.querySelector('[data-part=row-expand]').getAttribute('aria-expanded')",
        ),
        "true",
      );
      await clickText("Allow expansion");
      await clickText("Show tree rows");
      await waitFor(
        () =>
          execute(
            "return !document.querySelector('tr[data-row-kind=group]') && document.querySelector('[data-part=row-expand][data-row-id=atlas]')?.getAttribute('aria-expanded') === 'true'",
          ),
        "树模式渲染完成",
      );
      await tableProbe(`${framework}/${mode}/before-collapse`);
      await click('[data-part="row-expand"][data-row-id="atlas"]');
      await tableProbe(`${framework}/${mode}/after-collapse-click`);
      await waitFor(
        () =>
          execute(
            "return document.querySelector('[data-part=row-expand][data-row-id=atlas]').getAttribute('aria-expanded') === 'false'",
          ),
        "树折叠",
      );
      assert.equal(
        await execute(
          "return document.querySelector('tr[data-row-id=tokens]') === null",
        ),
        true,
      );
      await clickText("Collapse all");
      await type('input[aria-label="Filter Project"]', "keyboard");
      await waitFor(
        () =>
          execute(
            "return document.querySelector('[data-part=row-expand][data-row-id=mobile]')?.disabled === true && !!document.querySelector('tr[data-row-id=mobile-check]')",
          ),
        "筛选强制展开祖先上下文",
      );
      await type('input[aria-label="Filter Project"]', "");
      await tableProbe(`${framework}/${mode}/after-clear-input`);
      await waitFor(
        () =>
          execute(
            "return document.querySelector('[data-part=row-expand][data-row-id=mobile]')?.getAttribute('aria-expanded') === 'false'",
          ),
        "筛选清除恢复原展开状态",
      );
      await clickText("Expand all");
      await assertLayout();
      await screenshot(`structure-${framework}-${mode}`);
      report.interactions.push({
        framework,
        mode,
        case: "grouping-tree-expansion-filter-context",
      });
    }
  for (const framework of Object.keys(index))
    for (const mode of ["light", "dark"]) {
      await navigate(framework, "QuestionnaireGroupsExample", mode);
      await click("summary");
      const alpha = '[data-group-instance="alpha"]';
      await type(
        alpha + ' textarea[aria-label="Contact name"]',
        "Safari contact",
      );
      assert.equal(
        await execute(
          'return document.querySelector(\'[data-group-instance="beta"] textarea[aria-label="Contact name"]\').value',
        ),
        "Morgan Lee",
      );
      await click('[data-question-group="add"]');
      await waitFor(
        () =>
          execute(
            'return document.querySelectorAll(\'[data-part="group-instance"]\').length === 3 && document.activeElement?.getAttribute("aria-label") === "Contact name"',
          ),
        "新增实例焦点",
      );
      await clickText("Remove contact 3");
      await waitFor(
        () =>
          execute(
            'return document.querySelectorAll("[data-part=group-instance]").length===2',
          ),
        "删除新实例",
      );
      // 重新导航排除位置选择：通过稳定实例 id 检查受控拒绝，不依赖数组索引。
      await navigate(framework, "QuestionnaireGroupsExample", mode);
      await click("summary");
      await clickText("Show advanced questions");
      await clickText("Reject updates");
      const mail =
        alpha + ' input[data-question-control="choice"][value="email"]';
      await click(mail);
      await waitFor(
        () =>
          execute(
            'const input=document.querySelector(arguments[0]);return input.checked && input.closest("label").getAttribute("data-selected")==="true"',
            [mail],
          ),
        "受控拒绝恢复复选框",
      );
      await clickText("Accept updates");
      const handle = alpha + ' button[aria-label="Reorder: Clarity"]';
      await execute("document.querySelector(arguments[0]).focus()", [handle]);
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "group-ranking",
            actions: [
              { type: "keyDown", value: " " },
              { type: "keyUp", value: " " },
              { type: "keyDown", value: "\uE015" },
              { type: "keyUp", value: "\uE015" },
              { type: "keyDown", value: "\uE007" },
              { type: "keyUp", value: "\uE007" },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            'return new FormData(document.querySelector("form")).getAll("contacts[alpha][priorities]").join(",") === "speed,clarity,quality" && document.activeElement===document.querySelector(arguments[0])',
            [handle],
          ),
        "嵌套排序键盘及稳定焦点",
      );
      await clickText("Require clarity first");
      await click('form button[type="submit"]');
      await waitFor(
        () =>
          execute(
            'return document.activeElement?.getAttribute("aria-label")==="Reorder: Speed"',
          ),
        "排序子题错误焦点",
      );
      await assertLayout();
      await screenshot(`questionnaire-groups-${framework}-${mode}`);
      report.interactions.push({
        framework,
        mode,
        case: "questionnaire-groups-native-keyboard-controlled-focus-form",
      });
    }
  for (const framework of Object.keys(index))
    for (const mode of ["light", "dark"]) {
      await navigate(framework, "QuestionnaireCustomExample", mode);
      await click("summary");
      await clickText("Reject updates");
      await click('[role="radiogroup"] [role="radio"]:nth-child(2)');
      await waitFor(
        () =>
          execute(
            'return document.querySelector(\'[role="radiogroup"] [role="radio"]:nth-child(3)\').getAttribute("aria-checked")==="true" && new FormData(document.querySelector("form")).getAll("rating").join(",")==="3"',
          ),
        "原生自定义受控拒绝",
      );
      await clickText("Accept updates");
      await clickText("Use nested questions");
      const rating =
        '[data-group-instance="alpha"] [role="radio"][tabindex="0"]';
      await execute("document.querySelector(arguments[0]).focus()", [rating]);
      await session("POST", "/actions", {
        actions: [
          {
            type: "key",
            id: "custom-rating",
            actions: [
              { type: "keyDown", value: "\uE014" },
              { type: "keyUp", value: "\uE014" },
            ],
          },
        ],
      });
      await waitFor(
        () =>
          execute(
            'const f=new FormData(document.querySelector("form"));return f.getAll("people[alpha][rating]").join(",")==="3" && f.getAll("people[beta][rating]").join(",")==="4" && document.activeElement?.getAttribute("aria-checked")==="true"',
          ),
        "嵌套自定义键盘、表单及独立状态",
      );
      await click(
        '[data-group-instance="alpha"] [data-part="custom-answer"] button',
      );
      await clickText("Remove person 1");
      await pause(600);
      assert.equal(
        await execute(
          'return new FormData(document.querySelector("form")).getAll("people[beta][rating]").join(",")',
        ),
        "4",
      );
      assert.equal(
        await execute(
          "return document.querySelector('output[aria-label=\"Rating updates\"]').textContent.trim()",
        ),
        "2 callbacks",
      );
      await assertLayout();
      await screenshot(`questionnaire-custom-${framework}-${mode}`);
      report.interactions.push({
        framework,
        mode,
        case: "questionnaire-custom-native-keyboard-controlled-stale-form",
      });
    }
  await runNativeGroupFocus({
    session,
    execute,
    click,
    type,
    waitFor,
    screenshot,
    assertLayout,
    report,
  });
  for (const framework of Object.keys(index))
    for (const mode of ["light", "dark"])
      await runNativeAdvanced(
        {
          execute,
          session,
          click,
          clickText,
          type,
          navigate,
          waitFor,
          screenshot,
          assertLayout,
          report,
          writeClipboard(text) {
            const copied = spawnSync("/usr/bin/pbcopy", [], {
              input: text,
              encoding: "utf8",
            });
            assert.equal(copied.status, 0, "原生剪贴板写入必须成功");
          },
        },
        framework,
        mode,
      );
  report.result = "passed";
  console.log(
    `Native Safari ${report.browser.browserVersion}: ${report.defaultExamples.length} default examples and ${report.interactions.length} interaction cases passed.`,
  );
} catch (error) {
  report.result = "failed";
  report.error = error.stack ?? String(error);
  if (sessionId)
    try {
      report.failureDOM = await execute(
        'return {url:location.href,active:document.activeElement?.outerHTML,scroll:document.documentElement.scrollWidth,width:innerWidth,invalid:[...document.querySelectorAll("[aria-invalid=true]")].map(node=>({tag:node.tagName,part:node.dataset.part,path:node.getAttribute("data-question-path"),text:node.textContent?.slice(0,240)}))}',
      );
      await screenshot("failure");
    } catch {}
  throw error;
} finally {
  await writeFile(
    resolve(evidence, "native-events.json"),
    JSON.stringify(eventEvidence, null, 2),
  );
  await writeFile(
    resolve(evidence, "results.json"),
    JSON.stringify(report, null, 2),
  );
  if (sessionId)
    try {
      await session("DELETE", "");
    } catch {}
  driver.kill("SIGTERM");
  server.kill("SIGTERM");
}
