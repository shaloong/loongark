# LoongArk Storybook Stories

## 目录结构

Storybook stories 按照以下层级组织：

### Components（组件库）

独立的、可复用的 UI 组件，按字母顺序排列：

- **Button** (`LoongArkButton.stories.tsx`)

  - 基础按钮组件
  - 变体：solid、outline、ghost
  - 尺寸：sm、md、lg
  - 状态：默认、loading、disabled

- **Avatar** (`LoongArkAvatar.stories.tsx`)

  - 头像组件
  - 类型：图片 / fallback
  - 尺寸：sm、md、lg

- **Checkbox** (`LoongArkCheckbox.stories.tsx`)

  - 复选框组件
  - 状态：checked、indeterminate、disabled

- **Dialog** (`LoongArkDialog.stories.tsx`)

  - 对话框/模态框组件
  - 尺寸：sm、md、lg
  - 位置：center、top
  - 动效：scale、slide

- **Filter Bar** (`LoongArkFilterBar.stories.tsx`)

  - Filter bar layout with search, chips, and action slots
  - Options: dense layout and center alignment

- **File Upload** (`LoongArkFileUpload.stories.tsx`)

  - File upload dropzone with item previews
  - Supports clear/remove actions and disabled state

- **Input** (`LoongArkInput.stories.tsx`)

  - 基础输入框组件
  - 变体：基础、带 Prefix、带 Suffix、Floating Label
  - 状态：默认、invalid、success、disabled、readOnly
  - 尺寸：sm、md、lg

- **Password Input** (`LoongArkPasswordInput.stories.tsx`)

  - Password input with visibility trigger
  - States: default / invalid / success

- **Menu** (`LoongArkMenu.stories.tsx`)

  - 菜单组件
  - 类型：普通项、checkbox、radio group
  - 尺寸：sm、md、lg

- **PinInput** (`LoongArkPinInput.stories.tsx`)

  - PIN 码 / 验证码输入组件
  - 类型：alphanumeric、numeric、alphabetic
  - 功能：遮罩、自动大写、顺序输入
  - 尺寸：sm、md、lg

- **Popover** (`LoongArkPopover.stories.tsx`)

  - 弹出层组件
  - 支持标题、描述、关闭按钮
  - 支持箭头展示

- **Progress** (`LoongArkProgress.stories.tsx`)

  - Linear and circular progress variants
  - Sizes: sm / md / lg

- **RadioGroup** (`LoongArkRadioGroup.stories.tsx`)

  - 单选框组组件
  - 方向：horizontal / vertical
  - 状态：默认、disabled

- **Select** (`LoongArkSelect.stories.tsx`)

  - 下拉选择器组件
  - 支持清除、分组、禁用项

- **Slider** (`LoongArkSlider.stories.tsx`)

  - 滑块组件
  - 支持单值与区间
  - 尺寸：sm、md、lg
  - 方向：horizontal / vertical

- **Steps** (`LoongArkSteps.stories.tsx`)

  - Stepper navigation with next/prev triggers
  - Orientation: horizontal / vertical

- **Switch** (`LoongArkSwitch.stories.tsx`)

  - 开关组件
  - 尺寸：sm、md、lg
  - 状态：默认、disabled

- **Tabs** (`LoongArkTabs.stories.tsx`)

  - 标签页组件
  - 支持水平与垂直布局

- **Tags Input** (`LoongArkTagsInput.stories.tsx`)

  - Tag entry with removable chips
  - States: default / invalid / success

- **Toast** (`LoongArkToast.stories.tsx`)

  - 轻提示组件
  - 类型：info / success / warning / error

- **Tooltip** (`LoongArkTooltip.stories.tsx`)

  - 工具提示组件
  - 支持可交互提示


- **Carousel** (`LoongArkCarousel.stories.tsx`)

  - Carousel with indicators and autoplay control
  - Sizes: sm / md / lg

- **Clipboard** (`LoongArkClipboard.stories.tsx`)

  - Copy-to-clipboard input with status feedback
  - States: default / disabled

- **Color Picker** (`LoongArkColorPicker.stories.tsx`)

  - Color picker with panel and swatches
  - Sizes: sm / md / lg

- **Editable** (`LoongArkEditable.stories.tsx`)

  - Inline editable text with control triggers
  - States: default / invalid / success

- **Hover Card** (`LoongArkHoverCard.stories.tsx`)

  - Hover card with rich preview content
  - Sizes: sm / md / lg

- **Scroll Area** (`LoongArkScrollArea.stories.tsx`)

  - Scrollable region with styled scrollbars
  - Variants: vertical / both axis

- **Rating Group** (`LoongArkRatingGroup.stories.tsx`)

  - Interactive rating selector
  - States: default / disabled

