import assert from "node:assert/strict";
import {
  createDataTableView,
  nextDataTableSort,
  dataFilterSelectValue,
  changeDataFilter,
  dataTableLabels,
} from "../packages/kit/dist/index.js";
const columns = [
  {
    key: "team",
    label: "Team",
    filter: {
      type: "select",
      options: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "", label: "Unassigned" },
        { value: "X", label: "Archived", disabled: true },
      ],
    },
  },
  { key: "amount", label: "Revenue", filter: { type: "number" } },
  { key: "name", label: "Name", filter: { type: "text" } },
  { key: "locked", label: "Locked", sortable: false },
];
const rows = [
  { id: "a", team: "B", amount: 10, name: "Alpha" },
  { id: "b", team: "A", amount: 20, name: "Beta" },
  { id: "c", team: "A", amount: 10, name: "Gamma" },
  { id: "d", team: "A", amount: 10, name: "Delta" },
  { id: "e", team: "", amount: 0, name: "Epsilon" },
  { id: "f", team: null, amount: null, name: "Zeta" },
];
const ids = (options) =>
  createDataTableView(rows, columns, options).rows.map((row) => row.id);
const sorts = [
  { key: "team", direction: "asc" },
  { key: "amount", direction: "desc" },
];
assert.deepEqual(ids({ sorts }), ["e", "f", "b", "c", "d", "a"]); // 相等键保留原始顺序，沿用旧空值比较契约。
assert.deepEqual(
  ids({ sort: { key: "name", direction: "desc" }, sorts: [] }),
  rows.map((r) => r.id),
);
assert.deepEqual(
  createDataTableView(rows, columns, {
    sorts: [
      ...sorts,
      sorts[0],
      { key: "gone", direction: "asc" },
      { key: "locked", direction: "asc" },
    ],
  }).sorts,
  sorts,
);
let state = nextDataTableSort([], "team", false);
state = { ...state, ...nextDataTableSort(state.sorts, "amount", true) };
assert.deepEqual(state.sorts, [
  { key: "team", direction: "asc" },
  { key: "amount", direction: "asc" },
]);
state = { ...state, ...nextDataTableSort(state.sorts, "team", true) };
assert.equal(state.sorts[0].direction, "desc");
state = { ...state, ...nextDataTableSort(state.sorts, "team", true) };
assert.deepEqual(state.sorts, [{ key: "amount", direction: "asc" }]);
assert.deepEqual(nextDataTableSort(state.sorts, "name", false).sorts, [
  { key: "name", direction: "asc" },
]);
assert.deepEqual(
  ids({
    filters: [
      { key: "team", operator: "equals", value: "A" },
      { key: "amount", operator: "gte", value: "10" },
      { key: "name", operator: "contains", value: "MM" },
    ],
  }),
  ["c"],
);
assert.deepEqual(
  ids({
    filters: [
      { key: "amount", operator: "gt", value: 10 },
      { key: "amount", operator: "lt", value: 21 },
    ],
  }),
  ["b"],
);
assert.deepEqual(
  ids({ filters: [{ key: "team", operator: "equals", value: "" }] }),
  ["e"],
);
assert.deepEqual(ids({ filters: [{ key: "team", operator: "empty" }] }), [
  "e",
  "f",
]);
assert.deepEqual(
  ids({ filters: [{ key: "name", operator: "startsWith", value: "dE" }] }),
  ["d"],
);
for (const invalid of ["-", "NaN", "Infinity"]) {
  const view = createDataTableView(rows, columns, {
    filters: [{ key: "amount", operator: "gte", value: invalid }],
  });
  assert.equal(view.filterErrors.get("amount"), "number");
  assert.equal(view.total, 6);
}
assert.equal(
  createDataTableView(rows, columns, {
    filters: [{ key: "team", operator: "equals", value: "X" }],
  }).filterErrors.get("team"),
  "option",
);
assert.equal(
  createDataTableView(rows, columns, {
    filters: [{ key: "team", operator: "gte", value: 1 }],
  }).filterErrors.get("team"),
  "operator",
);
assert.deepEqual(
  createDataTableView(rows, columns, {
    filters: [{ key: "gone", operator: "equals", value: "a" }],
  }).filters,
  [],
);
assert.deepEqual(
  ids({
    mode: "server",
    totalRows: 100,
    sorts,
    query: "absent",
    filters: [{ key: "team", operator: "equals", value: "A" }],
  }),
  rows.map((r) => r.id),
);
assert.equal(dataFilterSelectValue(columns[0], undefined), "-1");
assert.equal(
  dataFilterSelectValue(columns[0], [
    { key: "team", operator: "equals", value: "" },
  ]),
  "2",
);
const next = changeDataFilter(
  { page: 4, filters: [{ key: "team", operator: "equals", value: "A" }] },
  columns[1],
  { operator: "gte", value: "-" },
);
assert.equal(next.page, 4);
assert.equal(
  changeDataFilter({ ...next, query: "" }, columns[1], { value: "10" }).page,
  1,
);
assert.equal(next.filters[1].value, "-");
assert.equal(next.filters[0].key, "team");
assert.throws(
  () =>
    createDataTableView(rows, [
      {
        ...columns[0],
        filter: {
          type: "select",
          options: [
            { value: "A", label: "1" },
            { value: "A", label: "2" },
          ],
        },
      },
    ]),
  /unique values/,
);
const own = createDataTableView(
  [{ id: "p", name: "Own" }],
  [{ key: "__proto__", label: "Prototype" }],
  { filters: [{ key: "__proto__", operator: "not-empty" }] },
);
assert.equal(own.total, 0);
console.log(
  "多列稳定排序、组合筛选、非法草稿、空选项、服务端契约与原型键回归通过",
);

