import assert from "node:assert/strict";

/** 原生逐键输入可能形成多组历史；逐步验证变化及每一组的准确重做。 */
export async function verifyNativeCodeHistory(h: {
  initial: string;
  source: string;
  read(): Promise<string>;
  canUndo(): Promise<boolean>;
  undo(): Promise<void>;
  redo(): Promise<void>;
  waitFor(check: () => Promise<boolean>, label: string): Promise<void>;
}) {
  assert.notEqual(h.source, h.initial, "输入必须实际改变代码文档");
  assert.equal(await h.read(), h.source, "原生输入与表单文档一致");
  const states = [h.source];
  while (states.at(-1) !== h.initial) {
    assert(
      states.length <= h.source.length + 1,
      "原生编辑历史必须有界恢复初始文档",
    );
    assert(await h.canUndo(), "恢复初始文档前不能耗尽撤销历史");
    const previous = states.at(-1)!;
    await h.undo();
    await h.waitFor(
      async () => (await h.read()) !== previous,
      "代码撤销确实改变文档",
    );
    states.push(await h.read());
  }
  for (let index = states.length - 2; index >= 0; index--) {
    await h.redo();
    await h.waitFor(
      async () => (await h.read()) === states[index],
      "代码重做准确恢复对应的历史文档",
    );
  }
  assert.equal(await h.read(), h.source, "全部重做后恢复完整原生输入");
  return {
    undoSteps: states.length - 1,
    documentLengths: states.map((s) => s.length),
  };
}
