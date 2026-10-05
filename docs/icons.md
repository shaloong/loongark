# 图标

内置图标统一采用 Lucide，默认24单位画布、2单位圆角描边与 currentColor，尺寸使用已有 `control.icon` Token。Phosphor 的多字重/双色更适合需要多种图标表现的产品；本库优先一致的线条控件。图标颜色继承当前文字和主题，不引入新调色板。

`@loongark/kit` 直接依赖 `lucide@1.52.0`，仅按名字导入有限的内置节点，不调用 DOM 工厂 `createIcons`，不公开整库字符串注册表。四端 `LoongArkIcon` 接受原生 `IconNode` 并负责 SVG 渲染、Props 更新和引用；业务可按名字从 `lucide` 导入其他图标，无需四份框架图标依赖。Vite 能裁剪未使用节点；Node SSR 的包加载与浏览器按需打包不是同一件事。

```tsx
import { Search } from 'lucide'
import { LoongArkIcon, LoongArkButton } from '@loongark/react'

<LoongArkButton aria-label="搜索" size="icon" variant="outline">
  <LoongArkIcon icon={Search} />
</LoongArkButton>
<LoongArkIcon icon={Search} label="搜索示意" size={32} absoluteStrokeWidth />
```

业务直接导入 `lucide` 时在自身项目声明该依赖。Vue 用 `:icon="Search"`，Solid/Svelte 用 `icon={Search}`。Svelte `ref` 可双向绑定；React 支持 forwarded ref。组件传递原生 SVG 的 class/style 和属性，尺寸与布局优先采用 size。

| Props | 默认与行为 |
| --- | --- |
| icon | 必填，按需导入的节点；动态替换支持不同节点数量 |
| size | `md`；支持 `sm/md/lg` 或正的有限像素值 |
| strokeWidth | 2；支持非负有限值 |
| absoluteStrokeWidth | false；每个子图元设置 non-scaling-stroke，缩放后保持实际描边宽度 |
| mirrorInRtl | false；祖先方向为 RTL 时镜像，适用于逻辑导航，外链或搜索图标无需镜像 |
| label | 独立有意义图标的名称；同时支持原生 aria-label/aria-labelledby。无名称默认 aria-hidden，focusable=false |

图标本身不承担按钮、加载反馈或焦点语义。图标按钮必须在按钮上命名；加载/错误状态继续由所属组件处理。图标不使用自动生成 title/id，避免多实例和 SSR 的重复引用。

Dialog 默认关闭、Checkbox/Select/Combobox 默认指示器、TransferList 方向、DataTable 排序、Attachment 文件、SpeedDial 默认和示例图标已统一。自定义 children/slot 继续优先；SpeedDialAction.icon 新增 IconNode，字符串继续兼容但不推荐。原生表单勾选、CSS 圆点/浮层箭头和示例图片不属于可替换图标。

Lucide 是 ISC（部分 Feather 衍生图标使用 MIT），与本库 MIT 兼容；依赖自带 LICENSE，使用和再分发仍须保留上游版权说明。Kit 发布包与 Storybook 静态产物均附带完整上游许可说明，本库许可保持 MIT。

旧 attachmentIconPath 入口保留并标记弃用，路径从同一 Lucide 节点派生；调用方迁移到 IconNode 时不会引入另一份路径定义。

Solid 的原生 style 对象使用 kebab-case（如 `align-items`），React 使用 camelCase（如 `alignItems`）；适配层遵循各框架的原生属性契约。
