import { DataTableComplexEditorsExample } from "../examples/react/DataTableComplexEditorsExample";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Revenue" },
];
const meta = {
  title: "Components/DataTable",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkDataTable data={rows} columns={columns} pageSize={2} />
    </div>
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <L.LoongArkDataTable
      data={[]}
      columns={columns}
      label="Empty project list"
    />
  ),
};
export const LongCells: StoryObj = {
  render: () => (
    <L.LoongArkDataTable
      data={[
        {
          id: "long",
          name: "International-accessibility-workspace-with-a-long-project-name-and-release-notes",
          amount: 2400,
        },
      ]}
      columns={columns}
      label="Long project names"
    />
  ),
};
export const Localized: StoryObj = {
  render: () => (
    <L.LoongArkDataTable
      data={rows}
      columns={[
        { key: "name", label: "项目" },
        { key: "amount", label: "收入" },
      ]}
      pageSize={2}
      label="项目列表"
      labels={{
        filter: "筛选项目",
        filterPlaceholder: "搜索项目…",
        selectPage: "选择当前页",
        selectRow: (id) => "选择项目 " + id,
        empty: "没有匹配的项目",
        previous: "上一页",
        next: "下一页",
        summary: ({ total, selected, page, pageCount }) =>
          `${total} 项 · 已选 ${selected} 项 · ${page} / ${pageCount}`,
      }}
    />
  ),
};

import { DataTableAdvancedExample } from "../examples/react/DataTableAdvancedExample";
import { withArkExamplePage } from "./arkStory";
export const Server = {
  decorators: [withArkExamplePage],
  render: () => <DataTableAdvancedExample />,
};
export const Loading = {
  render: () => (
    <L.LoongArkDataTable
      label="Loading projects"
      data={[]}
      columns={columns}
      loading
    />
  ),
};

import { DataTableFrozenExample } from "../examples/react/DataTableFrozenExample";
export const Frozen = {
  decorators: [withArkExamplePage],
  render: () => <DataTableFrozenExample />,
};

import { DataTableEditExample } from "../examples/react/DataTableEditExample";
export const Editing: StoryObj = { render: () => <DataTableEditExample /> };

export const ComplexEditors: StoryObj = {
  render: () => <DataTableComplexEditorsExample />,
};

import { DataTableBatchExample } from "../examples/react/DataTableBatchExample";
export const BatchEditing: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "Select rows and apply multiple batches. Undo and redo walk the accepted history; a new batch replaces the redo branch. Native text fields retain their own undo history.",
      },
    },
  },
  render: () => <DataTableBatchExample />,
};

import { VirtualizationExample } from "../examples/react/VirtualizationExample";
export const Virtualized: StoryObj = {
  render: () => <VirtualizationExample mode="table" />,
};

import { DataTableQueryExample } from "../examples/react/DataTableQueryExample";
export const ColumnQueries: StoryObj = {
  render: () => <DataTableQueryExample />,
};

import { DataTableColumnsExample } from "../examples/react/DataTableColumnsExample";
export const ColumnLayout: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: "列拖动与键盘排序、宽度调整、冻结区域、RTL、受控拒绝和动态列。",
      },
    },
  },
  render: () => <DataTableColumnsExample />,
};

import { DataTableStructureExample } from "../examples/react/DataTableStructureExample";
export const GroupingAndTree: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: {
    heading: "Structured table",
    pageWidth: 850,
    docs: {
      description: {
        story:
          "客户端多级分组与有限数值聚合、根节点分页、父ID树行、祖先上下文筛选、受控展开与虚拟化。",
      },
    },
  },
  render: () => <DataTableStructureExample />,
};

import { DataTableRangeExample } from "../examples/react/DataTableRangeExample";
export const CellRangeAndPaste: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: {
    heading: "Range editing",
    pageWidth: 850,
    docs: {
      description: {
        story:
          "指针与键盘范围选择、TSV 复制粘贴、原子校验、可取消事务、多级撤销重做及虚拟定位。",
      },
    },
  },
  render: () => <DataTableRangeExample />,
};