- **Splitter** (`LoongArkSplitter.stories.tsx`)

  - Resizable panel layout
  - Orientation: horizontal / vertical

- **Tree View** (`LoongArkTreeView.stories.tsx`)

  - Nested tree view navigation
  - Variants: with checkbox / rename

### Examples/Complete Demos（完整示例）

展示多个组件组合使用的实际场景：

- **Button Input Dialog** (`CompleteDemo.ButtonInputDialog.stories.tsx`)

  - 综合演示 Button、Input、Dialog 的协同使用
  - 展示表单验证、对话框交互等完整流程

- **Filter Bar** (`CompleteDemo.FilterBar.stories.tsx`)
  - 筛选栏组件组合示例
  - 包含搜索框、筛选条件、操作按钮的完整布局

## 命名规范

### 组件 Stories

- 文件名：`LoongArk{ComponentName}.stories.tsx`
- Storybook 路径：`Components/{ComponentName}`
- 示例：`LoongArkButton.stories.tsx` → "Components/Button"

### 完整示例 Stories

- 文件名：`CompleteDemo.{DemoName}.stories.tsx`
- Storybook 路径：`Examples/Complete Demos/{Demo Name}`
- 示例：`CompleteDemo.FilterBar.stories.tsx` → "Examples/Complete Demos/Filter Bar"

## Story 结构标准

每个组件 story 应包含：

1. **Basic** - 基础用法示例
2. **Variants** - 各种变体展示（如有）
3. **States** - 不同状态展示（disabled、invalid、success 等）
4. **Sizes** - 尺寸对比（sm、md、lg）
5. **Interactive** - 交互式示例（如需要状态管理）

## 开发指南

### 添加新组件 Story

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoongArkYourComponent } from "@loongark/react";

const meta = {
  title: "Components/YourComponent",
  component: LoongArkYourComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoongArkYourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <LoongArkYourComponent />,
};
```

### 添加完整示例

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourCompleteExample } from "../examples/react/YourExample";

const meta: Meta<typeof YourCompleteExample> = {
  title: "Examples/Complete Demos/Your Example",
  component: YourCompleteExample,
  parameters: {
    layout: "centered", // or "fullscreen" for complex layouts
  },
};

export default meta;
type Story = StoryObj<typeof YourCompleteExample>;

export const Default: Story = {
  render: () => <YourCompleteExample />,
};
```

## 重要提示

### disabled vs readOnly 的区别

**disabled（禁用）**：

- ✅ 无法输入或交互
- ✅ 无法获得焦点
- ✅ 表单提交时**不会**包含该字段的值
- ✅ 视觉样式：灰色背景，降低透明度
- ✅ 光标样式：`not-allowed`
- 📝 使用场景：条件未满足时禁止用户操作（如权限不足、依赖项未完成）

**readOnly（只读）**：

- ✅ 无法编辑内容
- ✅ 可以获得焦点（可用 Tab 导航）
- ✅ 可以选中和复制文本
- ✅ 表单提交时**会**包含该字段的值
- ✅ 视觉样式：与普通输入框类似，但有特殊标识
- ✅ 光标样式：`text`（可选中文本）
- 📝 使用场景：展示不可编辑但需要提交的数据（如自动生成的 ID、确认信息）

### 关于 disabled 和 readOnly 属性

当使用组合组件（如 `LoongArkInputRoot` + `LoongArkInputControl`）时，**必须同时在 Root 和 Control 上设置 disabled/readOnly 属性**：

```tsx
// ✅ 正确：同时设置
<LoongArkInputRoot disabled>
  <LoongArkInputLabel>用户名</LoongArkInputLabel>
  <LoongArkInputControl disabled placeholder="禁用状态" />
</LoongArkInputRoot>

// ✅ 正确：只读状态
<LoongArkInputRoot readOnly>
  <LoongArkInputLabel>订单号</LoongArkInputLabel>
  <LoongArkInputControl readOnly value="LK-2024-001" />
</LoongArkInputRoot>

// ❌ 错误：仅在 Root 上设置
<LoongArkInputRoot disabled>
  <LoongArkInputLabel>用户名</LoongArkInputLabel>
  <LoongArkInputControl placeholder="仍可输入！" />
</LoongArkInputRoot>
```

这是因为 Ark UI 的 Field 组件架构要求每个子组件独立接收属性。

## 主题控制

所有 stories 都支持通过 Storybook 工具栏切换主题：

- **Mode**: light / dark / high-contrast
- **Brand**: default / tech / warm / cool
- **Accent**: default / vibrant / muted

这些控制在 `.storybook/preview.tsx` 中配置。

