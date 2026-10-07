import assert from "node:assert/strict";
import { verifyNativeCodeHistory } from "../tests/nativeCodeHistoryChecks.ts";
// 使用实际 Safari 的 W3C 输入、指针和系统剪贴板；验收记录以 macOS 任务为准。
export async function runNativeAdvanced(h, framework, mode) {
  const {
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
  } = h;
  const key = async (selector, value, modifiers = []) => {
    await execute("document.querySelector(arguments[0]).focus()", [selector]);
    await session("POST", "/actions", {
      actions: [
        {
          type: "key",
          id: "advanced-keyboard",
          actions: [
            ...modifiers.map((value) => ({ type: "keyDown", value })),
            { type: "keyDown", value },
            { type: "keyUp", value },
            ...modifiers
              .toReversed()
              .map((value) => ({ type: "keyUp", value })),
          ],
        },
      ],
    });
  };
  const text = (selector) =>
    execute("return document.querySelector(arguments[0])?.textContent.trim()", [
      selector,
    ]);
  const matches = async (
    selector,
    expected,
    label = selector + " expected " + expected,
  ) => waitFor(async () => (await text(selector)) === expected, label);
  const finish = async (name) => {
    const layout = await assertLayout();
    await screenshot(`${name}-${framework}-${mode}`);
    report.interactions.push({
      framework,
      mode,
      case: name,
      width: layout.width,
    });
  };
  await navigate(framework, "DateTimeExample", mode);
  const localized = '[data-scope="input"][data-part="control"]',
    current = 'output[aria-label="Current appointment"]';
  await matches(current, "2026-10-06T14:35:20");
  await type(localized, "February 29, 2026");
  await key(localized, "\uE007");
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0]).getAttribute("aria-invalid")==="true"',
        [localized],
      ),
    "拒绝非法闰日",
  );
  await matches(current, "2026-10-06T14:35:20");
  await type(localized, "February 29, 2028");
  await key(localized, "\uE007");
  await matches(current, "2028-02-29T14:35:20");
  await clickText("en-GB");
  await type(localized, "6/10/2026");
  await key(localized, "\uE007");
  await matches(current, "2026-10-06T14:35:20");
  const segment = (type) =>
    '[data-scope="date-input"][data-part="segment"][data-type="' + type + '"]';
  await key(segment("hour"), "\uE013");
  await key(segment("minute"), "\uE015");
  await key(segment("second"), "\uE013");
  await matches(current, "2026-10-06T15:34:21");
  await clickText("Use Shanghai time");
  await clickText("Submit appointment");
  await matches(
    'output[aria-label="Submitted appointment"]',
    "2026-10-06T15:34:21+08:00[Asia/Shanghai]",
  );
  await clickText("ar-EG");
  await type(localized, "٧/١٠/٢٠٢٦");
  await key(localized, "\uE007");
  await matches(current, "2026-10-07T15:34:21+08:00[Asia/Shanghai]");
  await key(segment("day"), "\uE012");
  await waitFor(
    () => execute('return document.activeElement?.dataset.type==="month"'),
    "RTL日期左键焦点",
  );
  await key(segment("month"), "\uE014");
  await waitFor(
    () => execute('return document.activeElement?.dataset.type==="day"'),
    "RTL日期右键焦点",
  );
  await clickText("Make read only");
  assert.equal(
    await execute("return document.querySelector(arguments[0]).readOnly", [
      localized,
    ]),
    true,
  );
  await finish("date-time-localized-rtl-native-form");

  await navigate(framework, "VirtualGridExample", mode);
  const grid = '[role="grid"][aria-label="Windowed cells"]';
  await waitFor(
    () => execute("return !!document.querySelector(arguments[0])", [grid]),
    "二维窗口",
  );
  assert.equal(
    await execute(
      'return document.querySelector(arguments[0]).getAttribute("aria-rowcount")',
      [grid],
    ),
    "10000",
  );
  assert(
    await execute(
      'return document.querySelectorAll(arguments[0]+" [role=gridcell]").length<180',
      [grid],
    ),
  );
  await click("summary");
  await clickText("Go to item 5001");
  const remote =
    grid + ' [data-row-key="row-5000"][data-column-key="column-0"]';
  await waitFor(
    () => execute("return !!document.querySelector(arguments[0])", [remote]),
    "二维跳转",
  );
  await key(remote, "\uE010", ["\uE009"]);
  await waitFor(
    () =>
      execute(
        'return document.activeElement?.dataset.rowKey==="row-9999" && document.activeElement?.dataset.columnKey==="column-79"',
      ),
    "二维跨轴键盘导航",
  );
  await clickText("Use RTL");
  await waitFor(
    () =>
      execute(
        "return document.querySelector(arguments[0]).scrollLeft < -1000",
        [grid],
      ),
    "二维RTL横向窗口",
  );
  await finish("virtual-grid-bounded-native-jump");

  await navigate(framework, "VirtualMasonryExample", mode);
  const masonry = '[role="list"][aria-label="Windowed collection"]';
  await waitFor(
    () => execute("return !!document.querySelector(arguments[0])", [masonry]),
    "瀑布流窗口",
  );
  assert(
    await execute(
      'return document.querySelectorAll(arguments[0]+" [role=listitem]").length<40',
      [masonry],
    ),
  );
  await clickText("Go to item 5001");
  await waitFor(
    () =>
      execute(
        "const node=document.querySelector(arguments[0]+' [data-virtual-key=\"item-5000\"]'), root=document.querySelector(arguments[0]);if(!node)return false;const a=node.getBoundingClientRect(),b=root.getBoundingClientRect();return a.bottom>b.top && a.top<b.bottom",
        [masonry],
      ),
    "瀑布流跳转可见",
  );
  await click("summary");
  await clickText("Use narrow width");
  await waitFor(
    () =>
      execute("return document.querySelector(arguments[0]).clientWidth<=320", [
        masonry,
      ]),
    "瀑布流重排",
  );
  await waitFor(
    () =>
      execute(
        'const root=document.querySelector(arguments[0]);const snapshot=()=>JSON.stringify([root.clientWidth,root.scrollTop,[...root.querySelectorAll("[role=listitem]")].map(node=>[node.getAttribute("data-virtual-key"),node.getBoundingClientRect().toJSON()])]);const previous=snapshot();return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>{const b=root.getBoundingClientRect();resolve(previous===snapshot() && [...root.querySelectorAll("[role=listitem]")].some(node=>{const a=node.getBoundingClientRect();return a.bottom>b.top && a.top<b.bottom && a.right>b.left && a.left<b.right && a.width>0;}));})));',
        [masonry],
      ),
    "瀑布流重排与测量完成后窗口内有稳定可见内容",
  );
  await finish("virtual-masonry-bounded-native-jump");
  await navigate(framework, "ChartTypesExample", mode);
  const chart = '[data-scope="chart"]';
  const count = (part, expected) =>
    waitFor(
      () =>
        execute(
          'return document.querySelectorAll(arguments[0]+" [data-part="+arguments[1]+"]").length===arguments[2]',
          [chart, part, expected],
        ),
      "图表 " + part,
    );
  await count("area", 3);
  for (const [value, part, amount] of [
    ["stacked-area", "area", 3],
    ["area", "area", 3],
    ["stacked-bars", "bar", 11],
    ["pie", "slice", 4],
    ["donut", "slice", 4],
    ["scatter", "point", 11],
    ["time", "point", 11],
    ["log", "point", 10],
  ]) {
    await click('select option[value="' + value + '"]');
    await count(part, amount);
    assert.equal(
      await execute(
        "return /NaN|Infinity/.test(document.querySelector(arguments[0]).innerHTML)",
        [chart],
      ),
      false,
    );
    await finish("chart-" + value + "-native");
  }

  await navigate(framework, "QuestionnaireMatrixExample", mode);
  const matrix = '[data-part="matrix-row"]',
    option = (row, value) =>
      matrix +
      '[data-row="' +
      row +
      '"] input[type="checkbox"][value="' +
      value +
      '"]';
  await clickText("Next");
  await waitFor(
    () =>
      execute(
        "return document.activeElement===document.querySelector(arguments[0])",
        [option("navigation", "keyboard")],
      ),
    "矩阵必填焦点",
  );
  await click(option("navigation", "keyboard"));
  await click(option("navigation", "layout"));
  await clickText("Next");
  await waitFor(
    () =>
      execute(
        "return document.activeElement===document.querySelector(arguments[0])",
        [option("content", "keyboard")],
      ),
    "第二矩阵行必填焦点",
  );
  await click(option("content", "contrast"));
  await clickText("Reject updates");
  await click(option("content", "contrast"));
  assert.equal(
    await execute("return document.querySelector(arguments[0]).checked", [
      option("content", "contrast"),
    ]),
    true,
  );
  await clickText("Accept updates");
  assert.deepEqual(
    await execute(
      'const form=document.querySelector("form");return [new FormData(form).getAll("review[navigation]"),new FormData(form).getAll("review[content]")]',
    ),
    [["keyboard", "layout"], ["contrast"]],
  );
  await finish("questionnaire-matrix-multi-native-controlled-form");

  await navigate(framework, "AsyncCollectionExample", mode);
  const items = '[aria-label="Collection items"] [data-item-id]';
  const itemCount = (n) =>
    waitFor(
      () =>
        execute(
          "return document.querySelectorAll(arguments[0]).length===arguments[1]",
          [items, n],
        ),
      "Collection 项数 " + n,
    );
  await clickText("Load collection");
  await itemCount(3);
  assert.deepEqual(
    await execute(
      "return [...document.querySelectorAll(arguments[0])].map(node=>node.dataset.itemId)",
      [items],
    ),
    ["item-1", "item-2", "item-3"],
  );
  await clickText("Fail next request");
  await clickText("Load more");
  await waitFor(
    () =>
      execute(
        'return document.querySelector("[role=alert]")?.textContent.includes("Demo service unavailable")',
      ),
    "异步分页失败保留旧页",
  );
  await itemCount(3);
  await clickText("Retry request");
  await itemCount(5);
  await clickText("Load more");
  await itemCount(6);
  await clickText("Hide collection");
  assert.equal(
    await execute("return !!document.querySelector(arguments[0])", [
      '[aria-label="Collection items"]',
    ]),
    false,
  );
  await clickText("Show collection");
  await itemCount(0);
  await clickText("Load collection");
  await itemCount(3);
  await finish("async-collection-native-retry-remount");
  await navigate(framework, "CodeEditorExample", mode);
  const code = '[data-scope="editor"][data-kind="code"]',
    codeInput = code + " .cm-content",
    codeField = code + ' textarea[data-part="form-value"]';
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0])?.dataset.mounted==="true"',
        [code],
      ),
    "代码编辑器装载",
  );
  const initialCode = await execute(
    "return document.querySelector(arguments[0]).value",
    [codeField],
  );
  const source = 'const message = "native Safari";\nconsole.log(message);';
  await type(codeInput, source);
  await waitFor(
    () =>
      execute(
        "return document.querySelector(arguments[0]).value===arguments[1]",
        [codeField, source],
      ),
    "代码表单值同步",
  );
  const codeHistory = await verifyNativeCodeHistory({
    initial: initialCode,
    source,
    read: () =>
      execute("return document.querySelector(arguments[0]).value", [codeField]),
    canUndo: () =>
      execute("return !document.querySelector(arguments[0]).disabled", [
        code + ' button[data-action="undo"]',
      ]),
    undo: () => click(code + ' button[data-action="undo"]'),
    redo: () => click(code + ' button[data-action="redo"]'),
    waitFor,
  });
  await clickText("Submit document");
  await finish("code-editor-native-history-form");
  report.interactions.at(-1).history = codeHistory;

  await navigate(framework, "RichTextEditorExample", mode);
  const rich = '[data-scope="editor"][data-kind="rich"]',
    documentInput = rich + " .ProseMirror";
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0])?.dataset.mounted==="true"',
        [rich],
      ),
    "富文本编辑器装载",
  );
  await type(documentInput, "A native structured document");
  await key(documentInput, "a", ["\uE03D"]);
  await click(rich + ' button[data-action="bold"]');
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0]+" strong")?.textContent==="A native structured document"',
        [documentInput],
      ),
    "结构化加粗",
  );
  await click(rich + ' button[data-action="undo"]');
  await waitFor(
    () =>
      execute('return !document.querySelector(arguments[0]+" strong")', [
        documentInput,
      ]),
    "富文本撤销",
  );
  await click(rich + ' button[data-action="redo"]');
  await waitFor(
    () =>
      execute('return !!document.querySelector(arguments[0]+" strong")', [
        documentInput,
      ]),
    "富文本重做",
  );
  await key(documentInput, "\uE010");
  await key(documentInput, "\uE007");
  await click(rich + ' button[data-action="table"]');
  await waitFor(
    () =>
      execute(
        'return document.querySelectorAll(arguments[0]+" table tr").length===3',
        [documentInput],
      ),
    "富文本表格",
  );
  await click(rich + ' [data-part="table-tools"] summary');
  await click(rich + ' button[data-action="rowAfter"]');
  await waitFor(
    () =>
      execute(
        'return document.querySelectorAll(arguments[0]+" table tr").length===4',
        [documentInput],
      ),
    "富文本插入行",
  );
  await click(rich + ' button[data-action="deleteTable"]');
  await waitFor(
    () =>
      execute('return !document.querySelector(arguments[0]+" table")', [
        documentInput,
      ]),
    "富文本删除表格",
  );
  await finish("rich-editor-native-format-history-table");
  await navigate(framework, "DrawerDirectionsExample", mode);
  const dialog =
    '[data-scope="drawer"][data-part="content"][data-state="open"]';
  const snap = dialog + ' output[aria-label="Drawer snap point"]';
  const drag = async (physical, distance) => {
    const selectionBeforeDrag = await execute(
      "return window.getSelection()?.toString() ?? ''",
    );
    const point = await execute(
      "const box=document.querySelector(arguments[0]).getBoundingClientRect();return {x:Math.round(box.x+box.width/2),y:Math.round(box.y+box.height/2),width:innerWidth,height:innerHeight}",
      [dialog + ' [data-part="grabber"]'],
    );
    const dx =
        physical === "left" ? -distance : physical === "right" ? distance : 0,
      dy = physical === "up" ? -distance : physical === "down" ? distance : 0;
    const end = {
      x: Math.max(1, Math.min(point.width - 1, point.x + dx)),
      y: Math.max(1, Math.min(point.height - 1, point.y + dy)),
    };
    const actions = [
      {
        type: "pointerMove",
        duration: 0,
        origin: "viewport",
        x: point.x,
        y: point.y,
      },
      { type: "pointerDown", button: 0 },
    ];
    for (let step = 1; step <= 12; step++)
      actions.push({
        type: "pointerMove",
        duration: 80,
        origin: "viewport",
        x: Math.round(point.x + ((end.x - point.x) * step) / 12),
        y: Math.round(point.y + ((end.y - point.y) * step) / 12),
      });
    actions.push(
      { type: "pause", duration: 200 },
      { type: "pointerUp", button: 0 },
    );
    await session("POST", "/actions", {
      actions: [
        {
          type: "pointer",
          id: "drawer-native-mouse",
          parameters: { pointerType: "mouse" },
          actions,
        },
      ],
    });
    assert.equal(
      await execute("return window.getSelection()?.toString() ?? ''"),
      selectionBeforeDrag,
      "Drawer手柄拖动不得改变页面文字选区",
    );
  };
  const extent = async (vertical, pixels) =>
    waitFor(
      () =>
        execute(
          "const node=document.querySelector(arguments[0]);if(!node)return false;const b=node.getBoundingClientRect(), actual=arguments[1]?Math.min(b.bottom,innerHeight)-Math.max(b.top,0):Math.min(b.right,innerWidth)-Math.max(b.left,0);return Math.abs(actual-arguments[2])<=1",
          [dialog, vertical, pixels],
        ),
      "原生Drawer可见吸附尺寸",
    );
  for (const dir of ["ltr", "rtl"])
    for (const direction of ["down", "up", "start", "end"]) {
      const vertical = direction === "down" || direction === "up",
        large = vertical ? 480 : 320,
        small = vertical ? 240 : 256;
      const physical =
        direction === "start"
          ? dir === "rtl"
            ? "right"
            : "left"
          : direction === "end"
            ? dir === "rtl"
              ? "left"
              : "right"
            : direction;
      const title = "Open " + direction + " " + dir;
      await clickText(title);
      await matches(snap, large + "px");
      await extent(vertical, large);
      assert.equal(
        await execute(
          'return document.querySelector(arguments[0]).getAttribute("dir")',
          [dialog],
        ),
        dir,
      );
      assert.equal(
        await execute(
          'return document.querySelector(arguments[0]).getAttribute("data-swipe-direction")',
          [dialog],
        ),
        physical,
      );
      await waitFor(
        () =>
          execute(
            "return document.activeElement===document.querySelector(arguments[0])",
            [dialog + " input:not([type=hidden])"],
          ),
        "原生Drawer打开后初始焦点",
      );
      // W3C WebDriver 的 Tab 为 E004；E00F 是 PageDown。
      await execute(
        "window.__safariDrawerKeys=[];document.querySelector(arguments[0]).addEventListener('keydown',event=>window.__safariDrawerKeys.push({key:event.key,code:event.code,trusted:event.isTrusted}),{once:true})",
        [dialog + " input:not([type=hidden])"],
      );
      await key(dialog + " input:not([type=hidden])", "\uE004");
      const navigation = await execute(
        "return {events:window.__safariDrawerKeys,focused:document.activeElement?.outerHTML}",
      );
      (report.drawerKeyboardNavigation ??= []).push({
        framework,
        mode,
        direction,
        dir,
        ...navigation,
      });
      assert.equal(navigation.events[0]?.key, "Tab", "Safari实际收到Tab按键");
      assert.equal(navigation.events[0]?.trusted, true, "Tab由原生输入产生");
      await waitFor(
        () =>
          execute(
            "return document.activeElement.textContent.trim()==='Toggle snap point'",
          ),
        "原生Drawer Tab定位吸附按钮",
      );
      await key(dialog + " button", "\uE007");
      await matches(snap, small + "px");
      await extent(vertical, small);
      // Safari 鼠标点击按钮不必获得焦点；连续使用原生 Enter 保留
      // 已经由可信 Tab 定位的控件，随后检查拖动是否保持其可见。
      await key(dialog + " button", "\uE007");
      await matches(snap, large + "px");
      await extent(vertical, large);
      await waitFor(
        () =>
          execute(
            "return document.activeElement?.textContent.trim()==='Toggle snap point'",
          ),
        "原生Drawer拖动前保留键盘焦点",
      );
      await drag(physical, vertical ? 240 : 64);
      await matches(snap, small + "px");
      await extent(vertical, small);
      await waitFor(
        () =>
          execute(
            "const v=document.querySelector(arguments[0]+' [data-drawer-viewport]'),f=document.activeElement;if(!v?.contains(f))return false;const b=v.getBoundingClientRect(),t=f.getBoundingClientRect();return t.top>=Math.max(b.top,0)-1&&t.bottom<=Math.min(b.bottom,innerHeight)+1&&t.left>=Math.max(b.left,0)-1&&t.right<=Math.min(b.right,innerWidth)+1",
            [dialog],
          ),
        "原生Drawer收起后焦点控件完整可见",
      );
      await screenshot(`drawer-${direction}-${dir}-${framework}-${mode}`);
      await drag(physical, vertical ? 210 : 230);
      await waitFor(
        () =>
          execute("return !document.querySelector(arguments[0])", [
            dialog.replace('[data-state="open"]', ""),
          ]),
        "原生Drawer拖动关闭",
      );
      await waitFor(
        () =>
          execute(
            "return document.activeElement?.textContent.trim()===arguments[0]",
            [title],
          ),
        "Drawer拖动后焦点恢复",
      );
      await clickText(title);
      await matches(snap, large + "px");
      await waitFor(
        () =>
          execute(
            "return document.activeElement===document.querySelector(arguments[0])",
            [dialog + " input:not([type=hidden])"],
          ),
        "原生Drawer重开后初始焦点",
      );
      await key(dialog + " input:not([type=hidden])", "\uE00C");
      await waitFor(
        () =>
          execute("return !document.querySelector(arguments[0])", [
            dialog.replace('[data-state="open"]', ""),
          ]),
        "原生Drawer Escape",
      );
      await waitFor(
        () =>
          execute(
            "return document.activeElement?.textContent.trim()===arguments[0]",
            [title],
          ),
        "Drawer Escape后焦点恢复",
      );
    }
  await assertLayout();
  report.interactions.push({
    framework,
    mode,
    case: "drawer-eight-directions-native-mouse-keyboard-focus",
  });
  await navigate(framework, "TableColumnWindowExample", mode);
  const tableGrid = '[role="grid"][aria-label="Windowed projects"]';
  await waitFor(
    () => execute("return !!document.querySelector(arguments[0])", [tableGrid]),
    "横向表格窗口",
  );
  assert.equal(
    await execute(
      'return document.querySelector(arguments[0]).getAttribute("aria-colcount")',
      [tableGrid],
    ),
    "81",
  );
  assert(
    await execute(
      'return document.querySelectorAll(arguments[0]+" thead th[data-column-key]").length<=16',
      [tableGrid],
    ),
  );
  await clickText("Go to column 41");
  const columnCell = (column) =>
    tableGrid +
    ' td[data-cell-row="row-0"][data-cell-column="c' +
    column +
    '"]';
  await waitFor(
    () =>
      execute("return !!document.querySelector(arguments[0])", [
        columnCell(40),
      ]),
    "横向跳转",
  );
  for (let column = 40; column < 55; column++)
    await key(columnCell(column), "\uE014");
  await waitFor(
    () =>
      execute(
        "return document.activeElement===document.querySelector(arguments[0])",
        [columnCell(55)],
      ),
    "跨窗口键盘导航",
  );
  if (h.writeClipboard) {
    await h.writeClipboard("A\tB\tC\nD\tE\tF");
    await key(columnCell(55), "v", ["\uE03D"]);
    await waitFor(
      () =>
        execute(
          'return document.querySelector(arguments[0]+\' td[data-cell-row="row-1"][data-cell-column="c57"]\')?.textContent.includes("F")',
          [tableGrid],
        ),
      "系统剪贴板二维批量粘贴",
    );
    await key(columnCell(55), "z", ["\uE03D"]);
    await waitFor(
      () =>
        execute(
          'return document.querySelector(arguments[0]+\' td[data-cell-row="row-1"][data-cell-column="c57"]\')?.textContent.includes("R2 · C58")',
          [tableGrid],
        ),
      "跨窗口批量撤销",
    );
    await key(columnCell(55), "z", ["\uE03D", "\uE008"]);
    await waitFor(
      () =>
        execute(
          'return document.querySelector(arguments[0]+\' td[data-cell-row="row-1"][data-cell-column="c57"]\')?.textContent.includes("F")',
          [tableGrid],
        ),
      "跨窗口批量重做",
    );
  }
  await finish("table-column-window-native-navigation-history");
  await navigate(framework, "DataTableQueryExample", mode);
  const query = '[data-scope="data-table"][data-part="root"]';
  await key(query + ' thead th[data-column-key="team"] button', "\uE007");
  await key(query + ' thead th[data-column-key="amount"] button', "\uE007", [
    "\uE008",
  ]);
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0]+\' th[data-column-key="amount"] [data-part="sort-priority"]\')?.textContent.trim()==="2"',
        [query],
      ),
    "原生多列排序优先级",
  );
  await click('select[aria-label="Filter Team"] option[value="0"]');
  await click('select[aria-label="Condition for Revenue"] option[value="gte"]');
  await type('input[aria-label="Filter Revenue"]', "21");
  await waitFor(
    () =>
      execute(
        'return [...document.querySelectorAll(arguments[0]+" tbody tr td:nth-child(2)")].map(node=>node.textContent.trim()).join(",")==="Gamma"',
        [query],
      ),
    "原生列级组合筛选",
  );
  await type('input[aria-label="Filter Revenue"]', "-");
  await waitFor(
    () =>
      execute(
        'return document.querySelector(arguments[0]).getAttribute("aria-invalid")==="true"',
        ['input[aria-label="Filter Revenue"]'],
      ),
    "数值列筛选非法草稿",
  );
  await finish("table-query-native-multi-sort-filters");

  await navigate(framework, "QuestionnaireRankingExample", mode);
  const rank = '[data-question-control="rank-drag"][data-key="access"]';
  const rankOrder = () =>
    execute(
      'return [...document.querySelectorAll("[data-part=rank-row]")].map(node=>node.dataset.key).join(",")',
    );
  await key(rank, " ");
  await key(rank, "\uE010");
  await waitFor(
    async () => (await rankOrder()) === "layout,speed,access",
    "排序预览",
  );
  await key(rank, "\uE00C");
  await waitFor(
    async () => (await rankOrder()) === "access,layout,speed",
    "排序取消",
  );
  await key(rank, "\uE007");
  await key(rank, "\uE015");
  await key(rank, "\uE007");
  await waitFor(
    async () => (await rankOrder()) === "layout,access,speed",
    "排序提交",
  );
  assert.deepEqual(
    await execute(
      'return new FormData(document.querySelector("form")).getAll("priority")',
    ),
    ["layout", "access", "speed"],
  );
  await clickText("Reject updates");
  await key(rank, " ");
  await key(rank, "\uE010");
  await key(rank, "\uE007");
  await waitFor(
    async () => (await rankOrder()) === "layout,access,speed",
    "受控排序拒绝",
  );
  await finish("questionnaire-ranking-native-keyboard-controlled-form");
}