assert.equal(
  dataTableLabels({ filterOperators: { gte: "至少" } }).filterOperators.gte,
  "至少",
);
assert.equal(
  dataTableLabels({ filterOperators: { gte: "至少" } }).filterOperators.lt,
  "Less than",
);

const { dataTableView, dataTableVirtualOptions, createVirtualWindow } =
  await import("../packages/kit/dist/index.js");
const virtualProps = {
  data: rows,
  columns,
  pageSize: 6,
  virtualization: { height: 60, estimateSize: 40 },
};
const initialQuery = { query: "", page: 1 };
const initialView = dataTableView(virtualProps, initialQuery);
const window = createVirtualWindow(
  dataTableVirtualOptions(virtualProps, initialView),
  () => {},
);
window.setViewport(80);
window.setOptions(
  dataTableVirtualOptions(
    virtualProps,
    dataTableView(virtualProps, {
      ...initialQuery,
      filters: [{ key: "amount", operator: "gte", value: "-" }],
    }),
  ),
);
assert.equal(window.state.offset, 80); // 错误草稿尚未改变有效查询，阅读位置不跳动。
window.setOptions(
  dataTableVirtualOptions(
    virtualProps,
    dataTableView(virtualProps, {
      ...initialQuery,
      filters: [{ key: "amount", operator: "gte", value: 10 }],
    }),
  ),
);
assert.equal(window.state.offset, 0);
window.setViewport(80);
window.setOptions(
  dataTableVirtualOptions(
    virtualProps,
    dataTableView(virtualProps, {
      ...initialQuery,
      sorts: [
        { key: "team", direction: "asc" },
        { key: "name", direction: "desc" },
      ],
    }),
  ),
);
assert.equal(window.state.offset, 0);
window.dispose();
console.log("表格有效列筛选/多列排序重置窗口，非法草稿保留阅读位置回归通过");

assert.equal(
  dataTableLabels({ filterOperators: { equals: undefined } }).filterOperators
    .equals,
  "Equals",
);
assert.equal(
  createDataTableView(
    [{ id: "n", name: 45 }],
    [{ key: "name", label: "Name", filter: { type: "text" } }],
    { filters: [{ key: "name", operator: "contains", value: 4 }] },
  ).total,
  1,
);

const { reconcileDataTableQuery } =
  await import("../packages/kit/dist/index.js");
const beforeHidden = {
  query: "",
  page: 1,
  sort: { key: "team", direction: "asc" },
  sorts: [
    { key: "team", direction: "asc" },
    { key: "amount", direction: "desc" },
  ],
  filters: [
    { key: "team", operator: "equals", value: "A" },
    { key: "amount", operator: "gte", value: "-" },
  ],
};
const visibleColumns = columns.filter((column) => column.key !== "team");
const hiddenView = {
  ...createDataTableView(rows, visibleColumns, beforeHidden),
  columns: visibleColumns,
};
const afterHidden = reconcileDataTableQuery(beforeHidden, hiddenView);
assert.deepEqual(afterHidden.sorts, [{ key: "amount", direction: "desc" }]);
assert.deepEqual(afterHidden.filters, [
  { key: "amount", operator: "gte", value: "-" },
]);
assert.equal(beforeHidden.sorts.length, 2);
assert.deepEqual(createDataTableView(rows, columns, afterHidden).sorts, [
  { key: "amount", direction: "desc" },
]);
assert.equal(
  reconcileDataTableQuery(afterHidden, {
    ...createDataTableView(rows, columns, afterHidden),
    columns,
  }),
  afterHidden,
);
console.log("隐藏/恢复列不复活旧排序和筛选，仍存在字段保留非法草稿回归通过");
