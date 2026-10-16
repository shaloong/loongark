import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const source = await readFile("examples/shared/ticketWorkflow.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;
const { createTicketWorkflow } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const open = (demo) => {
  demo.select(["T-101"]);
  demo.setOpen(true);
};

test("筛选清理旧选择，取消和重置不提交草稿", async () => {
  const demo = createTicketWorkflow(
    () => {},
    async () => {},
  );
  open(demo);
  demo.setDraft("title", "尚未保存");
  demo.reset();
  assert.equal(demo.state.draft.title, "更新项目文档");
  demo.setDraft("title", "放弃修改");
  demo.setOpen(false);
  open(demo);
  assert.equal(demo.state.draft.title, "更新项目文档");
  demo.setOpen(false);
  demo.setStatus("已解决");
  assert.deepEqual(demo.state.selectedIds, []);
  assert.deepEqual(
    demo.visibleRows.map((row) => row.id),
    ["T-103"],
  );
  demo.setQuery("不存在");
  assert.equal(demo.visibleRows.length, 0);
  demo.dispose();
});

test("无效输入不发送；失败保留草稿，重试成功只更新目标行", async () => {
  let saves = 0;
  const demo = createTicketWorkflow(
    () => {},
    async () => {
      saves++;
    },
  );
  open(demo);
  demo.setDraft("title", " ");
  demo.setDraft("email", "bad");
  assert.equal(await demo.submit(), "invalid");
  assert.equal(saves, 0);
  assert.deepEqual(Object.keys(demo.state.errors), ["title", "email"]);
  demo.setDraft("title", " 新标题 ");
  demo.setDraft("email", "new@example.com");
  demo.failNext();
  assert.equal(await demo.submit(), "failed");
  assert.equal(demo.state.open, true);
  assert.equal(demo.state.draft.title, " 新标题 ");
  assert.equal(demo.state.rows[0].title, "更新项目文档");
  assert.equal(await demo.submit(), "saved");
  assert.equal(saves, 1);
  assert.equal(demo.state.open, false);
  assert.equal(demo.state.rows[0].title, "新标题");
  assert.equal(demo.state.rows[1].title, "完善移动端导航");
  assert.equal(demo.state.notification, "已保存工单 T-101");
  demo.dispose();
});

test("重复提交被阻止，取消后的旧请求不能覆盖新一轮编辑", async () => {
  const pending = [];
  const demo = createTicketWorkflow(
    () => {},
    (_ticket, signal) =>
      new Promise((resolve) => {
        pending.push({ resolve, signal });
      }),
  );
  open(demo);
  demo.setDraft("title", "旧请求");
  const first = demo.submit();
  await demo.submit();
  assert.equal(pending.length, 1);
  demo.setOpen(false);
  assert.equal(pending[0].signal.aborted, true);
  open(demo);
  demo.setDraft("title", "新请求");
  const second = demo.submit();
  pending[0].resolve();
  assert.equal(await first, "aborted");
  assert.equal(demo.state.pending, true);
  assert.equal(demo.state.rows[0].title, "更新项目文档");
  pending[1].resolve();
  assert.equal(await second, "saved");
  assert.equal(demo.state.rows[0].title, "新请求");
  demo.dispose();
});

test("卸载会取消请求且不再通知；React effect 重新激活后仍可编辑", async () => {
  let complete;
  let changes = 0;
  const demo = createTicketWorkflow(
    () => {
      changes++;
    },
    () =>
      new Promise((resolve) => {
        complete = resolve;
      }),
  );
  open(demo);
  const saved = demo.submit();
  demo.dispose();
  const count = changes;
  complete();
  assert.equal(await saved, "aborted");
  assert.equal(changes, count);
  demo.activate();
  demo.setOpen(false);
  open(demo);
  assert.equal(demo.state.open, true);
  demo.setDraft("title", "严格模式后的编辑");
  assert.equal(demo.state.draft.title, "严格模式后的编辑");
  demo.dispose();
});
