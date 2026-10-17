import { DataTableExample } from "../examples/react/DataTableExample";
export default { title: "Compositions/Project Tables" };
export const Basic = {
  render: () => (
    <main style={{ maxWidth: 800, marginInline: "auto" }}>
      <DataTableExample />
    </main>
  ),
};

import { DataTableSearchExample } from "../examples/react/DataTableSearchExample";
export const CustomSearch = {
  render: () => (
    <main>
      <h1>自定义搜索工具栏</h1>
      <DataTableSearchExample />
    </main>
  ),
};
