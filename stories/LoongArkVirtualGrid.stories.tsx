import { VirtualGridExample } from "../examples/react/VirtualGridExample";
export default { title: "Components/VirtualGrid" };
export const Basic = {
  parameters: {
    docs: {
      description: {
        story:
          "快速连续方向键累计到目标单元格；只保留一个 Tab 入口。Enter/F2 进入输入、Escape 返回导航，嵌入输入保留自己的编辑键，数据删除和 RTL 可在 More controls 验证。行高由 rowSize 决定，大字体或多行内容应提供足够的行高。",
      },
    },
  },
  render: () => <VirtualGridExample />,
};
