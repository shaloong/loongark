import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const coverage = await read("docs/component-coverage.json");
const index = await read("storybook-static/index.json");
const references = await read("storybook-static/reference/index.json");
const mappings = await read("examples/reference-examples.json");
assert.deepEqual(Object.keys(mappings).sort(), [...coverage.families].sort());
assert.deepEqual(
  references.map((entry) => entry.family).sort(),
  [...coverage.families].sort(),
);
let variants = 0;
for (const entry of references) {
  const reference = await read(`storybook-static/reference/${entry.key}.json`);
  assert.ok(reference.apis.length > 0, `${entry.family} 缺少真实 API 签名`);
  assert.ok(reference.variants.length > 0);
  assert.equal(reference.variants[0].name, "基础用法");
  assert.equal(reference.variants[0].id, mappings[entry.family].basic.toLowerCase());
  variants += reference.variants.length;
  for (const variant of reference.variants) {
    const keys = [];
    for (const framework of ["react", "vue", "solid", "svelte"]) {
      const files = variant.examples[framework];
      assert.ok(files?.length > 0, `${entry.family}/${framework} 缺少代码`);
      keys.push(
        files[0].path
          .split("/")
          .at(-1)
          .replace(/\.(tsx?|svelte|vue)$/, "")
          .toLowerCase(),
      );
      for (const file of files)
        assert.equal(
          file.code,
          await readFile(file.path, "utf8"),
          `${file.path} 展示代码已过期`,
        );
    }
    assert.equal(
      new Set(keys).size,
      1,
      "四端必须是同一个场景，不能把不同组合当作对应实现",
    );
  }
  assert.ok(
    Object.values(index.entries).some(
      (value) =>
        value.type === "docs" && value.title === `Components/${entry.family}`,
    ),
    `${entry.family} 缺少可访问 Docs 页`,
  );
}
const button = await read("storybook-static/reference/button.json");
assert.equal(button.variants.length, 1, "Button 基础文档不应混入组合场景");
const api = button.apis.find((entry) => entry.name === "LoongArkButton");
for (const [name, value] of Object.entries({
  size: '"md"',
  variant: '"solid"',
  disabled: "false",
  loading: "false",
  type: '"button"',
}))
  assert.equal(
    api.properties.find((entry) => entry.name === name)?.default,
    value,
    `Button ${name} 缺省说明错误`,
  );
assert.ok(
  !button.apis.some((entry) => entry.name === "LoongArkButtonGroup"),
  "不同组件族不能混入 API 表",
);
console.log(
  `Docs 完整性通过：${references.length}族，${variants}组同场景四端代码，源码/默认值/可访问索引一致。`,
);
