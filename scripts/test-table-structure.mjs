import assert from "node:assert/strict";
import {
  createDataTableView as view,
  dataTableGroupId as groupId,
  aggregateDataRows,
  dataTableView,
  dataTableLabels,
  dataTableGroupText,
  renderDataTableRowPrefix,
  createDataTableEditor,
  dataTableVirtualStyle,
} from "../packages/kit/dist/index.js";
const columns = [
  { key: "name", label: "Project", filter: { type: "text" } },
  { key: "team", label: "Team" },
  { key: "value", label: "Value", filter: { type: "number" } },
];
const data = [
  { id: "a", name: "Parent", parent: null, team: "Design", value: 10 },
  { id: "b", name: "Child", parent: "a", team: "Design", value: 40 },
  { id: "c", name: "Orphan", parent: "missing", team: "Platform", value: 30 },
];
const design = groupId([["team", "Design"]]),
  platform = groupId([["team", "Platform"]]);
let result = view(data, columns, {
  groupBy: ["team"],
  aggregations: { value: "sum" },
  pageSize: 1,
});
assert.equal(result.rows[0].id, design);
assert.equal(result.rows[0].row.value, 50);
assert.equal(result.rows[0].structure.count, 2);
assert.deepEqual(
  result.rows.slice(1).map((row) => row.id),
  ["a", "b"],
);
assert.equal(result.pageCount, 2);
assert.equal(result.total, 3);
result = view(data, columns, {
  groupBy: ["team"],
  aggregations: { value: "sum" },
  expandedRowIds: [],
  sorts: [{ key: "value", direction: "asc" }],
});
assert.deepEqual(
  result.rows.map((row) => row.id),
  [platform, design],
);
result = view(data, columns, {
  groupBy: ["team"],
  expandedRowIds: [design, platform],
  query: "Orphan",
});
assert.deepEqual(result.expandedRowIds, [design, platform]);
assert.equal(result.rows[0].row.value, undefined);
result = view(data, columns, {
  groupBy: ["team"],
  aggregations: { value: "sum" },
  filters: [{ key: "value", operator: "gte", value: "20" }],
});
assert.equal(result.rows[0].row.value, 40);
assert.equal(result.rows[0].structure.count, 1);
result = view(data, columns, {
  tree: { parentKey: "parent" },
  expandedRowIds: [],
  query: "Child",
});
assert.deepEqual(
  result.rows.map((row) => row.id),
  ["a", "b"],
);
assert.deepEqual(result.expandedRowIds, []);
assert.deepEqual(result.forcedExpandedRowIds, ["a"]);
assert.equal(result.total, 1);
assert.equal(result.rows[1].structure.depth, 1);
result = view(data, columns, {
  tree: { parentKey: "parent" },
  expandedRowIds: ["a"],
  pageSize: 1,
  page: 2,
});
assert.deepEqual(
  result.rows.map((row) => row.id),
  ["c"],
);
assert.equal(result.pageCount, 2);
result = view(data, columns, {
  tree: { parentKey: "parent" },
  mode: "server",
  totalRows: 100,
  page: 7,
  pageSize: 10,
  expandedRowIds: ["a", "unloaded"],
  sorts: [{ key: "value", direction: "desc" }],
  query: "No local filtering",
});
assert.equal(result.page, 7);
assert.equal(result.pageCount, 10);
assert.deepEqual(
  result.rows.map((row) => row.id),
  ["a", "b", "c"],
);
assert.deepEqual(result.expandedRowIds, ["a", "unloaded"]);
assert.throws(
  () =>
    view([{ ...data[0], parent: "b" }, data[1]], columns, {
      tree: { parentKey: "parent" },
    }),
  /cycle/,
);
assert.throws(
  () => view([{ name: "No id" }], columns, { tree: { parentKey: "parent" } }),
  /stable row ids/,
);
assert.throws(() => view(data, columns, { groupBy: ["gone"] }), /existing/);
assert.throws(
  () =>
    view(data, columns, { groupBy: ["team"], tree: { parentKey: "parent" } }),
  /mutually/,
);
assert.throws(
  () => view(data, columns, { groupBy: ["team"], mode: "server" }),
  /full-dataset/,
);
assert.throws(
  () => view(data, columns, { aggregations: { value: "sum" } }),
  /require grouping/,
);
assert.throws(
  () =>
    view(data, columns, {
      groupBy: ["team"],
      aggregations: { value: "median" },
    }),
  /supported/,
);
assert.throws(
  () =>
    view([...data, { id: design, name: "Conflict" }], columns, {
      groupBy: ["team"],
    }),
  /conflicts/,
);
assert.notEqual(groupId([["team", 1]]), groupId([["team", "1"]]));
assert.equal(groupId([["team", null]]), groupId([["team", undefined]]));
const entries = (values) =>
  values.map((value, index) => ({ id: String(index), index, row: { value } }));
