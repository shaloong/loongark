import assert from "node:assert/strict";
import { createLoongArkTheme } from "../packages/theme/dist/index.js";
import { registry } from "../packages/primitives/dist/index.js";
import { buttonPrimitive } from "../packages/primitives/dist/button.js";
import { inputPrimitive } from "../packages/primitives/dist/input.js";
import { createPrimitiveStyleBootstrap } from "../packages/primitives/dist/styles.js";
import { primitiveStyleOrder } from "../packages/primitives/dist/style-order.js";

assert.deepEqual(
  registry.map((style) => style.contract.name),
  [...primitiveStyleOrder],
  "按需样式顺序必须随默认注册顺序同步",
);
for (const mode of ["light", "dark", "high-contrast"]) {
  const options = {
    mode,
    targetId: "style-contract",
    overrides: { zIndex: { dialog: 5500 } },
  };
  const full = createLoongArkTheme(options);
  registry.forEach((style) => style.apply(full));
  const selected = createLoongArkTheme(options);
  createPrimitiveStyleBootstrap([...registry].reverse())(selected);
  assert.equal(
    selected.toStyleSheet(),
    full.toStyleSheet(),
    `${mode}：完整选择应保持规则及级联顺序`,
  );
  const minimal = createLoongArkTheme(options);
  createPrimitiveStyleBootstrap([
    inputPrimitive,
    buttonPrimitive,
    inputPrimitive,
  ])(minimal);
  const css = minimal.toStyleSheet();
  assert.ok(css.includes("--lk-button-height"));
  assert.ok(css.includes("focus-visible"));
  assert.ok(css.includes("lk-surface-in"));
  assert.ok(!css.includes("[data-scope=editor]"));
  assert.ok(!css.includes("[data-scope=data-table]"));
  const unique = createLoongArkTheme(options);
  createPrimitiveStyleBootstrap([buttonPrimitive, inputPrimitive])(unique);
  assert.equal(css, unique.toStyleSheet(), "重复选择不改变规则或顺序");
  assert.ok(
    Buffer.byteLength(css) < Buffer.byteLength(full.toStyleSheet()) / 4,
    "基础页面不应保留完整组件 CSS",
  );
}
const custom = createLoongArkTheme({ targetId: "custom-style" });
createPrimitiveStyleBootstrap([
  {
    contract: { name: "app-custom", tokens: [], defaults: {} },
    apply: (theme) =>
      theme.mountStyles(
        "app-custom",
        ".app { color:var(--lk-color-semantic-foreground); }",
      ),
  },
])(custom);
assert.ok(
  custom
    .toStyleSheet()
    .endsWith(".app { color:var(--lk-color-semantic-foreground); }"),
  "自定义样式在通用规则之后应用",
);
console.log(
  "按需 Primitives 样式：三主题、完整级联、去重、基础成本和自定义样式通过。",
);
