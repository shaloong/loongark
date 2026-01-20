# LoongArk 组件覆盖状态

> 更新时间：2025 年 12 月 7 日

## 图例

- ✅ 已完整实现（Primitives + React + Vue + Solid + Svelte）
- 🔶 部分实现（仅部分框架）
- ⏳ 规划中
- ❌ 未开始

## 组件实现状态

| 组件名称                | Primitives | React | Vue | Solid | Svelte | 状态 | 优先级 | 备注                        |
|---------------------|------------|-------|-----|-------|--------|----|-----|---------------------------|
| **Button**          | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P0  | 基础组件，已完成                  |
| **Dialog**          | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P0  | 对话框，已完成                   |
| **Input**           | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P0  | 输入框（含 Floating Label），已完成 |
| **Pin Input**       | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P1  | 验证码输入，已完成                 |
| **Switch**          | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P0  | 开关，已完成                    |
| **Field**           | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | -   | 已通过 Input 实现              |
| **Fieldset**        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | -   | 表单分组，待评估                  |
| Accordion           | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 折叠面板                      |
| Angle Slider        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 角度选择器，低优先级                |
| Avatar              | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 头像                        |
| Carousel            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 轮播图                       |
| **Checkbox**        | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P1  | 复选框，已完成                   |
| Clipboard           | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 剪贴板                       |
| Collapsible         | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 可折叠容器                     |
| Color Picker        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 颜色选择器                     |
| Combobox            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 组合框                       |
| Date Picker         | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 日期选择器                     |
| Editable            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 可编辑文本                     |
| File Upload         | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 文件上传                      |
| Floating Panel      | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 浮动面板                      |
| Hover Card          | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 悬浮卡片                      |
| Listbox             | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 列表框                       |
| Marquee             | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 跑马灯，低优先级                  |
| **Menu**            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P1  | 菜单，高优先级                   |
| Number Input        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 数字输入框                     |
| Pagination          | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 分页                        |
| Password Input      | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 密码输入框                     |
| **Popover**         | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P1  | 弹出框，高优先级                  |
| Progress - Circular | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 圆形进度条                     |
| Progress - Linear   | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 线性进度条                     |
| QR Code             | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 二维码，低优先级                  |
| **Radio Group**     | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P1  | 单选框组，已完成                  |
| Rating Group        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 评分                        |
| Scroll Area         | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 滚动区域                      |
| Segment Group       | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 分段控制器                     |
| **Select**          | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P1  | 选择器，已完成                   |
| Signature Pad       | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 签名板，低优先级                  |
| **Slider**          | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P1  | 滑块，高优先级                   |
| Splitter            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 分割器                       |
| Steps               | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 步骤条                       |
| **Tabs**            | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P1  | 标签页，高优先级                  |
| Tags Input          | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 标签输入                      |
| Timer               | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 计时器，低优先级                  |
| **Toast**           | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P1  | 轻提示，高优先级                  |
| Toggle Group        | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 切换按钮组                     |
| Toggle              | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P2  | 切换按钮                      |
| **Tooltip**         | ✅          | ✅     | ✅   | ✅     | ✅      | ✅  | P1  | 工具提示，高优先级                 |
| Tour                | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P4  | 引导游览，低优先级                 |
| Tree View           | ❌          | ❌     | ❌   | ❌     | ❌      | ❌  | P3  | 树形视图                      |

## 统计摘要

- **已完成**: 10/48 (20.83%)
  - Button, Dialog, Input, Switch, Pin Input, Checkbox, Radio Group, Select, Tooltip (全框架)
- **进行中**: 1/48 (2.08%)
- **未开始**: 37/48 (77.08%)

## 优先级说明

### P0 - 核心基础组件（已完成）

✅ Button, Dialog, Input, Switch

### P1 - 高优先级（表单 & 反馈）

✅ 已完成：Pin Input, Checkbox, Radio Group

推荐下一阶段实现：

1. **Select** - 下拉选择器，高频使用
2. **Slider** - 滑块，常用输入组件
3. **Tabs** - 标签页，布局组件
4. **Tooltip** - 工具提示，反馈组件
5. **Toast** - 轻提示，反馈组件
6. **Menu** - 菜单，导航组件
7. **Popover** - 弹出框，反馈组件

### P2 - 中优先级（扩展表单 & 布局）

- Combobox, Date Picker, File Upload, Number Input, Password Input
- Pagination, Segment Group, Tags Input, Toggle, Toggle Group, Steps
- Accordion, Avatar, Collapsible, Listbox

### P3 - 低优先级（高级功能）

- Carousel, Color Picker, Editable, Hover Card, Scroll Area
- Clipboard, Rating Group, Splitter, Tree View

### P4 - 非必要（特殊场景）

- Angle Slider, Floating Panel, Marquee, QR Code, Signature Pad, Timer, Tour

## 下一步行动建议

### Sprint 1: 表单组件补全（P1）

1. **Checkbox** - 2 天

   - Primitives: 尺寸、状态、禁用
   - 框架封装：React, Vue, Solid, Svelte
   - Storybook stories

2. **Radio Group** - 2 天

   - Primitives: 尺寸、方向、间距
   - 框架封装：React, Vue, Solid, Svelte
   - Storybook stories

3. **Select** - 3 天

   - Primitives: 尺寸、多选、搜索
   - 框架封装：React, Vue, Solid, Svelte
   - Storybook stories

4. **Pin Input 补全** - 1 天
   - 补充 Vue, Solid, Svelte 实现
   - 更新文档

### Sprint 2: 反馈组件（P1）

1. **Tooltip** - 2 天
2. **Toast** - 2 天
3. **Popover** - 2 天

### Sprint 3: 导航 & 布局（P1）

1. **Tabs** - 2 天
2. **Menu** - 3 天
3. **Slider** - 2 天

## 实现规范

每个组件必须包含：

1. **Primitives** (`packages/primitives/src/{component}.ts`)

   - Token 定义与提取
   - CSS 样式生成
   - Primitive contract
   - 注册到 registry

2. **React** (`packages/react/src/components/{component}.tsx`)

   - Ark UI 封装
   - Props 接口
   - Data attributes
   - 导出到 `packages/react/src/index.ts`

3. **Vue** (`packages/vue/src/components/{component}.ts`)

   - Ark UI 封装
   - defineComponent
   - 导出到 `packages/vue/src/index.ts`

4. **Solid** (`packages/solid/src/{component}.ts`)

   - Ark UI 封装
   - JSX 组件
   - 导出到 `packages/solid/src/index.ts`

5. **Svelte** (`packages/svelte/src/actions/{component}.ts`)

   - Ark UI actions
   - 类型定义
   - 导出到 `packages/svelte/src/index.ts`

6. **Type Stubs** (`types/ark-ui-{framework}-{component}.d.ts`)

   - 为每个框架创建类型声明
   - 避免引入实际依赖

7. **Examples** (`examples/{framework}/{Component}Example.{tsx|vue|svelte}`)

   - 至少一个基础示例
   - 展示主要功能

8. **Storybook** (`stories/LoongArk{Component}.stories.tsx`)
   - Playground story
   - 各种变体展示
   - 状态演示

## 参考资源

- [Ark UI 官方文档](https://ark-ui.com/)
- [Ark UI GitHub](https://github.com/chakra-ui/ark)
- Sprint 计划：`docs/sprint-plan.md`
- 主题系统：`docs/theme-system.md`
- 架构文档：`docs/architecture.md`