for (const [operation, expected] of [
  ["count", 5],
  ["sum", 8],
  ["average", 4],
  ["min", 2],
  ["max", 6],
])
  assert.equal(
    aggregateDataRows(
      entries([2, 6, null, "10", Infinity]),
      "value",
      operation,
    ),
    expected,
  );
assert.equal(
  aggregateDataRows(entries([1e308, -1e308]), "value", "average"),
  0,
);
assert.equal(aggregateDataRows(entries([1e308, 1e308]), "value", "sum"), null);
assert.equal(aggregateDataRows(entries([null]), "value", "average"), null);
const deep = Array.from({ length: 10000 }, (_, index) => ({
  id: String(index),
  name: String(index),
  parent: index ? String(index - 1) : null,
}));
result = view(deep, columns, {
  tree: { parentKey: "parent" },
  query: "9999",
  expandedRowIds: [],
});
assert.equal(result.rows.length, 10000);
assert.equal(result.rows.at(-1).structure.depth, 9999);
const inherited = Object.assign(
  Object.create({ team: "Inherited", parent: "a", value: 100 }),
  { id: "inherited" },
);
result = view([inherited], columns, {
  groupBy: ["team"],
  aggregations: { value: "sum" },
});
assert.equal(result.rows[0].structure.value, null);
assert.equal(result.rows[0].row.value, null);
result = dataTableView(
  {
    data,
    columns,
    columnKeys: ["name", "value"],
    groupBy: ["team"],
    aggregations: { value: "sum" },
  },
  { query: "", page: 1 },
);
assert.equal(result.rows[0].id, design);
console.log("分组聚合、根分页、祖先筛选、服务端树契约、深树和无效结构回归通过");

const props = {
  data,
  columns,
  groupBy: ["team"],
  aggregations: { value: "sum" },
};
result = dataTableView({ ...props, columnKeys: [] }, { query: "", page: 1 });
assert.equal(result.columns.length, 0);
assert.equal(result.rows[0].id, design);
assert.match(
  renderDataTableRowPrefix(result.rows[0], props, result, dataTableLabels()),
  /aria-expanded="true"/,
);
assert.equal(
  dataTableGroupText(
    result.rows[0],
    columns[2],
    true,
    dataTableLabels(),
    props,
  ),
  "Team: Design · 2 rows · Value: 50",
);
console.log("隐藏全部列仍保留结构控制，首列聚合不丢失回归通过");

result = view(data.slice(0, 2), columns, {
  tree: { parentKey: "parent" },
  query: "Design",
  expandedRowIds: [],
});
assert.deepEqual(
  result.rows.map((row) => row.id),
  ["a", "b"],
);
assert.deepEqual(result.forcedExpandedRowIds, ["a"]);
assert.deepEqual(result.expandedRowIds, []);
result = view(data, columns, {
  tree: { parentKey: "parent" },
  filters: [{ key: "value", operator: "gte", value: "0" }],
  expandedRowIds: [],
});
assert.deepEqual(
  result.rows.map((row) => row.id),
  ["a", "b", "c"],
);
console.log("匹配全部数据的有效筛选仍展开祖先，而不覆盖原展开状态回归通过");

const editable = {
  data,
  columns: columns.map((column) => ({ ...column, editor: { type: "text" } })),
  groupBy: ["team"],
  onCellCommit() {
    throw Error("Group rows must not commit");
  },
};
const groupedEditView = dataTableView(editable, { query: "", page: 1 });
const editor = createDataTableEditor(() => {});
editor.begin(editable, groupedEditView, design, "name");
assert.equal(editor.state, undefined);
editor.dispose();
const deepView = dataTableView(
  {
    data: deep,
    columns,
    tree: { parentKey: "parent" },
    expandedRowIds: deep.map((row) => row.id),
  },
  { query: "", page: 1 },
);
assert.equal(
  dataTableVirtualStyle(
    { data: deep, columns, virtualization: { height: 280 } },
    deepView,
  )["--lk-data-table-structure-depth"],
  8,
);
console.log("分组行模型不可编辑，深层虚拟树布局使用有界缩进回归通过");
